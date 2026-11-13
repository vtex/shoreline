'use client'

import { useEffect, type ReactNode } from 'react'
import { useAIThread, type AIMessage } from '@vtex/shoreline-ai'

const createdAt = '2026-05-20T12:00:00.000Z'

/**
 * A short conversation with a reasoning step, a tool call and a text answer.
 */
export const demoConversation: AIMessage[] = [
  {
    id: 'demo-user-1',
    role: 'user',
    createdAt,
    parts: [{ type: 'text', text: 'Which orders are late this week?' }],
  },
  {
    id: 'demo-assistant-1',
    role: 'assistant',
    createdAt,
    parts: [
      {
        type: 'reasoning',
        text: 'I need the orders from this week, then I compare each one with its promised delivery date.',
        status: 'complete',
      },
      {
        type: 'tool',
        name: 'search_orders',
        args: { query: 'late' },
        output: { count: 3 },
        status: 'complete',
      },
      {
        type: 'text',
        text: 'Three orders are late this week. The oldest one is **#1042**, promised for Monday.',
      },
    ],
  },
]

/**
 * A single assistant answer, for examples that compose the message layout.
 */
export const demoAnswer: AIMessage[] = [
  {
    id: 'demo-assistant-2',
    role: 'assistant',
    createdAt,
    parts: [
      {
        type: 'reasoning',
        text: 'Comparing each order with its promised delivery date.',
        status: 'complete',
      },
      {
        type: 'text',
        text: 'Three orders are late this week. The oldest one is **#1042**.',
      },
    ],
  },
]

/**
 * Loads the given messages into the thread once, on mount. Use it inside
 * `AIDemoProvider` so an example starts with a conversation already in place.
 */
export function AIDemoMessages(props: {
  messages: AIMessage[]
  children: ReactNode
}) {
  const { messages, children } = props
  const { loadMessages } = useAIThread()

  useEffect(() => {
    loadMessages(messages)
    // Load once; the examples pass a stable list.
  }, [])

  return <>{children}</>
}
