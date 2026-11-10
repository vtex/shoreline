import {
  act,
  describe,
  expect,
  it,
  render,
  waitFor,
} from '@vtex/shoreline-test-utils'
import { useMemo, useState } from 'react'
import { vi } from 'vitest'

import { AIProvider } from '../components/provider/ai-provider'
import { useAIComposer } from '../hooks/use-ai-composer'
import { useAIStatus } from '../hooks/use-ai-status'
import { useAIThread } from '../hooks/use-ai-thread'
import { createRuntimeBuilder } from '../runtime/builder'
import type { StreamTransport } from '../runtime/types'
import { useRuntime } from '../runtime/use-runtime'
import type { AIMessage } from '../types/public'
import type { AIThreadAdapter } from '../types/threads'

function deferred<T>() {
  let resolve!: (value: T) => void
  let reject!: (reason: unknown) => void
  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })

  return { promise, resolve, reject }
}

const FAILING_TRANSPORT: StreamTransport = {
  // biome-ignore lint/correctness/useYield: the transport fails before any snapshot
  async *run() {
    throw new Error('boom')
  },
}

const REPLY_TRANSPORT: StreamTransport = {
  // biome-ignore lint/correctness/useYield: returns the reply right away
  async *run() {
    return { parts: [{ type: 'text', text: 'reply' }], status: 'ready' }
  },
}

function withLoad(load: AIThreadAdapter['load']): AIThreadAdapter {
  return { list: async () => [], load }
}

function history(id: string): AIMessage[] {
  return [
    {
      id: `m-${id}`,
      role: 'user',
      createdAt: '2026-01-01T00:00:00Z',
      parts: [{ type: 'text', text: `history of ${id}` }],
    },
  ]
}

/** A transport that replies and records the thread id of each run. */
function recordingTransport(fail = false) {
  const threadIds: string[] = []
  const transport: StreamTransport = {
    // biome-ignore lint/correctness/useYield: returns the reply right away
    async *run(input) {
      threadIds.push(input.threadId)

      if (fail) throw new Error('boom')

      return { parts: [{ type: 'text', text: 'reply' }], status: 'ready' }
    },
  }

  return { transport, threadIds }
}

type Api = {
  thread: ReturnType<typeof useAIThread>
  status: ReturnType<typeof useAIStatus>
  composer: ReturnType<typeof useAIComposer>
}

function Probe(props: { api: { current: Api | null } }) {
  props.api.current = {
    thread: useAIThread(),
    status: useAIStatus(),
    composer: useAIComposer(),
  }

  return null
}

interface HarnessProps {
  transport: StreamTransport
  api: { current: Api | null }
  threadId?: string | null
  threads?: AIThreadAdapter
  debugStream?: boolean
  onThreadChange?: (id: string | null) => void
}

function Harness(props: HarnessProps) {
  const { transport, api, threadId, threads, debugStream, onThreadChange } =
    props
  const built = useMemo(
    () => createRuntimeBuilder().transport(transport).build(),
    [transport]
  )
  const runtime = useRuntime(built)

  return (
    <AIProvider
      runtime={runtime}
      threadId={threadId}
      threads={threads}
      debugStream={debugStream}
      onThreadChange={onThreadChange}
    >
      <Probe api={api} />
    </AIProvider>
  )
}

/** A parent that controls the thread id and keeps what the provider sends. */
function ControlledHarness(
  props: Omit<HarnessProps, 'threadId'> & { initialThreadId: string | null }
) {
  const { initialThreadId, onThreadChange, ...rest } = props
  const [threadId, setThreadId] = useState(initialThreadId)

  return (
    <Harness
      {...rest}
      threadId={threadId}
      onThreadChange={(id) => {
        onThreadChange?.(id)
        setThreadId(id)
      }}
    />
  )
}

function getApi(api: { current: Api | null }): Api {
  if (!api.current) throw new Error('Probe did not render')

  return api.current
}

function textOf(message: AIMessage): string {
  const first = message.parts[0]

  return first?.type === 'text' ? first.text : ''
}

describe('AIProvider run error', () => {
  it('keeps the run error when the provider names the first thread', async () => {
    const api: { current: Api | null } = { current: null }
    const { transport } = recordingTransport(true)

    render(
      <ControlledHarness
        transport={transport}
        api={api}
        initialThreadId={null}
      />
    )

    act(() => getApi(api).thread.sendMessage({ text: 'hello' }))
    await waitFor(() => expect(getApi(api).status.status).toBe('error'))
    await waitFor(() => expect(getApi(api).thread.threadId).not.toBeNull())

    expect(getApi(api).status.error).toEqual({ type: 'run', message: 'boom' })
    expect(getApi(api).thread.messages).toHaveLength(2)
  })

  it('clears the run error when a controlled thread id changes to another id', async () => {
    const api: { current: Api | null } = { current: null }
    const { rerender } = render(
      <Harness transport={FAILING_TRANSPORT} api={api} threadId="conv-a" />
    )

    act(() => getApi(api).thread.sendMessage({ text: 'hello' }))
    await waitFor(() => expect(getApi(api).status.status).toBe('error'))

    rerender(
      <Harness transport={FAILING_TRANSPORT} api={api} threadId="conv-b" />
    )

    await waitFor(() => expect(getApi(api).status.error).toBeNull())
  })
})

describe('AIProvider debugStream toggle', () => {
  it('keeps the uncontrolled thread id and the messages when debugStream changes', async () => {
    const api: { current: Api | null } = { current: null }
    const { rerender } = render(
      <Harness transport={REPLY_TRANSPORT} api={api} debugStream={false} />
    )

    act(() => getApi(api).thread.switchThread('conv-a'))
    act(() => getApi(api).thread.sendMessage({ text: 'hello' }))
    await waitFor(() => expect(getApi(api).status.status).toBe('ready'))
    expect(getApi(api).thread.messages).toHaveLength(2)

    rerender(<Harness transport={REPLY_TRANSPORT} api={api} debugStream />)

    expect(getApi(api).thread.threadId).toBe('conv-a')
    expect(getApi(api).thread.messages).toHaveLength(2)

    rerender(
      <Harness transport={REPLY_TRANSPORT} api={api} debugStream={false} />
    )

    expect(getApi(api).thread.threadId).toBe('conv-a')
    expect(getApi(api).thread.messages.map(textOf)).toEqual(['hello', 'reply'])
  })
})

describe('AIProvider uncontrolled switchThread', () => {
  it('loads the thread with threads.load and shows its messages', async () => {
    const api: { current: Api | null } = { current: null }
    const pending = deferred<AIMessage[]>()
    const load = vi.fn().mockReturnValue(pending.promise)

    render(
      <Harness transport={REPLY_TRANSPORT} api={api} threads={withLoad(load)} />
    )

    act(() => getApi(api).thread.switchThread('conv-a'))

    expect(load).toHaveBeenCalledTimes(1)
    expect(load).toHaveBeenCalledWith('conv-a')
    expect(getApi(api).thread.threadId).toBe('conv-a')
    expect(getApi(api).thread.isOpeningThread).toBe(true)

    await act(async () => {
      pending.resolve(history('conv-a'))
    })

    expect(getApi(api).thread.isOpeningThread).toBe(false)
    expect(getApi(api).thread.messages.map(textOf)).toEqual([
      'history of conv-a',
    ])
  })

  it('ignores a late result after another switch', async () => {
    const api: { current: Api | null } = { current: null }
    const first = deferred<AIMessage[]>()
    const load = vi.fn((id: string) =>
      id === 'conv-a' ? first.promise : Promise.resolve(history(id))
    )

    render(
      <Harness transport={REPLY_TRANSPORT} api={api} threads={withLoad(load)} />
    )

    act(() => getApi(api).thread.switchThread('conv-a'))
    act(() => getApi(api).thread.switchThread('conv-b'))
    await waitFor(() =>
      expect(getApi(api).thread.messages.map(textOf)).toEqual([
        'history of conv-b',
      ])
    )

    await act(async () => {
      first.resolve(history('conv-a'))
    })

    expect(getApi(api).thread.threadId).toBe('conv-b')
    expect(getApi(api).thread.isOpeningThread).toBe(false)
    expect(getApi(api).thread.messages.map(textOf)).toEqual([
      'history of conv-b',
    ])
  })

  it('does not call threads.load from createThread', async () => {
    const api: { current: Api | null } = { current: null }
    const load = vi.fn().mockResolvedValue(history('x'))

    render(
      <Harness transport={REPLY_TRANSPORT} api={api} threads={withLoad(load)} />
    )

    act(() => {
      getApi(api).thread.createThread()
    })

    expect(load).not.toHaveBeenCalled()
    expect(getApi(api).thread.isOpeningThread).toBe(false)
  })

  it('drops a pending load when a thread is created', async () => {
    const api: { current: Api | null } = { current: null }
    const pending = deferred<AIMessage[]>()
    const load = vi.fn().mockReturnValue(pending.promise)

    render(
      <Harness transport={REPLY_TRANSPORT} api={api} threads={withLoad(load)} />
    )

    act(() => getApi(api).thread.switchThread('conv-a'))
    act(() => {
      getApi(api).thread.createThread()
    })

    expect(getApi(api).thread.isOpeningThread).toBe(false)

    await act(async () => {
      pending.resolve(history('conv-a'))
    })

    expect(getApi(api).thread.messages).toEqual([])
  })

  it('sets the thread_open error when threads.load rejects', async () => {
    const api: { current: Api | null } = { current: null }
    const load = vi.fn().mockRejectedValue(new Error('not found'))

    render(
      <Harness transport={REPLY_TRANSPORT} api={api} threads={withLoad(load)} />
    )

    act(() => getApi(api).thread.switchThread('conv-a'))

    await waitFor(() =>
      expect(getApi(api).thread.error).toEqual({
        type: 'thread_open',
        message: 'not found',
      })
    )
    expect(getApi(api).thread.isOpeningThread).toBe(false)
  })
})

describe('AIProvider controlled switchThread', () => {
  it('loads the new thread once and keeps it when the parent passes the id back', async () => {
    const api: { current: Api | null } = { current: null }
    const load = vi.fn((id: string) => Promise.resolve(history(id)))
    const onThreadChange = vi.fn()
    const threads = withLoad(load)
    const { rerender } = render(
      <Harness
        transport={REPLY_TRANSPORT}
        api={api}
        threadId="conv-a"
        threads={threads}
        onThreadChange={onThreadChange}
      />
    )

    await waitFor(() =>
      expect(getApi(api).thread.messages.map(textOf)).toEqual([
        'history of conv-a',
      ])
    )

    act(() => getApi(api).thread.switchThread('conv-b'))

    expect(onThreadChange).toHaveBeenCalledWith('conv-b')
    expect(load).toHaveBeenCalledTimes(2)
    expect(load).toHaveBeenLastCalledWith('conv-b')

    rerender(
      <Harness
        transport={REPLY_TRANSPORT}
        api={api}
        threadId="conv-b"
        threads={threads}
        onThreadChange={onThreadChange}
      />
    )

    await waitFor(() =>
      expect(getApi(api).thread.messages.map(textOf)).toEqual([
        'history of conv-b',
      ])
    )
    expect(load).toHaveBeenCalledTimes(2)
    expect(load).toHaveBeenLastCalledWith('conv-b')
  })
})

describe('AIProvider first message without a thread id', () => {
  it.each([
    ['uncontrolled', false],
    ['controlled', true],
  ])(
    'creates the id, tells the parent and sends it to the transport (%s)',
    async (_mode, controlled) => {
      const api: { current: Api | null } = { current: null }
      const { transport, threadIds } = recordingTransport()
      const load = vi.fn().mockResolvedValue([])
      const onThreadChange = vi.fn()
      const props = {
        transport,
        api,
        threads: withLoad(load),
        onThreadChange,
      }

      render(
        controlled ? (
          <ControlledHarness {...props} initialThreadId={null} />
        ) : (
          <Harness {...props} />
        )
      )

      expect(getApi(api).thread.threadId).toBeNull()

      act(() => getApi(api).thread.sendMessage({ text: 'hello' }))
      await waitFor(() => expect(getApi(api).status.status).toBe('ready'))

      const [created] = threadIds

      expect(threadIds).toHaveLength(1)
      expect(created).toEqual(expect.any(String))
      expect(onThreadChange).toHaveBeenCalledTimes(1)
      expect(onThreadChange).toHaveBeenCalledWith(created)
      await waitFor(() => expect(getApi(api).thread.threadId).toBe(created))
      expect(load).not.toHaveBeenCalled()
      expect(getApi(api).thread.messages.map(textOf)).toEqual([
        'hello',
        'reply',
      ])

      act(() => getApi(api).thread.sendMessage({ text: 'again' }))
      await waitFor(() => expect(getApi(api).thread.messages).toHaveLength(4))

      expect(threadIds).toEqual([created, created])
      expect(onThreadChange).toHaveBeenCalledTimes(1)
    }
  )

  it('also creates the id for a message sent from the composer', async () => {
    const api: { current: Api | null } = { current: null }
    const { transport, threadIds } = recordingTransport()
    const onThreadChange = vi.fn()

    render(
      <Harness
        transport={transport}
        api={api}
        onThreadChange={onThreadChange}
      />
    )

    act(() => getApi(api).composer.setText('hello'))
    act(() => getApi(api).composer.send())
    await waitFor(() => expect(getApi(api).status.status).toBe('ready'))

    expect(threadIds).toHaveLength(1)
    expect(onThreadChange).toHaveBeenCalledWith(threadIds[0])
    expect(getApi(api).thread.threadId).toBe(threadIds[0])
  })

  it('sends the active thread id to the transport', async () => {
    const api: { current: Api | null } = { current: null }
    const { transport, threadIds } = recordingTransport()

    render(<Harness transport={transport} api={api} threadId="conv-a" />)

    act(() => getApi(api).thread.sendMessage({ text: 'hello' }))
    await waitFor(() => expect(getApi(api).status.status).toBe('ready'))

    expect(threadIds).toEqual(['conv-a'])
  })
})
