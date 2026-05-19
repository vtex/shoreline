/**
 * useAIStatus — returns the current streaming status with derived booleans.
 */

import { useAui, useAuiState } from '@assistant-ui/react'
import { useMemo } from 'react'
import type { StreamStatus } from '../types/public'

export function useAIStatus(): {
  status: StreamStatus
  isLoading: boolean
  isStreaming: boolean
} {
  const aui = useAui()
  const isRunning = useAuiState((s) =>
    aui.thread.source ? s.thread.isRunning : false
  )

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
