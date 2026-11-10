import { StrictMode, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import {
  act,
  describe,
  expect,
  it,
  render,
  waitFor,
} from '@vtex/shoreline-test-utils'
import { vi } from 'vitest'

import { AIProvider } from '../components/provider/ai-provider'
import { useAIThread } from '../hooks/use-ai-thread'
import type { AIMessage, AIThreadData } from '../types/public'
import type { AIThreadAdapter } from '../types/threads'
import type { AIRuntime } from '../types/runtime'
import {
  createRuntimeChannel,
  createRuntimeCore,
  getRuntimeCore,
} from '../runtime/runtime-core'

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

function createRuntime(): AIRuntime {
  const engine = { thread: { reset: vi.fn(), cancelRun: vi.fn() } }

  return createRuntimeCore(engine as never, createRuntimeChannel())
}

function resetOf(runtime: AIRuntime) {
  return vi.mocked(getRuntimeCore(runtime).engine.thread.reset)
}

function adapterOf(load: AIThreadAdapter['load']): AIThreadAdapter {
  return { list: async (): Promise<AIThreadData[]> => [], load }
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
  it('calls load on mount when initial threadId is set', async () => {
    const runtime = createRuntime()
    const load = vi.fn(
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
      <AIProvider runtime={runtime} threadId="conv-a" threads={adapterOf(load)}>
        <div />
      </AIProvider>
    )

    await waitFor(() => {
      expect(load).toHaveBeenCalledWith('conv-a')
    })
  })

  it('resets then loads when switching between two thread ids', async () => {
    const runtime = createRuntime()
    const load = vi.fn(
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
      <AIProvider runtime={runtime} threadId="conv-a" threads={adapterOf(load)}>
        <div />
      </AIProvider>
    )

    await waitFor(() => expect(load).toHaveBeenCalledWith('conv-a'))

    resetOf(runtime).mockClear()
    load.mockClear()

    rerender(
      <AIProvider runtime={runtime} threadId="conv-b" threads={adapterOf(load)}>
        <div />
      </AIProvider>
    )

    await waitFor(() => {
      expect(resetOf(runtime)).toHaveBeenCalledWith([])
    })

    await waitFor(() => {
      expect(load).toHaveBeenCalledWith('conv-b')
    })
  })

  it('exposes isOpeningThread while load is pending', async () => {
    const runtime = createRuntime()
    let resolveOpen: (messages: AIMessage[]) => void = () => {}
    const load = vi.fn(
      () =>
        new Promise<AIMessage[]>((resolve) => {
          resolveOpen = resolve
        })
    )

    let latest: ReturnType<typeof useAIThread> | null = null

    render(
      <AIProvider runtime={runtime} threadId="conv-a" threads={adapterOf(load)}>
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

  it('sets error when load rejects', async () => {
    const runtime = createRuntime()
    const load = vi.fn(async () => {
      throw new Error('timeline failed')
    })

    let latest: ReturnType<typeof useAIThread> | null = null

    render(
      <AIProvider runtime={runtime} threadId="conv-a" threads={adapterOf(load)}>
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

  it('clears error when thread id changes before load resolves', async () => {
    const runtime = createRuntime()
    let rejectOpen: (reason: Error) => void = () => {}
    const load = vi.fn(
      () =>
        new Promise<AIMessage[]>((_resolve, reject) => {
          rejectOpen = reject
        })
    )

    let latest: ReturnType<typeof useAIThread> | null = null

    const { rerender } = render(
      <AIProvider runtime={runtime} threadId="conv-a" threads={adapterOf(load)}>
        <ThreadProbe
          onUpdate={(value) => {
            latest = value
          }}
        />
      </AIProvider>
    )

    await waitFor(() => expect(load).toHaveBeenCalledWith('conv-a'))

    rerender(
      <AIProvider runtime={runtime} threadId="conv-b" threads={adapterOf(load)}>
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

  it('ignores a load result that arrives after the user switched thread', async () => {
    const runtime = createRuntime()
    const resolvers: Record<string, (messages: AIMessage[]) => void> = {}
    const load = vi.fn(
      (id: string) =>
        new Promise<AIMessage[]>((resolve) => {
          resolvers[id] = resolve
        })
    )

    let latest: ReturnType<typeof useAIThread> | null = null
    const probe = (
      <ThreadProbe
        onUpdate={(value) => {
          latest = value
        }}
      />
    )

    const { rerender } = render(
      <AIProvider runtime={runtime} threadId="conv-a" threads={adapterOf(load)}>
        {probe}
      </AIProvider>
    )

    await waitFor(() => expect(load).toHaveBeenCalledWith('conv-a'))

    rerender(
      <AIProvider runtime={runtime} threadId="conv-b" threads={adapterOf(load)}>
        {probe}
      </AIProvider>
    )

    await waitFor(() => expect(load).toHaveBeenCalledWith('conv-b'))

    resolvers['conv-a']([
      {
        id: 'late',
        role: 'user',
        createdAt: '2026-01-01T00:00:00Z',
        parts: [{ type: 'text', text: 'late' }],
      },
    ])

    await Promise.resolve()
    await Promise.resolve()

    expect(latest?.isOpeningThread).toBe(true)
    expect(resetOf(runtime)).toHaveBeenCalledTimes(1)
    expect(resetOf(runtime)).toHaveBeenCalledWith([])

    resolvers['conv-b']([])

    await waitFor(() => expect(latest?.isOpeningThread).toBe(false))
  })

  it('ignores a load result that arrives after the provider unmounted', async () => {
    const runtime = createRuntime()
    let resolve: (messages: AIMessage[]) => void = () => {}
    const load = vi.fn(
      () =>
        new Promise<AIMessage[]>((res) => {
          resolve = res
        })
    )

    const { unmount } = render(
      <AIProvider runtime={runtime} threadId="conv-a" threads={adapterOf(load)}>
        {null}
      </AIProvider>
    )

    await waitFor(() => expect(load).toHaveBeenCalledWith('conv-a'))
    unmount()

    resolve([
      {
        id: 'late',
        role: 'user',
        createdAt: '2026-01-01T00:00:00Z',
        parts: [{ type: 'text', text: 'late' }],
      },
    ])

    await new Promise((done) => setTimeout(done, 0))

    expect(resetOf(runtime)).not.toHaveBeenCalled()
  })

  it('still applies the load result under StrictMode double effects', async () => {
    const runtime = createRuntime()
    const load = vi.fn(
      async (): Promise<AIMessage[]> => [
        {
          id: 'm1',
          role: 'user',
          createdAt: '2026-01-01T00:00:00Z',
          parts: [{ type: 'text', text: 'hi' }],
        },
      ]
    )

    render(
      <StrictMode>
        <AIProvider
          runtime={runtime}
          threadId="conv-a"
          threads={adapterOf(load)}
        >
          {null}
        </AIProvider>
      </StrictMode>
    )

    await waitFor(() => expect(resetOf(runtime)).toHaveBeenCalledTimes(1))
  })

  it('does not reopen the thread when the adapter object changes between renders', async () => {
    const runtime = createRuntime()
    const load = vi.fn(async (): Promise<AIMessage[]> => [])

    const { rerender } = render(
      <AIProvider runtime={runtime} threadId="conv-a" threads={adapterOf(load)}>
        <div />
      </AIProvider>
    )

    await waitFor(() => expect(load).toHaveBeenCalledTimes(1))

    rerender(
      <AIProvider runtime={runtime} threadId="conv-a" threads={adapterOf(load)}>
        <div />
      </AIProvider>
    )

    await Promise.resolve()

    expect(load).toHaveBeenCalledTimes(1)
  })

  it('does not call load when the adapter has no load', async () => {
    const runtime = createRuntime()
    const list = vi.fn(async (): Promise<AIThreadData[]> => [])

    let latest: ReturnType<typeof useAIThread> | null = null

    render(
      <AIProvider runtime={runtime} threadId="conv-a" threads={{ list }}>
        <ThreadProbe
          onUpdate={(value) => {
            latest = value
          }}
        />
      </AIProvider>
    )

    await waitFor(() => expect(latest).not.toBeNull())

    expect(latest?.isOpeningThread).toBe(false)
    expect(latest?.error).toBeNull()
  })

  it('sets error type thread_open when load rejects', async () => {
    const runtime = createRuntime()
    const load = vi.fn(async (): Promise<AIMessage[]> => {
      throw new Error('boom')
    })

    let latest: ReturnType<typeof useAIThread> | null = null

    render(
      <AIProvider runtime={runtime} threadId="conv-a" threads={adapterOf(load)}>
        <ThreadProbe
          onUpdate={(value) => {
            latest = value
          }}
        />
      </AIProvider>
    )

    await waitFor(() => expect(latest?.error?.type).toBe('thread_open'))
  })
})

describe('AIProvider controlled thread changes from the hooks', () => {
  function ControlledParent(props: {
    runtime: AIRuntime
    initialThreadId: string | null
    threads: AIThreadAdapter
    onThreadChange: (id: string | null) => void
    onUpdate: (value: ReturnType<typeof useAIThread>) => void
  }) {
    const [threadId, setThreadId] = useState(props.initialThreadId)

    return (
      <AIProvider
        runtime={props.runtime}
        threadId={threadId}
        threads={props.threads}
        onThreadChange={(id) => {
          props.onThreadChange(id)
          setThreadId(id)
        }}
      >
        <ThreadProbe onUpdate={props.onUpdate} />
      </AIProvider>
    )
  }

  function setup(initialThreadId: string | null) {
    const runtime = createRuntime()
    const load = vi.fn(async (): Promise<AIMessage[]> => [])
    const onThreadChange = vi.fn()
    const api: { current: ReturnType<typeof useAIThread> | null } = {
      current: null,
    }

    render(
      <ControlledParent
        runtime={runtime}
        initialThreadId={initialThreadId}
        threads={adapterOf(load)}
        onThreadChange={onThreadChange}
        onUpdate={(value) => {
          api.current = value
        }}
      />
    )

    const thread = () => {
      if (!api.current) throw new Error('probe did not render')

      return api.current
    }

    return { runtime, load, onThreadChange, thread }
  }

  it('does not call threads.load from createThread', async () => {
    const { runtime, load, onThreadChange, thread } = setup('conv-a')

    await waitFor(() => expect(load).toHaveBeenCalledWith('conv-a'))
    load.mockClear()

    let created = ''

    act(() => {
      created = thread().createThread()
    })

    await waitFor(() => expect(thread().threadId).toBe(created))
    expect(onThreadChange).toHaveBeenCalledWith(created)
    expect(load).not.toHaveBeenCalled()
    expect(resetOf(runtime)).toHaveBeenCalledTimes(1)
    expect(resetOf(runtime)).toHaveBeenCalledWith([])
    expect(thread().isOpeningThread).toBe(false)
  })

  it('resets once and loads once on switchThread', async () => {
    const { runtime, load, onThreadChange, thread } = setup('conv-a')

    await waitFor(() => expect(load).toHaveBeenCalledWith('conv-a'))
    load.mockClear()

    act(() => thread().switchThread('conv-b'))

    await waitFor(() => expect(thread().threadId).toBe('conv-b'))
    await waitFor(() => expect(thread().isOpeningThread).toBe(false))
    expect(onThreadChange).toHaveBeenCalledWith('conv-b')
    expect(load).toHaveBeenCalledTimes(1)
    expect(load).toHaveBeenCalledWith('conv-b')
    expect(resetOf(runtime)).toHaveBeenCalledTimes(1)
  })

  it('does nothing but stop the run when switching to the active thread', async () => {
    const { runtime, load, onThreadChange, thread } = setup('conv-a')

    await waitFor(() => expect(load).toHaveBeenCalledWith('conv-a'))
    load.mockClear()

    act(() => thread().switchThread('conv-a'))

    expect(getRuntimeCore(runtime).engine.thread.cancelRun).toHaveBeenCalled()
    expect(onThreadChange).not.toHaveBeenCalled()
    expect(load).not.toHaveBeenCalled()
    expect(resetOf(runtime)).not.toHaveBeenCalled()
  })
})

describe('AIProvider controlled thread changes from the parent', () => {
  it('resets and loads when the parent opens a thread from no thread', async () => {
    const runtime = createRuntime()
    const load = vi.fn(async (): Promise<AIMessage[]> => [])

    const { rerender } = render(
      <AIProvider runtime={runtime} threadId={null} threads={adapterOf(load)}>
        <div />
      </AIProvider>
    )

    expect(load).not.toHaveBeenCalled()

    rerender(
      <AIProvider runtime={runtime} threadId="conv-x" threads={adapterOf(load)}>
        <div />
      </AIProvider>
    )

    await waitFor(() => expect(load).toHaveBeenCalledWith('conv-x'))
    expect(resetOf(runtime)).toHaveBeenCalledTimes(1)
    expect(resetOf(runtime)).toHaveBeenCalledWith([])
  })
})
