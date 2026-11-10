import { describe, expect, it, renderHook } from '@vtex/shoreline-test-utils'
import { vi } from 'vitest'

import { useAIThread } from '../hooks/use-ai-thread'

const openThread = vi.fn()
const startThread = vi.fn(() => 'thread-new')

vi.mock('@assistant-ui/react', () => ({
  useAui: () => ({ thread: { source: {} } }),
  useAuiState: () => [],
}))

vi.mock('../components/provider/ai-context', () => ({
  useAIContextInternal: () => ({
    threadId: 'thread-a',
    openThread,
    startThread,
  }),
}))

describe('useAIThread thread changes', () => {
  it('asks the provider to open the thread on switchThread', () => {
    const { result } = renderHook(() => useAIThread())

    result.current.switchThread('thread-b')

    expect(openThread).toHaveBeenCalledWith('thread-b')
  })

  it('asks the provider for a new thread on createThread', () => {
    const { result } = renderHook(() => useAIThread())

    expect(result.current.createThread()).toBe('thread-new')
    expect(startThread).toHaveBeenCalledTimes(1)
  })
})
