import { useMemo, type ReactNode } from 'react'
import {
  act,
  describe,
  expect,
  it,
  render,
  screen,
  waitFor,
} from '@vtex/shoreline-test-utils'

import { AIProvider } from '../components/provider'
import { useAIStreamDebug } from '../components/debug'
import { useAIStatus } from '../hooks/use-ai-status'
import { useAIThread } from '../hooks/use-ai-thread'
import { createRuntimeBuilder } from '../runtime/builder'
import { useRuntime } from '../runtime/use-runtime'
import { createMockStreamTransport } from '../test-utils'

type Handles = Record<string, ReturnType<typeof useAIThread>>

function Provider(props: {
  threadId: string
  debugStream?: boolean
  children: ReactNode
}) {
  const { threadId, debugStream, children } = props
  const built = useMemo(
    () =>
      createRuntimeBuilder()
        .transport(createMockStreamTransport({ delayMs: 0 }))
        .build(),
    []
  )
  const runtime = useRuntime(built)

  return (
    <AIProvider runtime={runtime} threadId={threadId} debugStream={debugStream}>
      {children}
    </AIProvider>
  )
}

function Probe(props: { name: string; handles: Handles }) {
  const { name, handles } = props
  const thread = useAIThread()
  const { status } = useAIStatus()
  const { enabled, runs } = useAIStreamDebug()

  handles[name] = thread

  return (
    <div data-testid={name}>
      <span>{`${name} thread=${thread.threadId}`}</span>
      <span>{`${name} status=${status}`}</span>
      <span>{`${name} messages=${thread.messages.length}`}</span>
      <span>{`${name} debug=${enabled ? runs.length : 'off'}`}</span>
    </div>
  )
}

function send(handles: Handles, name: string, text: string) {
  act(() => {
    handles[name].sendMessage({ text })
  })
}

describe('provider isolation', () => {
  it('keeps two sibling providers independent', async () => {
    const handles: Handles = {}

    render(
      <>
        <Provider threadId="thread-a" debugStream>
          <Probe name="a" handles={handles} />
        </Provider>
        <Provider threadId="thread-b">
          <Probe name="b" handles={handles} />
        </Provider>
      </>
    )

    expect(screen.getByText('a thread=thread-a')).toBeTruthy()
    expect(screen.getByText('b thread=thread-b')).toBeTruthy()
    expect(screen.getByText('a debug=0')).toBeTruthy()
    expect(screen.getByText('b debug=off')).toBeTruthy()

    send(handles, 'a', 'only for a')

    await waitFor(() => expect(screen.getByText('a status=ready')).toBeTruthy())
    expect(screen.getByText('a messages=2')).toBeTruthy()
    expect(screen.getByText('a debug=1')).toBeTruthy()

    expect(screen.getByText('b status=idle')).toBeTruthy()
    expect(screen.getByText('b messages=0')).toBeTruthy()
    expect(screen.getByText('b debug=off')).toBeTruthy()

    send(handles, 'b', 'now for b')

    await waitFor(() => expect(screen.getByText('b status=ready')).toBeTruthy())
    expect(screen.getByText('b messages=2')).toBeTruthy()
    expect(screen.getByText('b debug=off')).toBeTruthy()
    expect(screen.getByText('a messages=2')).toBeTruthy()
    expect(screen.getByText('a debug=1')).toBeTruthy()
  })

  it('keeps a nested provider independent from its parent', async () => {
    const handles: Handles = {}

    render(
      <Provider threadId="outer" debugStream>
        <Probe name="outer" handles={handles} />
        <Provider threadId="inner">
          <Probe name="inner" handles={handles} />
        </Provider>
      </Provider>
    )

    // Each probe reads the nearest provider: the inner one has its own
    // thread id and does not see the outer debug records.
    expect(screen.getByText('outer thread=outer')).toBeTruthy()
    expect(screen.getByText('inner thread=inner')).toBeTruthy()
    expect(screen.getByText('outer debug=0')).toBeTruthy()
    expect(screen.getByText('inner debug=off')).toBeTruthy()

    send(handles, 'inner', 'inner message')

    await waitFor(() =>
      expect(screen.getByText('inner status=ready')).toBeTruthy()
    )
    expect(screen.getByText('inner messages=2')).toBeTruthy()
    expect(screen.getByText('outer status=idle')).toBeTruthy()
    expect(screen.getByText('outer messages=0')).toBeTruthy()
    expect(screen.getByText('outer debug=0')).toBeTruthy()
    expect(screen.getByText('inner debug=off')).toBeTruthy()

    send(handles, 'outer', 'outer message')

    await waitFor(() =>
      expect(screen.getByText('outer status=ready')).toBeTruthy()
    )
    expect(screen.getByText('outer debug=1')).toBeTruthy()
    expect(screen.getByText('inner messages=2')).toBeTruthy()
    expect(screen.getByText('inner debug=off')).toBeTruthy()
  })
})
