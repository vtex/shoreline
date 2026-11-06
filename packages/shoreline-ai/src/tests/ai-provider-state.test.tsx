import {
  act,
  describe,
  expect,
  it,
  render,
  waitFor,
} from '@vtex/shoreline-test-utils'
import { useMemo } from 'react'

import { AIProvider } from '../components/provider/ai-provider'
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

type Api = {
  thread: ReturnType<typeof useAIThread>
  status: ReturnType<typeof useAIStatus>
}

function Probe(props: { api: { current: Api | null } }) {
  props.api.current = { thread: useAIThread(), status: useAIStatus() }

  return null
}

interface HarnessProps {
  transport: StreamTransport
  api: { current: Api | null }
  threadId?: string | null
  threads?: AIThreadAdapter
  debugStream?: boolean
}

function Harness(props: HarnessProps) {
  const { transport, api, threadId, threads, debugStream } = props
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
    >
      <Probe api={api} />
    </AIProvider>
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
  it('keeps the run error when a controlled thread id goes from null to a first id', async () => {
    const api: { current: Api | null } = { current: null }
    const { rerender } = render(
      <Harness transport={FAILING_TRANSPORT} api={api} threadId={null} />
    )

    act(() => getApi(api).thread.sendMessage({ text: 'hello' }))
    await waitFor(() => expect(getApi(api).status.status).toBe('error'))

    rerender(
      <Harness transport={FAILING_TRANSPORT} api={api} threadId="conv-a" />
    )

    expect(getApi(api).status.status).toBe('error')
    expect(getApi(api).status.error).toEqual({ type: 'run', message: 'boom' })
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
