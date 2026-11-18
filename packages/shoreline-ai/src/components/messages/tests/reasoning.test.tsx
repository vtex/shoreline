import { createRef } from 'react'
import {
  describe,
  expect,
  fireEvent,
  it,
  render,
  screen,
  vi,
} from '@vtex/shoreline-test-utils'
import { LocaleProvider } from '@vtex/shoreline'

import { AIMessageReasoningContent } from '../ai-message-reasoning-content'
import { AIMessageReasoningGroup } from '../ai-message-reasoning-group'
import { AIMessageReasoningMeta } from '../ai-message-reasoning-meta'
import { AIMessageReasoningRoot } from '../ai-message-reasoning-root'
import { AIMessageReasoningTrigger } from '../ai-message-reasoning-trigger'
import { MessageMessagesProvider } from '../message-messages-context'
import type { AIMessageReasoningRootProps } from '../types'

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

function renderReasoning(
  rootProps: AIMessageReasoningRootProps = {},
  label?: string
) {
  const ui = (props: AIMessageReasoningRootProps) => (
    <MessageMessagesProvider>
      <AIMessageReasoningRoot data-testid="root" {...props}>
        <AIMessageReasoningTrigger label={label} />
        <AIMessageReasoningContent>body</AIMessageReasoningContent>
      </AIMessageReasoningRoot>
    </MessageMessagesProvider>
  )
  const result = render(ui(rootProps))

  return {
    ...result,
    rerenderRoot: (props: AIMessageReasoningRootProps) =>
      result.rerender(ui(props)),
  }
}

describe('AIMessageReasoningRoot and Trigger', () => {
  it('labels the trigger from status', () => {
    const { unmount } = renderReasoning({ status: 'running' })

    expect(screen.getByRole('button')).toHaveTextContent('Reasoning')
    unmount()

    const second = renderReasoning({ status: 'complete' })

    expect(screen.getByRole('button')).toHaveTextContent('Reasoned')
    second.unmount()

    renderReasoning()
    expect(screen.getByRole('button')).toHaveTextContent('Reasoned')
  })

  it('lets label override the status label', () => {
    renderReasoning({ status: 'running' }, 'Custom')

    expect(screen.getByRole('button')).toHaveTextContent('Custom')
  })

  it('toggles aria-expanded on click', () => {
    renderReasoning()
    const button = screen.getByRole('button')

    expect(button).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('supports controlled expansion', () => {
    const onExpandedChange = vi.fn()
    const { rerenderRoot } = renderReasoning({
      expanded: false,
      onExpandedChange,
    })
    const button = screen.getByRole('button')

    fireEvent.click(button)
    expect(onExpandedChange).toHaveBeenCalledWith(true)
    expect(button).toHaveAttribute('aria-expanded', 'false')

    rerenderRoot({ expanded: true, onExpandedChange })
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
  })

  it('calls onExpandedChange in uncontrolled mode', () => {
    const onExpandedChange = vi.fn()

    renderReasoning({ onExpandedChange })
    fireEvent.click(screen.getByRole('button'))

    expect(onExpandedChange).toHaveBeenCalledWith(true)
  })

  it('sets data-status on the root', () => {
    renderReasoning({ status: 'running' })

    expect(screen.getByTestId('root')).toHaveAttribute('data-status', 'running')
  })
})

describe('AIMessageReasoningMeta', () => {
  function renderMeta(status: 'running' | 'complete', duration?: number) {
    return render(
      <LocaleProvider locale="en-US">
        <MessageMessagesProvider>
          <AIMessageReasoningRoot status={status} duration={duration}>
            <AIMessageReasoningMeta />
          </AIMessageReasoningRoot>
        </MessageMessagesProvider>
      </LocaleProvider>
    )
  }

  const meta = () =>
    document.querySelector('[data-sl-ai-message-reasoning-meta]')

  it('shows the dots and no duration while running', () => {
    renderMeta('running', 180000)
    expect(meta()?.querySelector('[data-sl-ai-dots-loader]')).toBeTruthy()
    expect(screen.queryByText(/Worked for/)).toBeNull()
  })

  it('shows Worked for when complete with a duration', () => {
    renderMeta('complete', 180000)
    expect(meta()).toHaveTextContent('Worked for 3 min')
    expect(meta()?.querySelector('[data-sl-ai-dots-loader]')).toBeNull()
  })

  it('has no text when complete without a duration', () => {
    renderMeta('complete')
    expect(meta()?.textContent ?? '').toBe('')
  })

  it('has no text when the duration is NaN', () => {
    renderMeta('complete', Number.NaN)
    expect(meta()?.textContent ?? '').toBe('')
  })
})

describe('AIMessageReasoningGroup', () => {
  it('renders trigger, meta and content in one root', () => {
    render(
      <LocaleProvider locale="en-US">
        <MessageMessagesProvider>
          <AIMessageReasoningGroup status="complete" duration={5000}>
            body
          </AIMessageReasoningGroup>
        </MessageMessagesProvider>
      </LocaleProvider>
    )
    const root = document.querySelector('[data-sl-ai-message-reasoning]')

    expect(root).toHaveAttribute('data-status', 'complete')
    expect(screen.getByRole('button')).toHaveTextContent('Reasoned')
    expect(root).toHaveTextContent('Worked for 5 sec')
    expect(
      root?.querySelector('[data-sl-ai-message-reasoning-content]')
    ).toBeTruthy()
  })
})
