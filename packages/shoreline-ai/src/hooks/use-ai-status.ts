/**
 * useAIStatus — returns the current run status with derived booleans.
 */

import { useAui, useAuiState } from '@assistant-ui/react'
import { useMemo } from 'react'

import { useAIContextInternal } from '../components/provider/ai-context'
import type { AIThreadError, StreamStatus } from '../types/public'

type RunPhase = 'idle' | 'submitted' | 'streaming' | 'ready'

/**
 * Returns the status of the current run, loading flags and the error of the
 * last run. `status` is `'submitted'` until the assistant sends content, then
 * `'streaming'`, and `'error'` when the last run failed.
 *
 * @status experimental
 * @example
 * const { status, isLoading, error } = useAIStatus()
 *
 * if (status === 'error') return <p>{error?.message}</p>
 */
export function useAIStatus(): {
  status: StreamStatus
  isLoading: boolean
  isStreaming: boolean
  error: AIThreadError | null
} {
  const aui = useAui()
  const { runError } = useAIContextInternal()
  const phase = useAuiState((s): RunPhase => {
    if (!aui.thread.source) return 'idle'

    const { isRunning, messages } = s.thread

    if (isRunning) {
      const last = messages[messages.length - 1]
      const hasContent =
        last?.role === 'assistant' &&
        last.content.some((part) => part.type !== 'text' || part.text !== '')

      return hasContent ? 'streaming' : 'submitted'
    }

    return messages.length === 0 ? 'idle' : 'ready'
  })

  return useMemo(() => {
    const isLoading = phase === 'submitted' || phase === 'streaming'
    const status: StreamStatus = runError && !isLoading ? 'error' : phase

    return {
      status,
      isLoading,
      isStreaming: status === 'streaming',
      error: runError,
    }
  }, [phase, runError])
}
