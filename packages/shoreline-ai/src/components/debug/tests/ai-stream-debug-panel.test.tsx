import {
  describe,
  expect,
  it,
  vi,
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
import {
  AIStreamDebugPanel,
  AIStreamDebugRunView,
  useAIStreamDebug,
  type AIStreamDebugRun,
} from '../index'

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
      const last = run.steps[run.steps.length - 1]?.snapshot as
        | RuntimeSnapshot
        | undefined
      const first = last?.parts[0]
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

function stepJson(): HTMLElement | null {
  return document.querySelector('[data-sl-ai-stream-debug-json]')
}

async function waitForRunEnd() {
  await waitFor(() =>
    expect(screen.getByText(/^Status:/)).toHaveTextContent(/ready|error/)
  )
}

describe('AIStreamDebugPanel', () => {
  it('shows the parts of a step in stream order inside the raw JSON', async () => {
    const user = userEvent.setup()

    render(<Setup debugStream />)
    await user.click(screen.getByRole('button', { name: 'Send hi' }))
    await waitForRunEnd()

    const rows = screen.getAllByRole('button', { name: /^Step \d+/ })

    await user.click(rows[rows.length - 1])

    const json = stepJson()?.textContent ?? ''

    expect(json.indexOf('"type": "reasoning"')).toBeGreaterThan(-1)
    expect(json.indexOf('"type": "reasoning"')).toBeLessThan(
      json.indexOf('"type": "text"')
    )
  })

  it('shows the raw snapshot as indented JSON when a row is expanded', async () => {
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
    expect(stepJson()).toBeNull()

    await user.click(row)

    expect(row).toHaveAttribute('aria-expanded', 'true')

    const expected = JSON.stringify(
      { ...textOf('Hi'), debug: { event: 'chunk', seq: 1 } },
      null,
      2
    )

    expect(stepJson()?.textContent).toBe(expected)
    expect(expected).toContain('\n  "parts": [')
  })

  it('copies the same formatted JSON to the clipboard', async () => {
    const user = userEvent.setup()
    const writeText = vi.fn().mockResolvedValue(undefined)

    vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText } })

    const transport: StreamTransport = {
      async *run() {
        yield textOf('Hi')

        return { ...textOf('Hi'), status: 'ready' }
      },
    }

    render(<Setup debugStream transport={transport} />)
    await user.click(screen.getByRole('button', { name: 'Send hi' }))
    await waitForRunEnd()
    await user.click(screen.getByRole('button', { name: /^Step 1\b/ }))
    await user.click(screen.getByRole('button', { name: 'Copy JSON' }))

    expect(writeText).toHaveBeenCalledWith(stepJson()?.textContent)

    vi.unstubAllGlobals()
  })

  it('does not break when the clipboard is unavailable', async () => {
    const user = userEvent.setup()

    vi.stubGlobal('navigator', { ...navigator, clipboard: undefined })

    const transport: StreamTransport = {
      async *run() {
        yield textOf('Hi')

        return { ...textOf('Hi'), status: 'ready' }
      },
    }

    render(<Setup debugStream transport={transport} />)
    await user.click(screen.getByRole('button', { name: 'Send hi' }))
    await waitForRunEnd()
    await user.click(screen.getByRole('button', { name: /^Step 1\b/ }))
    await user.click(screen.getByRole('button', { name: 'Copy JSON' }))

    expect(stepJson()).not.toBeNull()

    vi.unstubAllGlobals()
  })

  it('shows a step whose snapshot cannot be serialized without breaking the panel', async () => {
    const user = userEvent.setup()
    const circular: Record<string, unknown> = { name: 'loop' }

    circular.self = circular

    const transport: StreamTransport = {
      async *run() {
        yield { ...textOf('Hi'), debug: circular }

        return { ...textOf('Hi'), status: 'ready' }
      },
    }

    render(<Setup debugStream transport={transport} />)
    await user.click(screen.getByRole('button', { name: 'Send hi' }))
    await waitForRunEnd()
    await user.click(screen.getByRole('button', { name: /^Step 1\b/ }))

    expect(stepJson()).not.toBeNull()
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

  describe('step header part types', () => {
    function runWith(snapshots: unknown[]): AIStreamDebugRun {
      return {
        runId: 'run-1',
        threadId: 'thread-1',
        userMessageId: 'user-1',
        startedAt: '2026-01-01T00:00:00.000Z',
        status: 'streaming',
        steps: snapshots.map((snapshot, i) => ({
          index: i + 1,
          at: '2026-01-01T00:00:00.000Z',
          status: 'streaming' as const,
          snapshot,
        })),
      }
    }

    it('lists the types of the parts of each snapshot in order', () => {
      render(
        <AIStreamDebugRunView
          run={runWith([
            { parts: [{ type: 'reasoning', text: 'a', status: 'running' }] },
            {
              parts: [
                { type: 'reasoning', text: 'a', status: 'complete' },
                { type: 'text', text: 'b' },
              ],
            },
          ])}
        />
      )

      expect(
        screen.getByRole('button', { name: /^Step 1\b.*· reasoning$/ })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /^Step 2\b.*· reasoning, text$/ })
      ).toBeInTheDocument()
    })

    it('shows an unknown part type as it is', () => {
      render(
        <AIStreamDebugRunView
          run={runWith([{ parts: [{ type: 'canvas' }] }])}
        />
      )

      expect(
        screen.getByRole('button', { name: /^Step 1\b.*· canvas$/ })
      ).toBeInTheDocument()
    })

    it('shows no type when the snapshot has no parts list', () => {
      render(
        <AIStreamDebugRunView
          run={runWith([
            undefined,
            'raw',
            { parts: 'x' },
            { parts: [null, 3] },
          ])}
        />
      )

      for (const index of [1, 2, 3, 4]) {
        expect(
          screen.getByRole('button', {
            name: new RegExp(`^Step ${index}\\b.*· streaming$`),
          })
        ).toBeInTheDocument()
      }
    })
  })
})
