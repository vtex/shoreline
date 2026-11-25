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

import { AIMessageReasoningContent } from '../ai-message-reasoning-content'
import { AIMessageReasoningElapsed } from '../ai-message-reasoning-elapsed'
import { AIMessageReasoningGroup } from '../ai-message-reasoning-group'
import { AIMessageReasoningHeader } from '../ai-message-reasoning-header'
import { AIMessageReasoningLabel } from '../ai-message-reasoning-label'
import { AIMessageReasoningMark } from '../ai-message-reasoning-mark'
import { AIMessageReasoningRoot } from '../ai-message-reasoning-root'
import { MessageMessagesProvider } from '../message-messages-context'
import { WorkingMarkProvider } from '../working-mark-context'
import type { AIMessageReasoningRootProps } from '../types'

function wrap(ui: ReactElement) {
  return (
    <LocaleProvider locale="en-US">
      <MessageMessagesProvider>{ui}</MessageMessagesProvider>
    </LocaleProvider>
  )
}

function renderPanel(ui: ReactElement) {
  return render(wrap(ui))
}

const Panel = (p: Partial<AIMessageReasoningRootProps>) => (
  <AIMessageReasoningRoot data-testid="root" {...p}>
    <AIMessageReasoningHeader />
    <AIMessageReasoningContent>
      <p>body</p>
    </AIMessageReasoningContent>
  </AIMessageReasoningRoot>
)

afterEach(() => {
  vi.useRealTimers()
})

describe('AIMessageReasoningContent', () => {
  it('forwards its ref to the element carrying the content attribute', () => {
    const ref = createRef<HTMLDivElement>()

    render(
      <AIMessageReasoningRoot>
        <AIMessageReasoningContent ref={ref}>body</AIMessageReasoningContent>
      </AIMessageReasoningRoot>
    )

    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toHaveAttribute('data-sl-ai-message-reasoning-content')
  })
})

describe('AIMessageReasoning header parts', () => {
  test('running: mark, shimmering label, elapsed and a chevron button', () => {
    vi.useFakeTimers()
    const { container } = renderPanel(<Panel status="running" />)

    expect(
      container.querySelector('[data-sl-ai-message-reasoning-mark]')
    ).toBeTruthy()
    expect(screen.getByText('Reasoning…')).toHaveAttribute(
      'data-sl-ai-thinking-indicator'
    )
    act(() => vi.advanceTimersByTime(3000))
    expect(
      container.querySelector('[data-sl-ai-message-reasoning-elapsed]')
    ).toHaveTextContent('3s')
    expect(screen.getByRole('button', { name: 'Reasoning…' })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
  })

  test('only the chevron toggles: clicking the label does nothing', async () => {
    const user = userEvent.setup()

    renderPanel(<Panel status="complete" />)
    await user.click(screen.getByText('Reasoning complete'))
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')
    await user.click(screen.getByRole('button'))
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
  })

  test('complete with duration: label carries it; no mark, no elapsed', () => {
    const { container } = renderPanel(
      <Panel status="complete" duration={125_000} />
    )

    expect(screen.getByText('Reasoning completed in 2m')).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-ai-message-reasoning-mark]')
    ).toBeNull()
    expect(
      container.querySelector('[data-sl-ai-message-reasoning-elapsed]')
    ).toBeNull()
  })

  test('complete from history with no duration: plain label (Review Focus 3)', () => {
    renderPanel(<Panel status="complete" />)
    expect(screen.getByText('Reasoning complete')).toBeInTheDocument()
  })

  test('running → complete without a duration prop uses the counted time', () => {
    vi.useFakeTimers()
    const { rerender } = renderPanel(<Panel status="running" />)

    act(() => vi.advanceTimersByTime(40_000))
    rerender(wrap(<Panel status="complete" />))
    expect(screen.getByText('Reasoning completed in 40s')).toBeInTheDocument()
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
      <AIMessageReasoningRoot status="running" startedAt={40_000}>
        <AIMessageReasoningHeader>
          <AIMessageReasoningMark>
            <i data-testid="m" />
          </AIMessageReasoningMark>
          <AIMessageReasoningLabel>Analyzing…</AIMessageReasoningLabel>
          <AIMessageReasoningElapsed />
        </AIMessageReasoningHeader>
      </AIMessageReasoningRoot>
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
    const content = document.querySelector(
      '[data-sl-ai-message-reasoning-content]'
    )
    const label = document.querySelector('[data-sl-ai-message-reasoning-label]')

    expect(button).toHaveAttribute('aria-controls', content?.id)
    expect(button).toHaveAttribute('aria-labelledby', label?.id)
    expect(content?.id).toBeTruthy()
    expect(label?.id).toBeTruthy()
  })
})

describe('AIMessageReasoningRoot expansion', () => {
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

describe('AIMessageReasoningGroup', () => {
  it('renders the header and the content in one root', () => {
    renderPanel(
      <AIMessageReasoningGroup status="complete" duration={5000}>
        body
      </AIMessageReasoningGroup>
    )
    const root = document.querySelector('[data-sl-ai-message-reasoning]')

    expect(root).toHaveAttribute('data-status', 'complete')
    expect(
      root?.querySelector('[data-sl-ai-message-reasoning-header]')
    ).toBeTruthy()
    expect(
      screen.getByRole('button', { name: 'Reasoning completed in 5s' })
    ).toBeInTheDocument()
    expect(
      root?.querySelector('[data-sl-ai-message-reasoning-content]')
    ).toBeTruthy()
  })
})
