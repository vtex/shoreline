import type { ThreadMessage, ToolCallMessagePart } from '@assistant-ui/react'
import { describe, expect, it } from 'vitest'

import type { AIMessage, AIMessagePart } from '../../../types/public'
import { mapThreadMessageToAIMessage } from '../map-from-assistant-ui'
import {
  mapAIMessagePartsToContentParts,
  mapAIMessagesToThreadMessages,
} from '../map-to-assistant-ui'

const metadata = { toolCallId: 'call-1', nested: { a: [1, 2] }, flag: true }

function assistantRoundTrip(parts: AIMessagePart[]): AIMessagePart[] {
  const content = mapAIMessagePartsToContentParts(parts)
  const message = {
    id: 'a1',
    role: 'assistant',
    createdAt: new Date('2026-01-01T00:00:00Z'),
    content,
    status: { type: 'complete', reason: 'stop' },
    metadata: { custom: {} },
  } as unknown as ThreadMessage

  return mapThreadMessageToAIMessage(message).parts
}

function historyRoundTrip(message: AIMessage): AIMessagePart[] {
  const [loaded] = mapAIMessagesToThreadMessages([message])
  const threadMessage = { ...loaded, metadata: { custom: {} } }

  return mapThreadMessageToAIMessage(threadMessage as unknown as ThreadMessage)
    .parts
}

const parts: [string, AIMessagePart][] = [
  ['text', { type: 'text', text: 'hello', metadata }],
  [
    'reasoning streaming',
    { type: 'reasoning', text: 'thinking', status: 'streaming', metadata },
  ],
  [
    'reasoning complete',
    { type: 'reasoning', text: 'thought', status: 'complete', metadata },
  ],
  [
    'tool running',
    {
      type: 'tool',
      name: 'search',
      args: { q: 'shoes' },
      status: 'running',
      metadata,
    },
  ],
  [
    'tool complete',
    {
      type: 'tool',
      name: 'search',
      args: { q: 'shoes' },
      output: { count: 2 },
      status: 'complete',
      metadata,
    },
  ],
  [
    'tool error',
    {
      type: 'tool',
      name: 'search',
      args: { q: 'shoes' },
      error: { message: 'boom' },
      status: 'error',
      metadata,
    },
  ],
  [
    'file resource',
    {
      type: 'resource',
      uri: 'https://cdn/report.pdf',
      name: 'report.pdf',
      mimeType: 'application/pdf',
      size: 2048,
      description: 'Quarterly report',
      metadata,
    },
  ],
  [
    'image resource',
    {
      type: 'resource',
      uri: 'https://cdn/photo.png',
      name: 'photo.png',
      mimeType: 'image/png',
      size: 10,
      metadata,
    },
  ],
]

describe('message bridge round trip', () => {
  it.each(parts)('keeps a %s part unchanged', (_label, part) => {
    expect(assistantRoundTrip([part])).toEqual([part])
  })

  it.each(parts.filter(([, part]) => part.type === 'tool'))(
    'keeps tool metadata without putting it inside args (%s)',
    (_label, part) => {
      const content = mapAIMessagePartsToContentParts([part])

      expect((content[0] as ToolCallMessagePart).args).toEqual({ q: 'shoes' })

      const [back] = assistantRoundTrip([part])

      expect(back).toMatchObject({ args: { q: 'shoes' }, metadata })
    }
  )

  it('keeps tool status running', () => {
    const [back] = assistantRoundTrip([
      { type: 'tool', name: 'search', args: {}, status: 'running' },
    ])

    expect(back).toMatchObject({ type: 'tool', status: 'running' })
  })

  it('keeps reasoning status streaming', () => {
    const [back] = assistantRoundTrip([
      { type: 'reasoning', text: 'hm', status: 'streaming' },
    ])

    expect(back).toMatchObject({ type: 'reasoning', status: 'streaming' })
  })

  it('keeps text and reasoning metadata', () => {
    const back = assistantRoundTrip([
      { type: 'text', text: 'a', metadata: { k: 1 } },
      { type: 'reasoning', text: 'b', status: 'complete', metadata: { k: 2 } },
    ])

    expect(back).toEqual([
      { type: 'text', text: 'a', metadata: { k: 1 } },
      { type: 'reasoning', text: 'b', status: 'complete', metadata: { k: 2 } },
    ])
  })

  it('keeps an uploaded file on a user message when history is loaded', () => {
    const resource: AIMessagePart = {
      type: 'resource',
      uri: 'https://cdn/report.pdf',
      name: 'report.pdf',
      mimeType: 'application/pdf',
      size: 2048,
    }

    const back = historyRoundTrip({
      id: 'u1',
      role: 'user',
      createdAt: '2026-01-01T00:00:00.000Z',
      parts: [{ type: 'text', text: 'see file' }, resource],
    })

    expect(back).toEqual([{ type: 'text', text: 'see file' }, resource])
  })

  it('keeps assistant history tool metadata and status', () => {
    const tool: AIMessagePart = {
      type: 'tool',
      name: 'search',
      args: { q: 'x' },
      status: 'running',
      metadata,
    }

    expect(
      historyRoundTrip({
        id: 'a1',
        role: 'assistant',
        createdAt: '2026-01-01T00:00:00.000Z',
        parts: [tool],
      })
    ).toEqual([tool])
  })
})
