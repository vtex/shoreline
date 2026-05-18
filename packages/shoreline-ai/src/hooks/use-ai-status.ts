/**
 * useAIStatus — returns the current streaming status with derived booleans.
 */

import { useThread } from '@assistant-ui/react'
import { useMemo } from 'react'
import type { StreamStatus } from '../types/public'

export function useAIStatus(): {
  status: StreamStatus
  isLoading: boolean
  isStreaming: boolean
} {
  const threadState = useThread({ optional: true })
  const isRunning = threadState?.isRunning ?? false

  return useMemo(() => {
    const status: StreamStatus = isRunning ? 'streaming' : 'ready'
    const isStreaming = status === 'streaming'

    return {
      status,
      isLoading: isStreaming,
      isStreaming,
    }
  }, [isRunning])
}
