import { memo } from 'react'
import {
  act,
  describe,
  expect,
  fireEvent,
  render,
  screen,
  test,
  vi,
  waitFor,
} from '@vtex/shoreline-test-utils'
import { LocaleProvider } from '@vtex/shoreline'

import { useAIThread } from '../../../hooks/use-ai-thread'
import { MockRuntimeProvider } from '../../../test-utils'
import type { RuntimeSnapshot, StreamTransport } from '../../../runtime/types'
import {
  AIMessageAssistant,
  AIMessageParts,
  AIMessageUser,
  AIMessages,
  useAIMessage,
} from '../index'

type Step = { snapshot?: RuntimeSnapshot; done?: boolean; error?: Error }

/** A transport whose run yields the snapshots the test pushes, in order. */
function controlledTransport() {
  const queue: Step[] = []
  let wake: (() => void) | null = null

  function send(step: Step) {
    queue.push(step)
    wake?.()
    wake = null
  }

  const transport: StreamTransport = {
    async *run() {
      while (true) {
        if (queue.length === 0) {
          await new Promise<void>((resolve) => {
            wake = resolve
          })
        }

        const step = queue.shift() as Step

        if (step.error) throw step.error
        if (step.done) return step.snapshot as RuntimeSnapshot
        yield step.snapshot as RuntimeSnapshot
      }
    },
  }

  return {
    transport,
    push: (parts: RuntimeSnapshot['parts']) =>
      act(() => send({ snapshot: { parts, status: 'streaming' } })),
    finish: (parts: RuntimeSnapshot['parts']) =>
      act(() => send({ snapshot: { parts, status: 'ready' }, done: true })),
    fail: () => act(() => send({ error: new Error('boom') })),
  }
}

function SendButton() {
  const { sendMessage } = useAIThread()

  return (
    <button type="button" onClick={() => sendMessage({ text: 'Hello' })}>
      Send Hello
    </button>
  )
}

const renders = { assistant: 0 }

const Probe = memo(function Probe(props: { name: 'user' | 'assistant' }) {
  const message = useAIMessage()

  if (props.name === 'assistant') renders.assistant++

  return (
    <span
      data-testid={`${props.name}-probe`}
      data-id={message.id}
      data-created-at={message.createdAt}
    >
      {message.role}/{message.status}
    </span>
  )
})

function renderThread(transport: StreamTransport) {
  return render(
    <LocaleProvider locale="en-US">
      <MockRuntimeProvider transport={transport} onRunError={() => {}}>
        <SendButton />
        <AIMessages>
          <AIMessageUser>
            <Probe name="user" />
          </AIMessageUser>
          <AIMessageAssistant>
            <AIMessageParts />
            <Probe name="assistant" />
          </AIMessageAssistant>
        </AIMessages>
      </MockRuntimeProvider>
    </LocaleProvider>
  )
}

async function send() {
  fireEvent.click(screen.getByRole('button', { name: 'Send Hello' }))
  await waitFor(() =>
    expect(screen.getByTestId('assistant-probe')).toBeInTheDocument()
  )
}

describe('useAIMessage', () => {
  test('reads the id, role, status and createdAt of the current message', async () => {
    const run = controlledTransport()

    renderThread(run.transport)
    await send()

    const user = screen.getByTestId('user-probe')
    const assistant = screen.getByTestId('assistant-probe')

    expect(user).toHaveTextContent('user/complete')
    expect(assistant).toHaveTextContent('assistant/running')
    expect(user.dataset.id).toEqual(expect.any(String))
    expect(assistant.dataset.id).toEqual(expect.any(String))
    expect(user.dataset.id).not.toBe(assistant.dataset.id)
    expect(new Date(user.dataset.createdAt as string).toISOString()).toBe(
      user.dataset.createdAt
    )

    run.finish([{ type: 'text', text: 'Done' }])
    await waitFor(() =>
      expect(screen.getByTestId('assistant-probe')).toHaveTextContent(
        'assistant/complete'
      )
    )
  })

  test('a failed run is incomplete', async () => {
    const run = controlledTransport()

    renderThread(run.transport)
    await send()

    run.fail()
    await waitFor(() =>
      expect(screen.getByTestId('assistant-probe')).toHaveTextContent(
        'assistant/incomplete'
      )
    )
  })

  test('streamed tokens do not re-render a consumer whose fields did not change', async () => {
    const run = controlledTransport()

    renderThread(run.transport)
    await send()
    run.push([{ type: 'text', text: 'A' }])
    await waitFor(() => expect(screen.getByText('A')).toBeInTheDocument())

    const before = renders.assistant

    run.push([{ type: 'text', text: 'AB' }])
    await waitFor(() => expect(screen.getByText('AB')).toBeInTheDocument())
    run.push([{ type: 'text', text: 'ABC' }])
    await waitFor(() => expect(screen.getByText('ABC')).toBeInTheDocument())

    expect(renders.assistant).toBe(before)

    run.finish([{ type: 'text', text: 'ABC' }])
    await waitFor(() =>
      expect(screen.getByTestId('assistant-probe')).toHaveTextContent(
        'assistant/complete'
      )
    )
  })

  test('outside a message it throws a clear invariant', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})

    function Outside() {
      useAIMessage()

      return null
    }

    expect(() =>
      render(
        <MockRuntimeProvider>
          <Outside />
        </MockRuntimeProvider>
      )
    ).toThrow(/useAIMessage must be used within a message/)
    error.mockRestore()
  })
})
