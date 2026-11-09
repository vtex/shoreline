import { describe, expect, it } from 'vitest'
import { afterEach, beforeEach, vi } from 'vitest'
import type { Attachment, PendingAttachment } from '@assistant-ui/react'

import type { AttachmentHandler } from '../../types'
import { createAssistantAttachmentAdapter } from '../attachment-bridge'
import { mapThreadUserMessageToAIMessage } from '../map-from-assistant-ui'

function createHandler(
  overrides: Partial<AttachmentHandler> = {}
): AttachmentHandler {
  return {
    async *add() {
      yield { progress: 1, status: 'ready' }
    },
    send: vi.fn(async (pending) => ({
      type: 'resource' as const,
      uri: 'https://files.test/a',
      name: pending.name,
      mimeType: 'text/plain',
      size: 5,
    })),
    remove: vi.fn(async () => {}),
    ...overrides,
  }
}

async function collect(
  gen: AsyncGenerator<PendingAttachment, void> | Promise<PendingAttachment>
): Promise<PendingAttachment[]> {
  if ('then' in gen) return [await gen]

  const states: PendingAttachment[] = []

  for await (const state of gen) states.push(state)

  return states
}

/** Message of the error a promise rejects with. */
async function rejection(promise: Promise<unknown>): Promise<string> {
  try {
    await promise
  } catch (error) {
    return (error as Error).message
  }

  return ''
}

const file = () => new File(['hello'], 'a.txt', { type: 'text/plain' })

describe('createAssistantAttachmentAdapter', () => {
  const revoke = vi.fn()

  beforeEach(() => {
    revoke.mockClear()
    vi.stubGlobal(
      'URL',
      class extends URL {
        static createObjectURL = vi.fn(() => 'blob:x')
        static revokeObjectURL = revoke
      }
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('exposes the handler accept and defaults to any file', () => {
    expect(
      createAssistantAttachmentAdapter(createHandler({ accept: 'image/*' }))
        .accept
    ).toBe('image/*')
    expect(createAssistantAttachmentAdapter(createHandler()).accept).toBe('*')
  })

  it('yields uploading states with progress and ends ready', async () => {
    const adapter = createAssistantAttachmentAdapter(
      createHandler({
        async *add() {
          yield { progress: 0.5, status: 'uploading' }
          yield { progress: 1, status: 'ready' }
        },
      })
    )
    const states = await collect(adapter.add({ file: file() }))

    expect(states.map((state) => state.status)).toEqual([
      { type: 'running', reason: 'uploading', progress: 0 },
      { type: 'running', reason: 'uploading', progress: 0.5 },
      { type: 'requires-action', reason: 'composer-send' },
    ])
    expect(new Set(states.map((state) => state.id)).size).toBe(1)
  })

  it('yields an error state instead of throwing when the upload fails', async () => {
    const adapter = createAssistantAttachmentAdapter(
      createHandler({
        // biome-ignore lint/correctness/useYield: throws before any state
        async *add() {
          throw new Error('boom')
        },
      })
    )
    const states = await collect(adapter.add({ file: file() }))

    expect(states.at(-1)?.status).toEqual({
      type: 'incomplete',
      reason: 'error',
      message: 'boom',
    })
    expect(revoke).toHaveBeenCalledTimes(1)
  })

  it('does not call the handler for a rejected file and never calls remove for it', async () => {
    const handler = createHandler({ maxSize: 2 })
    const add = vi.spyOn(handler, 'add')
    const adapter = createAssistantAttachmentAdapter(handler)
    const states = await collect(adapter.add({ file: file() }))
    const last = states.at(-1) as PendingAttachment

    expect(add).not.toHaveBeenCalled()
    expect(last.status).toMatchObject({ type: 'incomplete', reason: 'error' })

    await adapter.remove(last)

    expect(handler.remove).not.toHaveBeenCalled()
  })

  it('releases the pending entry on send so a later send fails', async () => {
    const handler = createHandler()
    const adapter = createAssistantAttachmentAdapter(handler)
    const states = await collect(adapter.add({ file: file() }))
    const ready = states.at(-1) as PendingAttachment
    const sent = await adapter.send(ready)

    expect(sent.content[0]).toMatchObject({
      type: 'file',
      data: 'https://files.test/a',
      mimeType: 'text/plain',
      providerMetadata: { shoreline: { size: 5 } },
    })
    expect(revoke).toHaveBeenCalledTimes(1)
    expect(await rejection(adapter.send(ready))).toMatch(
      /No pending attachment/
    )
    await adapter.remove(ready)
    expect(handler.remove).not.toHaveBeenCalled()
  })

  it('keeps the pending entry when the handler send fails', async () => {
    const send = vi
      .fn()
      .mockRejectedValueOnce(new Error('send failed'))
      .mockResolvedValueOnce({ type: 'resource', uri: 'u', name: 'a.txt' })
    const adapter = createAssistantAttachmentAdapter(createHandler({ send }))
    const states = await collect(adapter.add({ file: file() }))
    const ready = states.at(-1) as PendingAttachment

    expect(await rejection(adapter.send(ready))).toBe('send failed')
    await expect(adapter.send(ready)).resolves.toBeDefined()
  })

  it('sends a failed attachment as a complete one with no content', async () => {
    const handler = createHandler({
      async *add() {
        yield { progress: 0, status: 'error', error: 'bad' }
      },
    })
    const adapter = createAssistantAttachmentAdapter(handler)
    const states = await collect(adapter.add({ file: file() }))
    const sent = await adapter.send(states.at(-1) as PendingAttachment)

    expect(sent.status).toEqual({ type: 'complete' })
    expect(sent.content).toEqual([])
    expect(handler.send).not.toHaveBeenCalled()
  })

  it('releases the pending entry and url on remove', async () => {
    const handler = createHandler()
    const adapter = createAssistantAttachmentAdapter(handler)
    const states = await collect(adapter.add({ file: file() }))
    const ready = states.at(-1) as Attachment

    await adapter.remove(ready)
    await adapter.remove(ready)

    expect(handler.remove).toHaveBeenCalledTimes(1)
    expect(revoke).toHaveBeenCalledTimes(1)
  })
})

describe('mapThreadUserMessageToAIMessage attachments', () => {
  it('keeps the size of a sent file attachment', () => {
    const message = mapThreadUserMessageToAIMessage({
      id: 'm1',
      role: 'user',
      createdAt: new Date(0),
      content: [{ type: 'text', text: 'hi' }],
      attachments: [
        {
          id: 'a1',
          type: 'document',
          name: 'a.txt',
          contentType: 'text/plain',
          status: { type: 'complete' },
          content: [
            {
              type: 'file',
              data: 'https://files.test/a',
              mimeType: 'text/plain',
              providerMetadata: { shoreline: { size: 5 } },
            },
          ],
        },
      ],
      metadata: { custom: {} },
    } as never)

    expect(message.parts).toContainEqual({
      type: 'resource',
      uri: 'https://files.test/a',
      name: 'a.txt',
      mimeType: 'text/plain',
      size: 5,
    })
  })
})
