import { useAui, useAuiState } from '@assistant-ui/react'
import { useMemo } from 'react'
import invariant from 'tiny-invariant'

import type { AIMessageState, AIMessageStatus } from './types'

/**
 * The message the calling component renders in: its id, role, status and
 * creation date. Use it inside `AIMessageUser` or `AIMessageAssistant`, for
 * example to key app state (votes, feedback) by message.
 *
 * Each field is read on its own, so streamed tokens do not re-render the
 * caller: it re-renders only when one of these fields changes.
 *
 * @example
 * function Vote() {
 *   const { id } = useAIMessage()
 *   const pressed = votes[id] === 'up'
 *   return (
 *     <AIMessageAction label="Good response" aria-pressed={pressed} onClick={() => vote(id, 'up')}>
 *       <IconThumbsUp />
 *     </AIMessageAction>
 *   )
 * }
 *
 * @status experimental
 */
export function useAIMessage(): AIMessageState {
  const aui = useAui()

  invariant(
    aui.message.source,
    'useAIMessage must be used within a message (AIMessageUser or AIMessageAssistant)'
  )

  const id = useAuiState((state) => state.message.id)
  const role = useAuiState((state) =>
    state.message.role === 'user' ? 'user' : 'assistant'
  )
  const status = useAuiState((state): AIMessageStatus => {
    const message = state.message

    if (message.role === 'user') return 'complete'

    // Same reading as the parts and the actions bar: without a status, the
    // last message of a running thread is the one running.
    if (!message.status) {
      return message.isLast && state.thread.isRunning ? 'running' : 'complete'
    }

    switch (message.status.type) {
      case 'running':
        return 'running'
      case 'complete':
        return 'complete'
      default:
        // Stopped, failed, or waiting for a tool result: not finished.
        return 'incomplete'
    }
  })
  const createdAt = useAuiState((state) => {
    const value = state.message.createdAt
    const time = value instanceof Date ? value.getTime() : Number.NaN

    return Number.isNaN(time) ? undefined : value.toISOString()
  })

  return useMemo(
    () => ({ id, role, status, createdAt }),
    [id, role, status, createdAt]
  )
}
