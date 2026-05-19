import { useEffect } from 'react'
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
import { useAIThread } from '../hooks/use-ai-thread'
import type { AIMessage } from '../types/public'
import type { AIRuntime } from '../types/runtime'

vi.mock('@assistant-ui/react', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@assistant-ui/react')>()

  return {
    ...mod,
    AssistantRuntimeProvider: ({ children }: { children: ReactNode }) => (
      <>{children}</>
    ),
    useAui: () => ({
      thread: { source: null },
    }),
    useAuiState: () => [],
  }
})

function createRuntime() {
  return {
    thread: {
      reset: vi.fn(),
    },
  } as unknown as AIRuntime
}

function ThreadProbe(props: {
  onUpdate: (value: ReturnType<typeof useAIThread>) => void
}) {
  const thread = useAIThread()
  useEffect(() => {
    props.onUpdate(thread)
  }, [thread, props])
  return null
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

  it('exposes isOpeningThread while onThreadOpen is pending', async () => {
    const runtime = createRuntime()
    let resolveOpen: (messages: AIMessage[]) => void = () => {}
    const onThreadOpen = vi.fn(
      () =>
        new Promise<AIMessage[]>((resolve) => {
          resolveOpen = resolve
        })
    )

    let latest: ReturnType<typeof useAIThread> | null = null

    render(
      <AIProvider
        runtime={runtime}
        threadId="conv-a"
        onThreadOpen={onThreadOpen}
      >
        <ThreadProbe
          onUpdate={(value) => {
            latest = value
          }}
        />
      </AIProvider>
    )

    await waitFor(() => {
      expect(latest?.isOpeningThread).toBe(true)
    })

    resolveOpen([])

    await waitFor(() => {
      expect(latest?.isOpeningThread).toBe(false)
    })
  })

  it('sets error when onThreadOpen rejects', async () => {
    const runtime = createRuntime()
    const onThreadOpen = vi.fn(async () => {
      throw new Error('timeline failed')
    })

    let latest: ReturnType<typeof useAIThread> | null = null

    render(
      <AIProvider
        runtime={runtime}
        threadId="conv-a"
        onThreadOpen={onThreadOpen}
      >
        <ThreadProbe
          onUpdate={(value) => {
            latest = value
          }}
        />
      </AIProvider>
    )

    await waitFor(() => {
      expect(latest?.error).toEqual({
        type: 'thread_open',
        message: 'timeline failed',
      })
      expect(latest?.isOpeningThread).toBe(false)
    })
  })

  it('clears error when thread id changes before onThreadOpen resolves', async () => {
    const runtime = createRuntime()
    let rejectOpen: (reason: Error) => void = () => {}
    const onThreadOpen = vi.fn(
      () =>
        new Promise<AIMessage[]>((_resolve, reject) => {
          rejectOpen = reject
        })
    )

    let latest: ReturnType<typeof useAIThread> | null = null

    const { rerender } = render(
      <AIProvider
        runtime={runtime}
        threadId="conv-a"
        onThreadOpen={onThreadOpen}
      >
        <ThreadProbe
          onUpdate={(value) => {
            latest = value
          }}
        />
      </AIProvider>
    )

    await waitFor(() => expect(onThreadOpen).toHaveBeenCalledWith('conv-a'))

    rerender(
      <AIProvider
        runtime={runtime}
        threadId="conv-b"
        onThreadOpen={onThreadOpen}
      >
        <ThreadProbe
          onUpdate={(value) => {
            latest = value
          }}
        />
      </AIProvider>
    )

    rejectOpen(new Error('stale'))

    await waitFor(() => {
      expect(latest?.error).toBeNull()
    })
  })
})
