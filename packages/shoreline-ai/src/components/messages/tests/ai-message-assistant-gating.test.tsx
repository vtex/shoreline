import { describe, expect, it, render } from '@vtex/shoreline-test-utils'
import { LocaleProvider } from '@vtex/shoreline'
import { vi } from 'vitest'

import { AIMessageAssistant } from '../ai-message-assistant'
import { MessageMessagesProvider } from '../message-messages-context'

type FakeState = {
  message: {
    status?: { type: string }
    isLast: boolean
    content: unknown[]
  }
  thread: { isRunning: boolean }
}

const aui = vi.hoisted(() => ({ state: null as unknown }))

vi.mock('@assistant-ui/react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@assistant-ui/react')>()

  return {
    ...actual,
    useAuiState: ((selector: (state: unknown) => unknown) =>
      selector(aui.state)) as typeof actual.useAuiState,
  }
})

vi.mock('../ai-message-root', () => ({
  AIMessageRoot: (props: { children?: React.ReactNode }) => (
    <div data-testid="root">{props.children}</div>
  ),
}))

vi.mock('../ai-message-actions', () => ({
  AIMessageActions: () => <div data-sl-ai-message-actions />,
}))

const ACTIONS = '[data-sl-ai-message-actions]'
const INDICATOR = '[data-sl-ai-thinking-indicator]'
const text = [{ type: 'text', text: 'Hello' }]

function renderAssistant(state: FakeState, children?: React.ReactNode) {
  aui.state = state

  return render(
    <LocaleProvider locale="en-US">
      <MessageMessagesProvider>
        <AIMessageAssistant>{children ?? <span>body</span>}</AIMessageAssistant>
      </MessageMessagesProvider>
    </LocaleProvider>
  )
}

describe('AIMessageAssistant actions gating', () => {
  it('without a status, shows actions when the message is not the running last one', () => {
    renderAssistant({
      message: { isLast: false, content: text },
      thread: { isRunning: true },
    })
    expect(document.querySelector(ACTIONS)).not.toBeNull()
  })

  it('without a status, shows actions for the last message when the thread is idle', () => {
    renderAssistant({
      message: { isLast: true, content: text },
      thread: { isRunning: false },
    })
    expect(document.querySelector(ACTIONS)).not.toBeNull()
  })

  it('without a status, hides actions for the last message while the thread runs', () => {
    renderAssistant({
      message: { isLast: true, content: text },
      thread: { isRunning: true },
    })
    expect(document.querySelector(ACTIONS)).toBeNull()
  })

  it.each(['incomplete', 'requires-action', 'running'])(
    'hides actions for a %s message',
    (type) => {
      renderAssistant({
        message: { status: { type }, isLast: false, content: text },
        thread: { isRunning: false },
      })
      expect(document.querySelector(ACTIONS)).toBeNull()
    }
  )

  it('shows actions for a complete message with text', () => {
    renderAssistant({
      message: { status: { type: 'complete' }, isLast: false, content: text },
      thread: { isRunning: false },
    })
    expect(document.querySelector(ACTIONS)).not.toBeNull()
  })

  it('keeps the indicator after custom children while running with no parts (FR-08)', () => {
    renderAssistant(
      {
        message: { status: { type: 'running' }, isLast: true, content: [] },
        thread: { isRunning: true },
      },
      <span data-testid="custom">custom</span>
    )

    const content = document.querySelector(
      '[data-testid="root"]'
    ) as HTMLElement
    const indicator = content.querySelector(INDICATOR)

    expect(indicator).not.toBeNull()
    expect(content.firstElementChild).toBe(
      content.querySelector('[data-testid="custom"]')
    )
    expect(content.lastElementChild).toBe(indicator)
  })

  it('shows no indicator while running when the only part is a tool call', () => {
    renderAssistant({
      message: {
        status: { type: 'running' },
        isLast: true,
        content: [{ type: 'tool-call', toolName: 'search' }],
      },
      thread: { isRunning: true },
    })
    expect(document.querySelector(INDICATOR)).toBeNull()
  })
})
