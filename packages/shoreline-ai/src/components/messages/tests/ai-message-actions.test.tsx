import {
  afterEach,
  describe,
  expect,
  it,
  render,
  screen,
} from '@vtex/shoreline-test-utils'
import { LocaleProvider } from '@vtex/shoreline'
import type { ReactNode } from 'react'
import { vi } from 'vitest'

import { AIMessageAction } from '../ai-message-action'
import { AIMessageActions } from '../ai-message-actions'
import { AIMessageCopy } from '../ai-message-copy'
import { AIMessageDate } from '../ai-message-date'
import { AIMessagesI18nProvider } from '../message-messages-context'

type FakeMessage = {
  role?: 'user' | 'assistant'
  status?: { type: string }
  isLast?: boolean
  createdAt?: Date
  content: unknown[]
}

const aui = vi.hoisted(() => ({
  message: null as unknown,
  isRunning: false,
}))

vi.mock('@assistant-ui/react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@assistant-ui/react')>()

  return {
    ...actual,
    useAuiState: ((selector: (state: unknown) => unknown) =>
      selector({
        message: aui.message,
        thread: { isRunning: aui.isRunning },
      })) as typeof actual.useAuiState,
  }
})

const ACTIONS = '[data-sl-ai-message-actions]'
const text = [{ type: 'text', text: 'Hello' }]
const complete: FakeMessage = {
  role: 'assistant',
  status: { type: 'complete' },
  isLast: false,
  createdAt: new Date(),
  content: text,
}

function renderActions(
  message: FakeMessage,
  node: ReactNode = <AIMessageActions />,
  isRunning = false
) {
  aui.message = message
  aui.isRunning = isRunning

  return render(
    <LocaleProvider locale="en-US">
      <AIMessagesI18nProvider>{node}</AIMessagesI18nProvider>
    </LocaleProvider>
  )
}

afterEach(() => {
  aui.message = null
  aui.isRunning = false
})

describe('AIMessageActions', () => {
  it('default children are copy then date', () => {
    renderActions(complete)

    const row = document.querySelector(ACTIONS) as HTMLElement
    const children = Array.from(row.children).filter(
      (child) => !child.querySelector('[data-sl-ai-message-copy-status]')
    )

    expect(children).toHaveLength(2)
    expect(children[0]).toHaveAttribute('data-sl-ai-message-copy')
    expect(children[1]).toHaveAttribute('data-sl-ai-message-date')
    expect(children[1].tagName).toBe('TIME')
  })

  it('with children it renders only the children, in order', () => {
    renderActions(
      complete,
      <AIMessageActions>
        <AIMessageAction label="Good response">
          <span>up</span>
        </AIMessageAction>
        <AIMessageAction label="Bad response">
          <span>down</span>
        </AIMessageAction>
        <AIMessageCopy />
        <AIMessageDate />
      </AIMessageActions>
    )

    const row = document.querySelector(ACTIONS) as HTMLElement
    const buttons = Array.from(row.querySelectorAll('button'))

    expect(buttons.map((button) => button.getAttribute('aria-label'))).toEqual([
      'Good response',
      'Bad response',
      'Copy message',
    ])
    expect(row.querySelectorAll('[data-sl-ai-message-copy]')).toHaveLength(1)
    expect(row.querySelectorAll('[data-sl-ai-message-date]')).toHaveLength(1)
    expect(row.lastElementChild).toHaveAttribute('data-sl-ai-message-date')
  })

  it('renders nothing while the message is running', () => {
    renderActions({ ...complete, status: { type: 'running' } })

    expect(document.querySelector(ACTIONS)).toBeNull()
  })

  it('renders nothing for a completed message with no text', () => {
    renderActions({
      ...complete,
      content: [
        { type: 'reasoning', text: 'Hmm' },
        { type: 'text', text: '' },
      ],
    })

    expect(document.querySelector(ACTIONS)).toBeNull()
  })

  it('renders nothing for a user message', () => {
    renderActions({ ...complete, role: 'user' })

    expect(document.querySelector(ACTIONS)).toBeNull()
  })

  it.each(['incomplete', 'requires-action', 'running'])(
    'renders nothing for a %s message',
    (type) => {
      renderActions({ ...complete, status: { type } })

      expect(document.querySelector(ACTIONS)).toBeNull()
    }
  )

  it('without a status, renders when the message is not the running last one', () => {
    renderActions(
      { ...complete, status: undefined, isLast: false },
      undefined,
      true
    )

    expect(document.querySelector(ACTIONS)).not.toBeNull()
  })

  it('without a status, renders for the last message when the thread is idle', () => {
    renderActions({ ...complete, status: undefined, isLast: true })

    expect(document.querySelector(ACTIONS)).not.toBeNull()
  })

  it('without a status, renders nothing for the last message while the thread runs', () => {
    renderActions(
      { ...complete, status: undefined, isLast: true },
      undefined,
      true
    )

    expect(document.querySelector(ACTIONS)).toBeNull()
  })
})

describe('AIMessageAction', () => {
  it('AIMessageAction exposes its label as the accessible name and forwards aria-pressed', () => {
    const onClick = vi.fn()

    render(
      <AIMessageAction label="Good response" aria-pressed onClick={onClick}>
        <span>up</span>
      </AIMessageAction>
    )

    const button = screen.getByRole('button', { name: 'Good response' })

    expect(button).toHaveAttribute('type', 'button')
    expect(button).toHaveAttribute('data-sl-ai-message-action')
    expect(button).toHaveAttribute('aria-pressed', 'true')

    button.click()
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('passes disabled through', () => {
    render(
      <AIMessageAction label="Good response" disabled>
        <span>up</span>
      </AIMessageAction>
    )

    expect(screen.getByRole('button', { name: 'Good response' })).toBeDisabled()
  })
})
