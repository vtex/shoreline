import {
  describe,
  expect,
  it,
  render,
  screen,
  userEvent,
  waitFor,
} from '@vtex/shoreline-test-utils'
import type { ReactNode } from 'react'

import { useAIStatus } from '../../../hooks/use-ai-status'
import { useAIThread } from '../../../hooks/use-ai-thread'
import type { RuntimeSnapshot, StreamTransport } from '../../../runtime/types'
import {
  MockRuntimeProvider,
  createMockStreamTransport,
} from '../../../test-utils'
import type { AIMessagePart } from '../../../types/public'
import { AIStreamDebugPanel, useAIStreamDebug } from '../index'

const MOCK_TRANSPORT = createMockStreamTransport({ delayMs: 0 })

function SendButton(props: { text: string }) {
  const { sendMessage } = useAIThread()

  return (
    <button type="button" onClick={() => sendMessage({ text: props.text })}>
      Send {props.text}
    </button>
  )
}

function StatusProbe() {
  const { status } = useAIStatus()

  return <p>run {status}</p>
}

function RunsProbe() {
  const { enabled, runs } = useAIStreamDebug()
  const summary = runs
    .map((run) => {
      const first = run.finalParts[0]
      const label = first && 'text' in first ? first.text : ''

      return `${label}:${run.status}:${run.steps.map((s) => s.index).join(',')}`
    })
    .join(' | ')

  return (
    <p data-testid="probe">
      {enabled ? 'on' : 'off'} [{summary}]
    </p>
  )
}

function Setup(props: {
  transport?: StreamTransport
  debugStream?: boolean
  debugMaxRuns?: number
  debugMaxSteps?: number
  children?: ReactNode
}) {
  const { transport = MOCK_TRANSPORT, children, ...debug } = props

  return (
    <MockRuntimeProvider transport={transport} {...debug}>
      <SendButton text="hi" />
      <AIStreamDebugPanel />
      {children}
    </MockRuntimeProvider>
  )
}

function textOf(text: string): RuntimeSnapshot {
  return { parts: [{ type: 'text', text }], status: 'streaming' }
}

function userText(parts: AIMessagePart[]): string {
  const first = parts[0]

  return first?.type === 'text' ? first.text : ''
}

async function waitForRunEnd() {
  await waitFor(() =>
    expect(screen.getByText(/^Status:/)).toHaveTextContent(/ready|error/)
  )
}

describe('AIStreamDebugPanel', () => {
  it('lists the reasoning part before the text part', async () => {
    const user = userEvent.setup()

    render(<Setup debugStream />)
    await user.click(screen.getByRole('button', { name: 'Send hi' }))
    await waitForRunEnd()

    const finalParts = screen.getByRole('list', { name: 'Final parts' })

    expect(finalParts.children).toHaveLength(2)
    expect(finalParts).toHaveTextContent(/^reasoning.*text/)
    expect(
      screen.getByRole('button', { name: /^Step 1\b/ })
    ).toHaveAccessibleName(/reasoning added/)
  })

  it('shows one step per transport yield, including a duplicate snapshot', async () => {
    const user = userEvent.setup()
    const transport: StreamTransport = {
      async *run() {
        yield textOf('Hello')
        yield textOf('Hello')

        return { ...textOf('Hello'), status: 'ready' }
      },
    }

    render(<Setup debugStream transport={transport} />)
    await user.click(screen.getByRole('button', { name: 'Send hi' }))
    await waitForRunEnd()

    const rows = screen.getAllByRole('button', { name: /^Step \d+/ })

    expect(rows).toHaveLength(3)
    expect(rows[0]).toHaveAccessibleName(/text added/)
    expect(rows[1]).toHaveAccessibleName(/no changes/)
    expect(rows[2]).toHaveAccessibleName(/no changes/)
  })

  it('shows the opaque debug payload as JSON when a row is expanded', async () => {
    const user = userEvent.setup()
    const transport: StreamTransport = {
      async *run() {
        yield { ...textOf('Hi'), debug: { event: 'chunk', seq: 1 } }

        return { ...textOf('Hi'), status: 'ready' }
      },
    }

    render(<Setup debugStream transport={transport} />)
    await user.click(screen.getByRole('button', { name: 'Send hi' }))
    await waitForRunEnd()

    const row = screen.getByRole('button', { name: /^Step 1\b/ })

    expect(row).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText(/"event": "chunk"/)).not.toBeInTheDocument()

    await user.click(row)

    expect(row).toHaveAttribute('aria-expanded', 'true')

    const details = document.getElementById(
      row.getAttribute('aria-controls') ?? ''
    )

    expect(details).toHaveTextContent('"event": "chunk"')
    expect(details).toHaveTextContent('"seq": 1')
  })

  it('shows the error of a failed run', async () => {
    const user = userEvent.setup()
    const transport: StreamTransport = {
      // biome-ignore lint/correctness/useYield: the transport fails before any snapshot
      async *run() {
        throw new Error('boom')
      },
    }

    render(<Setup debugStream transport={transport} />)
    await user.click(screen.getByRole('button', { name: 'Send hi' }))
    await waitForRunEnd()

    expect(screen.getByText(/^Status:/)).toHaveTextContent('error')
    expect(screen.getByText(/^Error:/)).toHaveTextContent('boom')
  })

  it('records nothing when debugStream is off', async () => {
    const user = userEvent.setup()

    render(
      <Setup>
        <StatusProbe />
        <RunsProbe />
      </Setup>
    )
    await user.click(screen.getByRole('button', { name: 'Send hi' }))
    await screen.findByText('run ready')

    expect(screen.getByTestId('probe')).toHaveTextContent('off []')
    expect(screen.getByText(/debug is off/i)).toBeInTheDocument()
    expect(
      screen.queryByRole('list', { name: 'Steps' })
    ).not.toBeInTheDocument()
  })

  it('two providers record independently', async () => {
    const user = userEvent.setup()

    render(
      <>
        <section aria-label="first">
          <Setup debugStream />
        </section>
        <section aria-label="second">
          <Setup debugStream />
        </section>
      </>
    )

    const first = screen.getByRole('region', { name: 'first' })
    const second = screen.getByRole('region', { name: 'second' })

    await user.click(screen.getAllByRole('button', { name: 'Send hi' })[0])
    await waitForRunEnd()

    expect(first).toContainElement(screen.getByRole('list', { name: 'Steps' }))
    expect(second).toContainElement(screen.getByText(/no runs yet/i))
  })

  it('does not share runs with a nested provider that has debug off', async () => {
    const user = userEvent.setup()

    render(
      <Setup debugStream>
        <section aria-label="nested">
          <MockRuntimeProvider transport={MOCK_TRANSPORT}>
            <RunsProbe />
          </MockRuntimeProvider>
        </section>
      </Setup>
    )

    await user.click(screen.getByRole('button', { name: 'Send hi' }))
    await waitForRunEnd()

    expect(screen.getByTestId('probe')).toHaveTextContent('off []')
  })

  it('drops the oldest runs and steps beyond the limits', async () => {
    const user = userEvent.setup()
    const transport: StreamTransport = {
      async *run(input) {
        const text = userText(input.trigger.message.parts)

        for (let i = 1; i <= 5; i++) yield textOf(`${text}${i}`)

        return { ...textOf(`${text}6`), status: 'ready' }
      },
    }

    function SendMany() {
      return (
        <>
          <SendButton text="a" />
          <SendButton text="b" />
          <SendButton text="c" />
        </>
      )
    }

    render(
      <Setup
        debugStream
        debugMaxRuns={2}
        debugMaxSteps={3}
        transport={transport}
      >
        <SendMany />
        <RunsProbe />
      </Setup>
    )

    const probe = screen.getByTestId('probe')

    for (const text of ['a', 'b', 'c']) {
      await user.click(screen.getByRole('button', { name: `Send ${text}` }))
      await waitFor(() =>
        expect(probe).toHaveTextContent(`[${text}6:ready:4,5,6`)
      )
    }

    expect(probe).toHaveTextContent('on [c6:ready:4,5,6 | b6:ready:4,5,6]')
  })
})
