import { describe, expect, it, renderHook } from '@vtex/shoreline-test-utils'
import { vi } from 'vitest'

import { useAIThread } from '../hooks/use-ai-thread'

const cancelRun = vi.fn()
const reset = vi.fn()
const openThread = vi.fn()

vi.mock('@assistant-ui/react', () => ({
  useAui: () => ({ thread: { cancelRun, source: {} } }),
  useAuiState: () => [],
}))

vi.mock('../components/provider/ai-context', () => ({
  useAIContextInternal: () => ({
    threadId: 'thread-a',
    openThread,
    runtime: { thread: { reset } },
  }),
}))

describe('useAIThread switchThread', () => {
  it('does not reset when switching to the same thread id', () => {
    const { result } = renderHook(() => useAIThread())

    reset.mockClear()
    openThread.mockClear()

    result.current.switchThread('thread-a')

    expect(reset).not.toHaveBeenCalled()
    expect(openThread).not.toHaveBeenCalled()
  })

  it('resets and opens the thread when switching to a different id', () => {
    const { result } = renderHook(() => useAIThread())

    reset.mockClear()
    openThread.mockClear()

    result.current.switchThread('thread-b')

    expect(reset).toHaveBeenCalledWith([])
    expect(openThread).toHaveBeenCalledWith('thread-b')
  })
})
