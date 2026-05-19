import { describe, expect, it, renderHook } from '@vtex/shoreline-test-utils'
import { vi } from 'vitest'

import { useAIThread } from '../hooks/use-ai-thread'

const cancelRun = vi.fn()
const reset = vi.fn()
const setThreadId = vi.fn()

vi.mock('@assistant-ui/react', () => {
  const thread = Object.assign(() => ({ cancelRun }), { source: {} })

  return {
    useAui: () => ({ thread }),
    useAuiState: () => [],
  }
})

vi.mock('../components/provider/ai-context', () => ({
  useAIContextInternal: () => ({
    threadId: 'thread-a',
    setThreadId,
    runtime: { thread: { reset } },
  }),
}))

describe('useAIThread switchThread', () => {
  it('does not reset when switching to the same thread id', () => {
    const { result } = renderHook(() => useAIThread())

    reset.mockClear()
    setThreadId.mockClear()

    result.current.switchThread('thread-a')

    expect(reset).not.toHaveBeenCalled()
    expect(setThreadId).not.toHaveBeenCalled()
  })

  it('resets and updates thread id when switching to a different id', () => {
    const { result } = renderHook(() => useAIThread())

    reset.mockClear()
    setThreadId.mockClear()

    result.current.switchThread('thread-b')

    expect(reset).toHaveBeenCalledWith([])
    expect(setThreadId).toHaveBeenCalledWith('thread-b')
  })
})
