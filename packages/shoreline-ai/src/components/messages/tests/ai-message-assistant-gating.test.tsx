import { describe, expect, it, render } from '@vtex/shoreline-test-utils'
import { LocaleProvider } from '@vtex/shoreline'
import { vi } from 'vitest'

import { AIMessageAssistant } from '../ai-message-assistant'
import { AIMessagesI18nProvider } from '../message-messages-context'

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

vi.mock('../ai-message-parts', () => ({
  AIMessageParts: () => <div data-sl-ai-message-parts />,
}))

const ACTIONS = '[data-sl-ai-message-actions]'
const PARTS = '[data-sl-ai-message-parts]'
const INDICATOR = '[data-sl-ai-thinking-indicator]'
const text = [{ type: 'text', text: 'Hello' }]

function renderAssistant(state: FakeState, children?: React.ReactNode) {
  aui.state = state

  return render(
    <LocaleProvider locale="en-US">
      <AIMessagesI18nProvider>
        <AIMessageAssistant>{children}</AIMessageAssistant>
      </AIMessagesI18nProvider>
    </LocaleProvider>
  )
}

const completeText: FakeState = {
  message: { status: { type: 'complete' }, isLast: false, content: text },
  thread: { isRunning: false },
}

function getRoot() {
  return document.querySelector('[data-testid="root"]') as HTMLElement
}

describe('AIMessageAssistant composition', () => {
  it('with explicit children it renders exactly the children: no actions row is appended', () => {
    renderAssistant(completeText, <span data-testid="custom">custom</span>)

    const root = getRoot()

    expect(root.querySelector(ACTIONS)).toBeNull()
    expect(root.querySelector(PARTS)).toBeNull()
    expect(root.childElementCount).toBe(1)
    expect(root.firstElementChild).toBe(
      root.querySelector('[data-testid="custom"]')
    )
  })

  it('with no children it renders parts and the actions bar', () => {
    renderAssistant(completeText)

    const root = getRoot()

    expect(root.childElementCount).toBe(2)
    expect(root.children[0]).toHaveAttribute('data-sl-ai-message-parts')
    expect(root.children[1]).toHaveAttribute('data-sl-ai-message-actions')
  })

  it('renders only its children while running with no parts: the pending header lives in AIMessageParts', () => {
    renderAssistant(
      {
        message: { status: { type: 'running' }, isLast: true, content: [] },
        thread: { isRunning: true },
      },
      <span data-testid="custom">custom</span>
    )

    const content = getRoot()

    expect(content.querySelector(INDICATOR)).toBeNull()
    expect(content.childElementCount).toBe(1)
    expect(content.firstElementChild).toBe(
      content.querySelector('[data-testid="custom"]')
    )
  })
})
