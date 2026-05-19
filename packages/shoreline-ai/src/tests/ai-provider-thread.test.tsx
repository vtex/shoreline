import type { ReactNode } from 'react'
import {
  describe,
  expect,
  it,
  render,
  waitFor,
} from '@vtex/shoreline-test-utils'
import { vi } from 'vitest'

import { AIProvider } from '../components/provider/ai-provider'
import type { AIMessage } from '../types/public'
import type { AIRuntime } from '../types/runtime'

vi.mock('@assistant-ui/react', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@assistant-ui/react')>()

  return {
    ...mod,
    AssistantRuntimeProvider: ({ children }: { children: ReactNode }) => (
      <>{children}</>
    ),
  }
})

function createRuntime() {
  return {
    thread: {
      reset: vi.fn(),
    },
  } as unknown as AIRuntime
}

describe('AIProvider controlled thread', () => {
  it('calls onThreadOpen on mount when initial threadId is set', async () => {
    const runtime = createRuntime()
    const onThreadOpen = vi.fn(
      async (): Promise<AIMessage[]> => [
        {
          id: 'm1',
          role: 'user',
          createdAt: '2026-01-01T00:00:00Z',
          parts: [{ type: 'text', text: 'hello' }],
        },
      ]
    )

    render(
      <AIProvider
        runtime={runtime}
        threadId="conv-a"
        onThreadOpen={onThreadOpen}
      >
        <div />
      </AIProvider>
    )

    await waitFor(() => {
      expect(onThreadOpen).toHaveBeenCalledWith('conv-a')
    })

    await waitFor(() => {
      expect(runtime.thread.reset).toHaveBeenCalled()
    })
  })

  it('resets then loads when switching between two thread ids', async () => {
    const runtime = createRuntime()
    const onThreadOpen = vi.fn(
      async (id: string): Promise<AIMessage[]> => [
        {
          id: `m-${id}`,
          role: 'user',
          createdAt: '2026-01-01T00:00:00Z',
          parts: [{ type: 'text', text: id }],
        },
      ]
    )

    const { rerender } = render(
      <AIProvider
        runtime={runtime}
        threadId="conv-a"
        onThreadOpen={onThreadOpen}
      >
        <div />
      </AIProvider>
    )

    await waitFor(() => expect(onThreadOpen).toHaveBeenCalledWith('conv-a'))

    vi.mocked(runtime.thread.reset).mockClear()
    onThreadOpen.mockClear()

    rerender(
      <AIProvider
        runtime={runtime}
        threadId="conv-b"
        onThreadOpen={onThreadOpen}
      >
        <div />
      </AIProvider>
    )

    await waitFor(() => {
      expect(runtime.thread.reset).toHaveBeenCalledWith([])
    })

    await waitFor(() => {
      expect(onThreadOpen).toHaveBeenCalledWith('conv-b')
    })
  })
})
