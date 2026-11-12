import { createRef } from 'react'
import {
  describe,
  expect,
  it,
  render,
  screen,
  userEvent,
  waitFor,
} from '@vtex/shoreline-test-utils'
import { LocaleProvider } from '@vtex/shoreline'

import { useAIThread } from '../../../hooks/use-ai-thread'
import { MockRuntimeProvider } from '../../../test-utils'
import type { StreamTransport } from '../../../runtime/types'
import { AIMessages } from '../ai-messages'
import { AIThinkingIndicator } from '../ai-thinking-indicator'
import { MessageMessagesProvider } from '../message-messages-context'

const SELECTOR = '[data-sl-ai-thinking-indicator]'

function SendButton() {
  const { sendMessage } = useAIThread()

  return (
    <button type="button" onClick={() => sendMessage({ text: 'Hello' })}>
      Send Hello
    </button>
  )
}

function gated() {
  let release: () => void = () => {}
  const gate = new Promise<void>((resolve) => {
    release = resolve
  })

  return { gate, release: () => release() }
}

describe('AIThinkingIndicator', () => {
  it('renders a status with the localized label', () => {
    render(
      <LocaleProvider locale="en-US">
        <MessageMessagesProvider>
          <AIThinkingIndicator />
        </MessageMessagesProvider>
      </LocaleProvider>
    )

    expect(screen.getByRole('status')).toHaveTextContent('Thinking')
  })

  it('renders Pensando in pt-BR', () => {
    render(
      <LocaleProvider locale="pt-BR">
        <MessageMessagesProvider>
          <AIThinkingIndicator />
        </MessageMessagesProvider>
      </LocaleProvider>
    )

    expect(screen.getByRole('status')).toHaveTextContent('Pensando')
  })

  it('overrides the label and forwards the ref', () => {
    const ref = createRef<HTMLDivElement>()

    render(
      <LocaleProvider locale="en-US">
        <MessageMessagesProvider>
          <AIThinkingIndicator ref={ref} label="Working" />
        </MessageMessagesProvider>
      </LocaleProvider>
    )

    expect(screen.getByRole('status')).toHaveTextContent('Working')
    expect(ref.current).toBe(document.querySelector(SELECTOR))
  })
})

describe('AIMessageAssistant thinking indicator', () => {
  it('shows while running with no parts and disappears once text arrives', async () => {
    const user = userEvent.setup()
    const { gate, release } = gated()
    const transport: StreamTransport = {
      async *run() {
        await gate
        yield* []

        return { parts: [{ type: 'text', text: 'Done' }], status: 'ready' }
      },
    }

    render(
      <LocaleProvider locale="en-US">
        <MockRuntimeProvider transport={transport}>
          <SendButton />
          <AIMessages />
        </MockRuntimeProvider>
      </LocaleProvider>
    )

    await user.click(screen.getByRole('button', { name: 'Send Hello' }))

    await waitFor(() =>
      expect(document.querySelectorAll(SELECTOR)).toHaveLength(1)
    )

    release()

    await waitFor(() => expect(screen.getByText('Done')).toBeInTheDocument())
    expect(document.querySelectorAll(SELECTOR)).toHaveLength(0)
  })

  it('does not show when a reasoning part is present while running', async () => {
    const user = userEvent.setup()
    const { gate, release } = gated()
    const transport: StreamTransport = {
      async *run() {
        yield {
          parts: [{ type: 'reasoning', text: 'Hmm', status: 'streaming' }],
          status: 'streaming',
        }
        await gate

        return { parts: [{ type: 'text', text: 'Done' }], status: 'ready' }
      },
    }

    render(
      <LocaleProvider locale="en-US">
        <MockRuntimeProvider transport={transport}>
          <SendButton />
          <AIMessages />
        </MockRuntimeProvider>
      </LocaleProvider>
    )

    await user.click(screen.getByRole('button', { name: 'Send Hello' }))

    await waitFor(() =>
      expect(
        document.querySelector('[data-sl-ai-message-reasoning]')
      ).toBeTruthy()
    )
    expect(document.querySelectorAll(SELECTOR)).toHaveLength(0)

    // A running group from the real runtime reaches the panel.
    const root = document.querySelector('[data-sl-ai-message-reasoning]')

    expect(root).toHaveAttribute('data-status', 'running')
    expect(
      root?.querySelector(
        '[data-sl-ai-message-reasoning-meta] [data-sl-ai-dots-loader]'
      )
    ).toBeTruthy()
    expect(
      root?.querySelector('[data-sl-ai-message-reasoning-trigger]')
    ).toHaveTextContent('Reasoning')

    release()
    await waitFor(() => expect(screen.getByText('Done')).toBeInTheDocument())
  })

  it('marks an earlier reasoning group complete while the last one still runs', async () => {
    const user = userEvent.setup()
    const { gate, release } = gated()
    const transport: StreamTransport = {
      async *run() {
        yield {
          parts: [
            { type: 'reasoning', text: 'First', status: 'complete' },
            { type: 'text', text: 'Partial answer' },
            { type: 'reasoning', text: 'Second', status: 'streaming' },
          ],
          status: 'streaming',
        }
        await gate

        return {
          parts: [
            { type: 'reasoning', text: 'First', status: 'complete' },
            { type: 'text', text: 'Partial answer' },
            { type: 'reasoning', text: 'Second', status: 'complete' },
          ],
          status: 'ready',
        }
      },
    }

    render(
      <LocaleProvider locale="en-US">
        <MockRuntimeProvider transport={transport}>
          <SendButton />
          <AIMessages />
        </MockRuntimeProvider>
      </LocaleProvider>
    )

    await user.click(screen.getByRole('button', { name: 'Send Hello' }))

    await waitFor(() =>
      expect(
        document.querySelectorAll('[data-sl-ai-message-reasoning]')
      ).toHaveLength(2)
    )

    const roots = document.querySelectorAll('[data-sl-ai-message-reasoning]')

    expect(roots[0]).toHaveAttribute('data-status', 'complete')
    expect(roots[1]).toHaveAttribute('data-status', 'running')
    expect(
      roots[0].querySelector('[data-sl-ai-dots-loader]')
    ).not.toBeInTheDocument()
    expect(
      roots[1].querySelector('[data-sl-ai-dots-loader]')
    ).toBeInTheDocument()

    release()
    await waitFor(() =>
      expect(
        document.querySelectorAll(
          '[data-sl-ai-message-reasoning][data-status="running"]'
        )
      ).toHaveLength(0)
    )
  })

  it('renders Pensando in pt-BR while waiting', async () => {
    const user = userEvent.setup()
    const { gate, release } = gated()
    const transport: StreamTransport = {
      async *run() {
        await gate
        yield* []

        return { parts: [{ type: 'text', text: 'Done' }], status: 'ready' }
      },
    }

    render(
      <LocaleProvider locale="pt-BR">
        <MockRuntimeProvider transport={transport}>
          <SendButton />
          <AIMessages />
        </MockRuntimeProvider>
      </LocaleProvider>
    )

    await user.click(screen.getByRole('button', { name: 'Send Hello' }))

    expect(await screen.findByText('Pensando')).toBeInTheDocument()

    release()
    await waitFor(() => expect(screen.getByText('Done')).toBeInTheDocument())
  })
})
