import { describe, expect, it, renderHook } from '@vtex/shoreline-test-utils'
import { vi } from 'vitest'

import { useAIThread } from '../hooks/use-ai-thread'

const append = vi.fn()
const cancelRun = vi.fn()

vi.mock('@assistant-ui/react', () => ({
  useAui: () => ({
    thread: { append, cancelRun, source: {} },
  }),
  useAuiState: () => [],
}))

vi.mock('../components/provider/ai-context', () => ({
  useAIContextInternal: () => ({
    threadId: 'thread-a',
    isOpeningThread: false,
    error: null,
  }),
}))

describe('useAIThread.sendMessage', () => {
  it('appends user message and starts the run', () => {
    const { result } = renderHook(() => useAIThread())

    result.current.sendMessage({ text: 'Hello' })

    expect(append).toHaveBeenCalledWith(
      expect.objectContaining({
        role: 'user',
        startRun: true,
        content: expect.arrayContaining([
          expect.objectContaining({ type: 'text', text: 'Hello' }),
        ]),
      })
    )
  })
})
