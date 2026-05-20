import { describe, expect, it, renderHook } from '@vtex/shoreline-test-utils'
import { vi } from 'vitest'

import { useAIThread } from '../use-ai-thread'

vi.mock('@assistant-ui/react', () => ({
  useAui: () => ({
    thread: Object.assign(() => ({}), { source: {} }),
  }),
  useAuiState: () => [],
}))

vi.mock('../../components/provider/ai-context', () => ({
  useAIContextInternal: () => ({
    threadId: 'thread-a',
    setThreadId: vi.fn(),
    runtime: { thread: { reset: vi.fn() } },
    isOpeningThread: false,
    error: null,
  }),
}))

describe('useAIThread.isEmpty', () => {
  it('returns true when there are no thread messages', () => {
    const { result } = renderHook(() => useAIThread())

    expect(result.current.isEmpty).toBe(true)
  })
})
