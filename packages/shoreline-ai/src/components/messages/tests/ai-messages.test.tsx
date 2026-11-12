import type { ReactNode } from 'react'
import { useEffect } from 'react'
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
import type { AIMessage } from '../../../types/public'
import {
  AIMessageAssistant,
  AIMessageParts,
  AIMessageText,
  AIMessages,
  renderDefaultParts,
} from '../index'

function MessagesTestShell(props: { children: ReactNode }) {
  return (
    <LocaleProvider locale="en-US">
      <MockRuntimeProvider>{props.children}</MockRuntimeProvider>
    </LocaleProvider>
  )
}

function ThreadHistorySeed(props: {
  messages: AIMessage[]
  children: ReactNode
}) {
  const { loadMessages } = useAIThread()

  useEffect(() => {
    if (props.messages.length > 0) {
      loadMessages(props.messages)
    }
  }, [loadMessages, props.messages])

  return <>{props.children}</>
}

describe('AIMessages', () => {
  it('renders drop-in message list root', () => {
    render(
      <MessagesTestShell>
        <AIMessages />
      </MessagesTestShell>
    )

    expect(document.querySelector('[data-sl-ai-messages]')).toBeTruthy()
  })

  it('renders loaded history with user bubble and reasoning panel', async () => {
    const historyMessages: AIMessage[] = [
      {
        id: 'msg-user-1',
        role: 'user',
        createdAt: '2026-05-20T12:00:00.000Z',
        parts: [{ type: 'text', text: 'Hello there' }],
      },
      {
        id: 'msg-assistant-1',
        role: 'assistant',
        createdAt: '2026-05-20T12:00:01.000Z',
        parts: [
          { type: 'reasoning', text: 'Thinking', status: 'complete' },
          { type: 'text', text: 'Hi!' },
        ],
      },
    ]

    render(
      <MessagesTestShell>
        <ThreadHistorySeed messages={historyMessages}>
          <AIMessages />
        </ThreadHistorySeed>
      </MessagesTestShell>
    )

    expect(await findText('Hello there')).toBeTruthy()
    expect(
      document.querySelector('[data-sl-ai-message-role="user"]')
    ).toBeTruthy()
    expect(
      document.querySelector('[data-sl-ai-message-reasoning]')
    ).toBeTruthy()
  })
})

describe('AIMessages while a run has no parts yet', () => {
  function SendButton() {
    const { sendMessage } = useAIThread()

    return (
      <button type="button" onClick={() => sendMessage({ text: 'Hello' })}>
        Send Hello
      </button>
    )
  }

  it('renders the assistant message before the first snapshot arrives', async () => {
    const user = userEvent.setup()
    let release: () => void = () => {}
    const gate = new Promise<void>((resolve) => {
      release = resolve
    })
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

    // The user message is on screen while the run has no content yet.
    expect(await screen.findByText('Hello')).toBeInTheDocument()
    expect(document.querySelector('[data-sl-ai-messages]')).toBeTruthy()

    release()

    await waitFor(() => expect(screen.getByText('Done')).toBeInTheDocument())
  })
})

describe('AIMessageParts override', () => {
  it('uses function children inside the normative message template', async () => {
    const historyMessages: AIMessage[] = [
      {
        id: 'msg-assistant-1',
        role: 'assistant',
        createdAt: '2026-05-20T12:00:01.000Z',
        parts: [{ type: 'text', text: 'Custom path' }],
      },
    ]

    render(
      <MessagesTestShell>
        <ThreadHistorySeed messages={historyMessages}>
          <AIMessages>
            <AIMessageAssistant>
              <AIMessageParts showReasoningTools={false}>
                {(part, meta) => {
                  if (part.type === 'text') {
                    return <AIMessageText data-testid="custom-text" />
                  }

                  return renderDefaultParts(part, meta)
                }}
              </AIMessageParts>
            </AIMessageAssistant>
          </AIMessages>
        </ThreadHistorySeed>
      </MessagesTestShell>
    )

    expect(await findText('Custom path')).toBeTruthy()
    expect(document.querySelector('[data-sl-ai-message-parts]')).toBeTruthy()
  })
})

async function findText(text: string) {
  return new Promise<Element | null>((resolve) => {
    const started = Date.now()

    const tick = () => {
      const match = Array.from(document.querySelectorAll('*')).find((node) =>
        node.textContent?.includes(text)
      )

      if (match) {
        resolve(match)
        return
      }

      if (Date.now() - started > 3000) {
        resolve(null)
        return
      }

      requestAnimationFrame(tick)
    }

    tick()
  })
}

describe('AIMessageParts reasoning groups', () => {
  it('renders one reasoning root per reasoning run and no Header export', async () => {
    const historyMessages: AIMessage[] = [
      {
        id: 'msg-assistant-1',
        role: 'assistant',
        createdAt: '2026-05-20T12:00:01.000Z',
        parts: [
          { type: 'reasoning', text: 'First', status: 'complete' },
          { type: 'text', text: 'Middle' },
          { type: 'reasoning', text: 'Second', status: 'complete' },
        ],
      },
    ]

    render(
      <MessagesTestShell>
        <ThreadHistorySeed messages={historyMessages}>
          <AIMessages />
        </ThreadHistorySeed>
      </MessagesTestShell>
    )

    await findText('Middle')
    const roots = document.querySelectorAll('[data-sl-ai-message-reasoning]')

    expect(roots).toHaveLength(2)
    for (const root of roots) {
      expect(root).toHaveAttribute('data-status', 'complete')
    }
    expect(
      document.querySelector('[data-sl-ai-message-reasoning-header]')
    ).toBeNull()
  })

  it('does not export AIMessageReasoningHeader from the package entry', async () => {
    const pkg = await import('../../..')

    expect('AIMessageReasoningHeader' in pkg).toBe(false)
  })
})
