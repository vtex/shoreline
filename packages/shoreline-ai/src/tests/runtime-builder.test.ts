import { describe, expect, it } from 'vitest'

import { createRuntimeBuilder } from '../runtime/builder'
import { mapThreadUserMessageToAIMessage } from '../runtime/bridge/map-from-assistant-ui'
import type {
  RuntimeRunInput,
  RuntimeSnapshot,
  StreamTransport,
} from '../runtime/types'
import { mapAIMessagePartsToContentParts } from '../runtime/bridge/map-to-assistant-ui'

function mockTransport(snapshots: RuntimeSnapshot[]): StreamTransport {
  return {
    async *run(_input: RuntimeRunInput) {
      for (const snapshot of snapshots) {
        yield snapshot
      }

      return snapshots[snapshots.length - 1] ?? { parts: [] }
    },
  }
}

describe('createRuntimeBuilder', () => {
  it('requires transport before build', () => {
    expect(() => createRuntimeBuilder().build()).toThrow(/transport/)
  })

  it('builds runtime with transport plugin', () => {
    const built = createRuntimeBuilder()
      .transport(
        mockTransport([
          { parts: [{ type: 'text', text: 'hello' }], status: 'streaming' },
          { parts: [{ type: 'text', text: 'hello world' }], status: 'ready' },
        ])
      )
      .build()

    expect(built.transport).toBeDefined()
  })
})

describe('mapAIMessagePartsToContentParts', () => {
  it('maps text and tool parts for Assistant-UI', () => {
    const mapped = mapAIMessagePartsToContentParts([
      { type: 'text', text: 'Hi' },
      {
        type: 'tool',
        name: 'search',
        args: { q: 'x' },
        status: 'complete',
        metadata: { toolCallId: 'tc-1' },
      },
    ])

    expect(mapped[0]).toEqual({ type: 'text', text: 'Hi' })
    expect(mapped[1]).toMatchObject({
      type: 'tool-call',
      toolCallId: 'tc-1',
      toolName: 'search',
    })
  })

  it('maps reasoning and resource parts', () => {
    const mapped = mapAIMessagePartsToContentParts([
      { type: 'reasoning', text: 'thinking…', status: 'complete' },
      {
        type: 'resource',
        uri: 'vtex-artifact://1',
        name: 'doc.pdf',
        mimeType: 'application/pdf',
      },
    ])

    expect(mapped[0]).toEqual({ type: 'reasoning', text: 'thinking…' })
    expect(mapped[1]).toMatchObject({
      type: 'data',
      name: 'resource',
      data: expect.objectContaining({ uri: 'vtex-artifact://1' }),
    })
  })

  it('maps tool without toolCallId using index fallback', () => {
    const mapped = mapAIMessagePartsToContentParts([
      {
        type: 'tool',
        name: 'search',
        args: {},
        status: 'error',
        error: { message: 'fail' },
      },
    ])

    expect(mapped[0]).toMatchObject({
      type: 'tool-call',
      toolCallId: 'tool-search-0',
      isError: true,
    })
  })
})

describe('mapThreadUserMessageToAIMessage', () => {
  it('maps text, file, and image content parts', () => {
    const message = mapThreadUserMessageToAIMessage({
      id: 'u1',
      role: 'user',
      createdAt: new Date('2026-01-01'),
      content: [
        { type: 'text', text: 'Hello' },
        {
          type: 'file',
          data: 'blob:file',
          mimeType: 'application/pdf',
          filename: 'a.pdf',
        },
        { type: 'image', image: 'data:image/png;base64,x', filename: 'x.png' },
      ],
      attachments: [],
      metadata: { custom: {} },
    })

    expect(message.parts).toEqual([
      { type: 'text', text: 'Hello' },
      {
        type: 'resource',
        uri: 'blob:file',
        name: 'a.pdf',
        mimeType: 'application/pdf',
      },
      {
        type: 'resource',
        uri: 'data:image/png;base64,x',
        name: 'x.png',
        mimeType: 'image/*',
      },
    ])
  })
})
