import { useEffect, type ReactNode } from 'react'

import { useAIThread } from '../../../hooks/use-ai-thread'
import type { StreamTransport } from '../../../runtime/types'
import type { AIMessage, AIMessagePart } from '../../../types/public'

/**
 * Transport that emits the given snapshot and then keeps the run open, so the
 * assistant message stays in the running state.
 */
export function createHoldingTransport(
  parts: AIMessagePart[]
): StreamTransport {
  return {
    async *run() {
      if (parts.length > 0) {
        yield { parts, status: 'streaming' }
      }

      await new Promise<never>(() => {})

      return { parts: [], status: 'ready' }
    },
  }
}

/** Sends one message on mount, so the thread shows a user and an assistant message. */
export function SendOnMount(props: { text?: string; children: ReactNode }) {
  const { text = 'Which orders are late?', children } = props
  const { sendMessage } = useAIThread()

  useEffect(() => {
    sendMessage({ text })
    // Send once; later identity changes of sendMessage must not resend.
  }, [])

  return <>{children}</>
}

/** Stable holding transports, referenced from story parameters. */
export const holdingNoParts = createHoldingTransport([])
export const holdingReasoning = createHoldingTransport([
  {
    type: 'reasoning',
    text: 'Comparing each order with its promised delivery date.',
    status: 'streaming',
  },
])

const createdAt = '2026-05-20T12:00:00.000Z'

const userQuestion: AIMessage = {
  id: 'user-1',
  role: 'user',
  createdAt,
  parts: [{ type: 'text', text: 'Which orders are late this week?' }],
}

export const reasoningToolText: AIMessage[] = [
  userQuestion,
  {
    id: 'assistant-1',
    role: 'assistant',
    createdAt,
    parts: [
      {
        type: 'reasoning',
        text: 'I need the orders from this week and then compare each one with its promised delivery date.',
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
        type: 'reasoning',
        text: 'Three orders are past their promised date.',
        status: 'complete',
      },
      { type: 'text', text: 'Three orders are late this week.' },
    ],
  },
]

export const twoReasoningGroups: AIMessage[] = [
  userQuestion,
  {
    id: 'assistant-2',
    role: 'assistant',
    createdAt,
    parts: [
      {
        type: 'reasoning',
        text: 'First I look at the late orders.',
        status: 'complete',
      },
      { type: 'text', text: 'Three orders are late. Checking the carriers.' },
      {
        type: 'reasoning',
        text: 'Now I compare the carriers of those orders.',
        status: 'complete',
      },
      { type: 'text', text: 'Two of them share the same carrier.' },
    ],
  },
]

export const simpleReasoning: AIMessage[] = [
  userQuestion,
  {
    id: 'assistant-3',
    role: 'assistant',
    createdAt,
    parts: [
      { type: 'reasoning', text: 'Looking at orders.', status: 'complete' },
      { type: 'text', text: 'Three orders are late this week.' },
    ],
  },
]

export const plainAnswer: AIMessage[] = [
  userQuestion,
  {
    id: 'assistant-4',
    role: 'assistant',
    createdAt,
    parts: [{ type: 'text', text: 'Three orders are late this week.' }],
  },
]

export const earlierAnswer: AIMessage[] = [
  userQuestion,
  {
    id: 'assistant-5',
    role: 'assistant',
    createdAt,
    parts: [{ type: 'text', text: 'Three orders are late this week.' }],
  },
  {
    id: 'user-2',
    role: 'user',
    createdAt,
    parts: [{ type: 'text', text: 'Which carrier handles them?' }],
  },
  {
    id: 'assistant-6',
    role: 'assistant',
    createdAt,
    parts: [{ type: 'text', text: 'All three ship with the same carrier.' }],
  },
]

const thumbProps = {
  viewBox: '0 0 20 20',
  width: 20,
  height: 20,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

/** The app's own thumbs-up icon: Shoreline does not ship one. */
export function ThumbUpIcon() {
  return (
    <svg {...thumbProps}>
      <path d="M6 9v8H3.5V9H6zm0 0 3-6c1.4 0 2 .9 2 2v3h4.4c.9 0 1.5.8 1.3 1.6l-1 5c-.2.8-.8 1.4-1.6 1.4H6" />
    </svg>
  )
}

/** The app's own thumbs-down icon. */
export function ThumbDownIcon() {
  return (
    <svg {...thumbProps}>
      <path d="M6 11V3H3.5v8H6zm0 0 3 6c1.4 0 2-.9 2-2v-3h4.4c.9 0 1.5-.8 1.3-1.6l-1-5c-.2-.8-.8-1.4-1.6-1.4H6" />
    </svg>
  )
}
