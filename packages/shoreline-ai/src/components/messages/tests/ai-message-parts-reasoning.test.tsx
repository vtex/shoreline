import type { ReactNode } from 'react'
import {
  act,
  afterEach,
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
import { getGroupDuration, getGroupStatus } from '../ai-message-parts'
import { AIMessageAssistant, AIMessageParts, AIMessages } from '../index'
import {
  AIReasoning,
  AIReasoningContent,
  AIReasoningHeader,
  AIReasoningLabel,
  AIReasoningMark,
  useAIReasoning,
} from '../../reasoning'

type Step = { snapshot: RuntimeSnapshot; done: boolean }

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

        if (step.done) return step.snapshot
        yield step.snapshot
      }
    },
  }

  return {
    transport,
    push: (parts: RuntimeSnapshot['parts']) =>
      act(() =>
        send({ snapshot: { parts, status: 'streaming' }, done: false })
      ),
    finish: (parts: RuntimeSnapshot['parts']) =>
      act(() => send({ snapshot: { parts, status: 'ready' }, done: true })),
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

function renderThread(
  transport: StreamTransport,
  children?: ReactNode,
  props: { workingMark?: ReactNode; locale?: string } = {}
) {
  return render(
    <LocaleProvider locale={props.locale ?? 'en-US'}>
      <MockRuntimeProvider transport={transport}>
        <SendButton />
        <AIMessages workingMark={props.workingMark}>{children}</AIMessages>
      </MockRuntimeProvider>
    </LocaleProvider>
  )
}

async function send() {
  fireEvent.click(screen.getByRole('button', { name: 'Send Hello' }))
  await waitFor(() => expect(screen.getByText('Hello')).toBeInTheDocument())
}

const reasoningPart = (text: string, status: 'streaming' | 'complete') =>
  ({ type: 'reasoning', text, status }) as const

afterEach(() => {
  vi.useRealTimers()
})

describe('AIMessageParts pending header', () => {
  test('pending: running message with no parts shows the running header with a status label and no chevron', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const run = controlledTransport()

    renderThread(run.transport)
    await send()

    const status = await screen.findByRole('status')
    const header = status.closest('[data-sl-ai-reasoning-header]')
    const elapsed = () =>
      document.querySelector('[data-sl-ai-reasoning-elapsed]')

    // Only the label is the live region: the ticking elapsed stays outside.
    expect(status).toHaveAttribute('data-sl-ai-reasoning-label')
    expect(status.textContent).toBe('Reasoning…')
    expect(header).not.toHaveAttribute('role')
    expect(status.contains(elapsed())).toBe(false)

    act(() => vi.advanceTimersByTime(3000))
    expect(status.textContent).toBe('Reasoning…')
    expect(elapsed()).toHaveTextContent('3s')

    expect(status.closest('[data-sl-ai-reasoning]')).toHaveAttribute(
      'data-status',
      'running'
    )
    expect(header?.querySelector('[data-sl-ai-reasoning-mark]')).toBeTruthy()
    // Only the send button is left: the pending header has no chevron.
    expect(document.querySelector('[data-sl-ai-reasoning-trigger]')).toBeNull()

    run.finish([{ type: 'text', text: 'Done' }])
    await waitFor(() => expect(screen.getByText('Done')).toBeInTheDocument())
  })

  test('pending: shows the localized label in pt-BR', async () => {
    const run = controlledTransport()

    renderThread(run.transport, undefined, { locale: 'pt-BR' })
    await send()

    expect(await screen.findByRole('status')).toHaveTextContent('Raciocinando…')

    run.finish([{ type: 'text', text: 'Pronto' }])
    await waitFor(() => expect(screen.getByText('Pronto')).toBeInTheDocument())
  })

  test('pending → reasoning part: elapsed keeps counting, it does not restart', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const run = controlledTransport()

    renderThread(run.transport)
    await send()
    await screen.findByRole('status')

    act(() => vi.advanceTimersByTime(5000))
    expect(
      document.querySelector('[data-sl-ai-reasoning-elapsed]')
    ).toHaveTextContent('5s')

    run.push([reasoningPart('Hmm', 'streaming')])
    await waitFor(() =>
      expect(
        document.querySelector('[data-sl-ai-reasoning-trigger]')
      ).toBeTruthy()
    )
    expect(screen.queryByRole('status')).toBeNull()
    expect(
      document.querySelector('[data-sl-ai-reasoning-elapsed]')
    ).toHaveTextContent('5s')

    act(() => vi.advanceTimersByTime(1000))
    expect(
      document.querySelector('[data-sl-ai-reasoning-elapsed]')
    ).toHaveTextContent('6s')
    // The group that took over from the pending header skips the mark's
    // enter animation.
    expect(document.querySelector('[data-sl-ai-reasoning]')).toHaveAttribute(
      'data-continued'
    )

    run.finish([reasoningPart('Hmm', 'complete'), { type: 'text', text: 'Ok' }])
    await waitFor(() => expect(screen.getByText('Ok')).toBeInTheDocument())
  })

  test('pending → a reasoning group that arrives already complete: the label keeps the counted time', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const run = controlledTransport()

    renderThread(run.transport)
    await send()
    await screen.findByRole('status')

    act(() => vi.advanceTimersByTime(8000))
    // One snapshot carries the whole answer: the group is complete at once.
    run.finish([reasoningPart('Hmm', 'complete'), { type: 'text', text: 'Ok' }])
    await waitFor(() => expect(screen.getByText('Ok')).toBeInTheDocument())
    expect(screen.queryByRole('status')).toBeNull()
    expect(screen.getByText('Reasoning completed in 8s')).toBeInTheDocument()

    act(() => vi.advanceTimersByTime(5000))
    expect(screen.getByText('Reasoning completed in 8s')).toBeInTheDocument()
  })

  test('text arrives first: the pending header disappears and no reasoning header is left', async () => {
    const run = controlledTransport()

    renderThread(run.transport)
    await send()
    await screen.findByRole('status')

    run.push([{ type: 'text', text: 'Partial' }])
    await waitFor(() => expect(screen.getByText('Partial')).toBeInTheDocument())
    expect(screen.queryByRole('status')).toBeNull()
    expect(screen.queryByText('Reasoning…')).toBeNull()
    expect(document.querySelector('[data-sl-ai-reasoning-header]')).toBeNull()

    run.finish([{ type: 'text', text: 'Done' }])
    await waitFor(() => expect(screen.getByText('Done')).toBeInTheDocument())
    expect(screen.queryByText('Reasoning complete')).toBeNull()
  })

  test('an unregistered tool call arrives first: the pending header gives way to a running reasoning group with its chevron', async () => {
    const run = controlledTransport()

    renderThread(run.transport)
    await send()
    await screen.findByRole('status')

    run.push([
      { type: 'tool', name: 'search_orders', args: {}, status: 'running' },
    ])
    await waitFor(() => expect(screen.queryByRole('status')).toBeNull())

    const roots = document.querySelectorAll('[data-sl-ai-reasoning]')

    expect(roots).toHaveLength(1)
    expect(roots[0]).toHaveAttribute('data-status', 'running')
    expect(
      roots[0].querySelector('[data-sl-ai-reasoning-header]')
    ).not.toHaveAttribute('role')
    expect(screen.getByRole('button', { name: 'Reasoning…' })).toHaveAttribute(
      'data-sl-ai-reasoning-trigger'
    )

    run.finish([{ type: 'text', text: 'Done' }])
    await waitFor(() => expect(screen.getByText('Done')).toBeInTheDocument())
    expect(screen.queryByText('Reasoning complete')).toBeNull()
  })

  test('text first, then reasoning: the group elapsed starts from the group, not the message', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const run = controlledTransport()

    renderThread(run.transport)
    await send()
    await screen.findByRole('status')

    run.push([{ type: 'text', text: 'Partial' }])
    await waitFor(() => expect(screen.queryByRole('status')).toBeNull())

    act(() => vi.advanceTimersByTime(5000))
    run.push([
      { type: 'text', text: 'Partial' },
      reasoningPart('Hmm', 'streaming'),
    ])
    await waitFor(() =>
      expect(
        document.querySelector('[data-sl-ai-reasoning-elapsed]')
      ).toBeTruthy()
    )
    expect(
      document.querySelector('[data-sl-ai-reasoning-elapsed]')
    ).toHaveTextContent('1s')
    expect(
      document.querySelector('[data-sl-ai-reasoning]')
    ).not.toHaveAttribute('data-continued')

    run.finish([{ type: 'text', text: 'Done' }])
    await waitFor(() => expect(screen.getByText('Done')).toBeInTheDocument())
  })

  test('pending with a defaultExpanded template: no empty content is mounted', async () => {
    const run = controlledTransport()

    renderThread(
      run.transport,
      <AIMessageAssistant>
        <AIMessageParts reasoning={<AIReasoning defaultExpanded />} />
      </AIMessageAssistant>
    )
    await send()
    await screen.findByRole('status')

    expect(document.querySelector('[data-sl-ai-reasoning-content]')).toBeNull()

    run.push([reasoningPart('Hmm', 'streaming')])
    await waitFor(() => expect(screen.getByText('Hmm')).toBeInTheDocument())
    expect(
      document.querySelector('[data-sl-ai-reasoning-content]')
    ).toBeTruthy()

    run.finish([{ type: 'text', text: 'Done' }])
    await waitFor(() => expect(screen.getByText('Done')).toBeInTheDocument())
  })
})

describe('AIMessageParts reasoning template', () => {
  test('custom template: reasoning={<AIReasoning defaultExpanded>…custom label…</AIReasoning>} renders once per group with the group parts inside', async () => {
    const run = controlledTransport()

    renderThread(
      run.transport,
      <AIMessageAssistant>
        <AIMessageParts
          reasoning={
            <AIReasoning defaultExpanded data-testid="custom">
              <AIReasoningHeader>
                <AIReasoningLabel>Thinking hard</AIReasoningLabel>
              </AIReasoningHeader>
              <AIReasoningContent />
            </AIReasoning>
          }
        />
      </AIMessageAssistant>
    )
    await send()

    run.finish([
      reasoningPart('First thought', 'complete'),
      { type: 'text', text: 'Middle' },
      reasoningPart('Second thought', 'complete'),
    ])
    await waitFor(() => expect(screen.getByText('Middle')).toBeInTheDocument())

    const groups = screen.getAllByTestId('custom')

    expect(groups).toHaveLength(2)
    expect(screen.getAllByText('Thinking hard')).toHaveLength(2)
    expect(groups[0]).toHaveTextContent('First thought')
    expect(groups[0]).not.toHaveTextContent('Second thought')
    expect(groups[1]).toHaveTextContent('Second thought')
    for (const group of groups) {
      expect(
        group.querySelector('[data-sl-ai-reasoning-content]')
      ).not.toHaveAttribute('hidden')
    }
  })

  test('useAIReasoning exposes status to app parts inside the template', async () => {
    function StatusProbe() {
      const { status, expanded, duration } = useAIReasoning()

      return (
        <span data-testid="probe">
          {status}/{String(expanded)}/{String(duration)}
        </span>
      )
    }

    const run = controlledTransport()

    renderThread(
      run.transport,
      <AIMessageAssistant>
        <AIMessageParts
          reasoning={
            <AIReasoning>
              <StatusProbe />
            </AIReasoning>
          }
        />
      </AIMessageAssistant>
    )
    await send()

    expect(await screen.findByTestId('probe')).toHaveTextContent(
      'running/false/undefined'
    )

    run.push([reasoningPart('Hmm', 'streaming')])
    run.finish([reasoningPart('Hmm', 'complete'), { type: 'text', text: 'Ok' }])
    await waitFor(() => expect(screen.getByText('Ok')).toBeInTheDocument())
    expect(screen.getByTestId('probe')).toHaveTextContent(/^complete\/false\//)
  })

  test('AIReasoning outside AIMessageParts throws a clear invariant', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<AIReasoning />)).toThrow(
      /AIReasoning must be used within AIMessageParts/
    )
    error.mockRestore()
  })
})

describe('workingMark', () => {
  test('workingMark on AIMessages reaches the pending header and every running group', async () => {
    const run = controlledTransport()

    renderThread(run.transport, undefined, {
      workingMark: <i data-testid="glyph" />,
    })
    await send()

    const status = await screen.findByRole('status')

    expect(
      status
        .closest('[data-sl-ai-reasoning-header]')
        ?.querySelector('[data-testid="glyph"]')
    ).toBeTruthy()

    // Only the last group of a message runs, so the groups run one by one.
    const runningRoot = () =>
      document.querySelector('[data-sl-ai-reasoning][data-status="running"]')

    run.push([reasoningPart('First', 'streaming')])
    await waitFor(() => expect(screen.queryByRole('status')).toBeNull())
    expect(runningRoot()).toHaveTextContent('First')
    expect(runningRoot()?.querySelector('[data-testid="glyph"]')).toBeTruthy()

    run.push([
      reasoningPart('First', 'complete'),
      { type: 'text', text: 'Middle' },
      reasoningPart('Second', 'streaming'),
    ])
    await waitFor(() => expect(screen.getByText('Middle')).toBeInTheDocument())
    expect(document.querySelectorAll('[data-sl-ai-reasoning]')).toHaveLength(2)
    expect(runningRoot()).toHaveTextContent('Second')
    expect(runningRoot()?.querySelector('[data-testid="glyph"]')).toBeTruthy()

    run.finish([{ type: 'text', text: 'Done' }])
    await waitFor(() => expect(screen.getByText('Done')).toBeInTheDocument())
  })

  test('mark children in the template win over workingMark', async () => {
    const run = controlledTransport()

    renderThread(
      run.transport,
      <AIMessageAssistant>
        <AIMessageParts
          reasoning={
            <AIReasoning>
              <AIReasoningHeader>
                <AIReasoningMark>
                  <i data-testid="own" />
                </AIReasoningMark>
              </AIReasoningHeader>
            </AIReasoning>
          }
        />
      </AIMessageAssistant>,
      { workingMark: <i data-testid="glyph" /> }
    )
    await send()

    expect(await screen.findByTestId('own')).toBeInTheDocument()
    expect(screen.queryByTestId('glyph')).toBeNull()

    run.finish([{ type: 'text', text: 'Done' }])
    await waitFor(() => expect(screen.getByText('Done')).toBeInTheDocument())
  })
})

describe('getGroupDuration', () => {
  test.each([
    [{}],
    [{ timing: Number.NaN }],
    [{ timing: Number.POSITIVE_INFINITY }],
    [{ timing: -1 }],
    [{ timing: '5' }],
  ])('is undefined for %o', (part) => {
    expect(getGroupDuration(part)).toBeUndefined()
  })

  test.each([0, 1234])('passes through %i', (timing) => {
    expect(getGroupDuration({ timing })).toBe(timing)
  })
})

describe('getGroupStatus', () => {
  test.each([
    [{ status: { type: 'running' } }, 'running'],
    [{ status: { type: 'complete' } }, 'complete'],
    [{}, 'complete'],
  ] as const)('maps %o to %s', (part, expected) => {
    expect(getGroupStatus(part)).toBe(expected)
  })
})
