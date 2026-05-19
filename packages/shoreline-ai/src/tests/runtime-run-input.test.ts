import type { ThreadMessage } from '@assistant-ui/react'
import { describe, expect, it } from 'vitest'

import {
  getLastThreadUserMessage,
  mapThreadUserMessageToAIMessage,
} from '../runtime/bridge/map-from-assistant-ui'
import { mapThreadMessagesToAIMessages } from '../runtime/bridge/map-thread-messages'
import type { RuntimeRunInput } from '../runtime/types'

function buildRunInput(
  messages: Parameters<typeof mapThreadMessagesToAIMessages>[0],
  getThreadId?: () => string | null
): RuntimeRunInput | null {
  const lastUser = getLastThreadUserMessage(messages)

  if (!lastUser) return null

  return {
    messages: mapThreadMessagesToAIMessages(messages),
    trigger: {
      type: 'message',
      message: mapThreadUserMessageToAIMessage(lastUser),
    },
    abortSignal: new AbortController().signal,
    runResponseId: 'asst-1',
    threadId: getThreadId?.() ?? null,
  }
}

describe('RuntimeRunInput', () => {
  it('includes full history and trigger message', () => {
    const input = buildRunInput([
      {
        id: 'u1',
        role: 'user',
        createdAt: new Date('2026-01-01'),
        content: [{ type: 'text', text: 'Hi' }],
        attachments: [],
        metadata: { custom: {} },
      },
      {
        id: 'a1',
        role: 'assistant',
        createdAt: new Date('2026-01-01'),
        content: [{ type: 'text', text: 'Hello' }],
        status: { type: 'complete', reason: 'stop' },
        metadata: { custom: {} },
      },
      {
        id: 'u2',
        role: 'user',
        createdAt: new Date('2026-01-02'),
        content: [{ type: 'text', text: 'Again' }],
        attachments: [],
        metadata: { custom: {} },
      },
    ] as ThreadMessage[])

    expect(input).not.toBeNull()
    expect(input?.messages).toHaveLength(3)
    expect(input?.trigger.message.id).toBe('u2')
    expect(input?.trigger.message.parts[0]).toEqual({
      type: 'text',
      text: 'Again',
    })
    expect(input?.runResponseId).toBe('asst-1')
  })

  it('includes threadId from getThreadId when provided', () => {
    const input = buildRunInput(
      [
        {
          id: 'u1',
          role: 'user',
          createdAt: new Date('2026-01-01'),
          content: [{ type: 'text', text: 'Hi' }],
          attachments: [],
          metadata: { custom: {} },
        },
      ] as ThreadMessage[],
      () => 'conv-99'
    )

    expect(input?.threadId).toBe('conv-99')
  })
})
