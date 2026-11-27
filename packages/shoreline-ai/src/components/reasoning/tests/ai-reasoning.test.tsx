import { createRef, type ReactElement } from 'react'
import {
  act,
  afterEach,
  describe,
  expect,
  fireEvent,
  it,
  render,
  screen,
  test,
  userEvent,
  vi,
} from '@vtex/shoreline-test-utils'
import { LocaleProvider } from '@vtex/shoreline'

import { AIReasoningContent } from '../ai-reasoning-content'
import { AIReasoningElapsed } from '../ai-reasoning-elapsed'
import { AIReasoningHeader } from '../ai-reasoning-header'
import { AIReasoningLabel } from '../ai-reasoning-label'
import { AIReasoningMark } from '../ai-reasoning-mark'
import { AIReasoningRoot } from '../ai-reasoning-root'
import { AIReasoningTrigger } from '../ai-reasoning-trigger'
import { AIMessagesI18nProvider } from '../../messages/message-messages-context'
import { WorkingMarkProvider } from '../../messages/working-mark-context'
import type { AIReasoningRootProps } from '../types'

function wrap(ui: ReactElement) {
  return (
    <LocaleProvider locale="en-US">
      <AIMessagesI18nProvider>{ui}</AIMessagesI18nProvider>
    </LocaleProvider>
  )
}

function renderPanel(ui: ReactElement) {
  return render(wrap(ui))
}

const Panel = (p: Partial<AIReasoningRootProps>) => (
  <AIReasoningRoot data-testid="root" {...p}>
    <AIReasoningHeader />
    <AIReasoningContent>
      <p>body</p>
    </AIReasoningContent>
  </AIReasoningRoot>
)

afterEach(() => {
  vi.useRealTimers()
})

describe('AIReasoningContent', () => {
  it('forwards its ref to the element carrying the content attribute', () => {
    const ref = createRef<HTMLDivElement>()

    render(
      <AIReasoningRoot>
        <AIReasoningContent ref={ref}>body</AIReasoningContent>
      </AIReasoningRoot>
    )

    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toHaveAttribute('data-sl-ai-reasoning-content')
  })
})

describe('AIReasoning header parts', () => {
  test('running: mark, shimmering label, elapsed and a chevron button', () => {
    vi.useFakeTimers()
    const { container } = renderPanel(<Panel status="running" />)

    expect(container.querySelector('[data-sl-ai-reasoning-mark]')).toBeTruthy()
    expect(screen.getByText('Thinking…')).toHaveAttribute(
      'data-sl-ai-thinking-indicator'
    )
    act(() => vi.advanceTimersByTime(3000))
    expect(
      container.querySelector('[data-sl-ai-reasoning-elapsed]')
    ).toHaveTextContent('3s')
    expect(screen.getByRole('button', { name: 'Thinking…' })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
  })

  test('only the chevron toggles: clicking the label does nothing', async () => {
    const user = userEvent.setup()

    renderPanel(<Panel status="complete" />)
    await user.click(screen.getByText('Done thinking'))
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')
    await user.click(screen.getByRole('button'))
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
  })

  test('complete with duration: label carries it; no mark, no elapsed', () => {
    const { container } = renderPanel(
      <Panel status="complete" duration={125_000} />
    )

    expect(screen.getByText('Thought for 2m 5s')).toBeInTheDocument()
    expect(container.querySelector('[data-sl-ai-reasoning-mark]')).toBeNull()
    expect(container.querySelector('[data-sl-ai-reasoning-elapsed]')).toBeNull()
  })

  test('complete from history with no duration: plain label (Review Focus 3)', () => {
    const { container } = renderPanel(<Panel status="complete" />)

    expect(screen.getByText('Done thinking')).toBeInTheDocument()
    expect(container.querySelector('[data-sl-ai-reasoning-mark]')).toBeNull()
    expect(container.querySelector('[data-sl-ai-reasoning-elapsed]')).toBeNull()
  })

  test('labelled content is a group named by the label', () => {
    const { container } = renderPanel(<Panel status="complete" />)
    const content = container.querySelector('[data-sl-ai-reasoning-content]')
    const label = container.querySelector('[data-sl-ai-reasoning-label]')

    expect(content).toHaveAttribute('role', 'group')
    expect(content).toHaveAttribute('aria-labelledby', label?.id)
  })

  test('content without a label has no group role', () => {
    const { container } = renderPanel(
      <AIReasoningRoot status="complete">
        <AIReasoningTrigger />
        <AIReasoningContent>body</AIReasoningContent>
      </AIReasoningRoot>
    )
    const content = container.querySelector('[data-sl-ai-reasoning-content]')

    expect(content).not.toHaveAttribute('role')
    expect(content).not.toHaveAttribute('aria-labelledby')
  })

  test('running → complete without a duration prop uses the counted time', () => {
    vi.useFakeTimers()
    const { rerender } = renderPanel(<Panel status="running" />)

    act(() => vi.advanceTimersByTime(40_000))
    rerender(wrap(<Panel status="complete" />))
    expect(screen.getByText('Thought for 40s')).toBeInTheDocument()
  })

  test('unmount while running clears the timer (Review Focus 5)', () => {
    vi.useFakeTimers()
    const { unmount } = renderPanel(<Panel status="running" />)

    unmount()
    expect(vi.getTimerCount()).toBe(0)
  })

  test('label and mark accept children; startedAt sets the elapsed origin', () => {
    vi.useFakeTimers({ now: 100_000 })
    renderPanel(
      <AIReasoningRoot status="running" startedAt={40_000}>
        <AIReasoningHeader>
          <AIReasoningMark>
            <i data-testid="m" />
          </AIReasoningMark>
          <AIReasoningLabel>Analyzing…</AIReasoningLabel>
          <AIReasoningElapsed />
        </AIReasoningHeader>
      </AIReasoningRoot>
    )
    expect(screen.getByTestId('m')).toBeInTheDocument()
    expect(screen.getByText('Analyzing…')).toBeInTheDocument()
    expect(screen.getByText('1m')).toBeInTheDocument()
  })

  test('the mark uses the glyph from WorkingMarkProvider when it has no children', () => {
    renderPanel(
      <WorkingMarkProvider value={<i data-testid="provided" />}>
        <Panel status="running" />
      </WorkingMarkProvider>
    )
    expect(screen.getByTestId('provided')).toBeInTheDocument()
  })

  test('the chevron controls the content and is labelled by the label', () => {
    renderPanel(<Panel status="complete" />)
    const button = screen.getByRole('button')
    const content = document.querySelector('[data-sl-ai-reasoning-content]')
    const label = document.querySelector('[data-sl-ai-reasoning-label]')

    expect(button).toHaveAttribute('aria-controls', content?.id)
    expect(button).toHaveAttribute('aria-labelledby', label?.id)
    expect(content?.id).toBeTruthy()
    expect(label?.id).toBeTruthy()
  })
})

describe('AIReasoningRoot expansion', () => {
  it('toggles aria-expanded on click', () => {
    renderPanel(<Panel />)
    const button = screen.getByRole('button')

    expect(button).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('supports controlled expansion', () => {
    const onExpandedChange = vi.fn()
    const { rerender } = renderPanel(
      <Panel expanded={false} onExpandedChange={onExpandedChange} />
    )
    const button = screen.getByRole('button')

    fireEvent.click(button)
    expect(onExpandedChange).toHaveBeenCalledWith(true)
    expect(button).toHaveAttribute('aria-expanded', 'false')

    rerender(wrap(<Panel expanded onExpandedChange={onExpandedChange} />))
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
  })

  it('calls onExpandedChange in uncontrolled mode', () => {
    const onExpandedChange = vi.fn()

    renderPanel(<Panel onExpandedChange={onExpandedChange} />)
    fireEvent.click(screen.getByRole('button'))

    expect(onExpandedChange).toHaveBeenCalledWith(true)
  })

  it('sets data-status on the root', () => {
    renderPanel(<Panel status="running" />)

    expect(screen.getByTestId('root')).toHaveAttribute('data-status', 'running')
  })
})

describe('AIReasoning accessible name without a label', () => {
  const NoLabel = (p: Partial<AIReasoningRootProps>) => (
    <AIReasoningRoot {...p}>
      <AIReasoningHeader>
        <AIReasoningTrigger />
      </AIReasoningHeader>
      <AIReasoningContent>
        <p>body</p>
      </AIReasoningContent>
    </AIReasoningRoot>
  )

  test.each([
    [{ status: 'running' }, 'Thinking…'],
    [{ status: 'complete' }, 'Done thinking'],
    [{ status: 'complete', duration: 5000 }, 'Thought for 5s'],
  ] as const)(
    'the trigger is named by the status text when no label is mounted (%o)',
    (props, name) => {
      renderPanel(<NoLabel {...props} />)
      const button = screen.getByRole('button', { name })

      expect(button).not.toHaveAttribute('aria-labelledby')
      expect(button).toHaveAttribute('aria-label', name)
    }
  )

  test('the content is not labelled by a missing label', () => {
    renderPanel(<NoLabel status="complete" />)

    expect(
      document.querySelector('[data-sl-ai-reasoning-content]')
    ).not.toHaveAttribute('aria-labelledby')
  })

  test('with a label, the trigger and the content point at it', () => {
    renderPanel(<Panel status="complete" />)
    const label = document.querySelector('[data-sl-ai-reasoning-label]')

    expect(screen.getByRole('button')).not.toHaveAttribute('aria-label')
    expect(
      document.querySelector('[data-sl-ai-reasoning-content]')
    ).toHaveAttribute('aria-labelledby', label?.id)
  })
})
