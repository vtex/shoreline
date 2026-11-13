import type { ReactNode } from 'react'
import {
  act,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  render,
  screen,
  userEvent,
  waitFor,
} from '@vtex/shoreline-test-utils'
import { vi } from 'vitest'
import { LocaleProvider } from '@vtex/shoreline'

import { useAIThread } from '../../../hooks/use-ai-thread'
import { MockRuntimeProvider } from '../../../test-utils'
import type { StreamTransport } from '../../../runtime/types'
import { AIMessageActions } from '../ai-message-actions'
import { AIMessageCopy } from '../ai-message-copy'
import { AIMessages } from '../ai-messages'
import { MessageMessagesProvider } from '../message-messages-context'

const aui = vi.hoisted(() => ({
  override: null as null | { content: unknown[] },
}))

vi.mock('@assistant-ui/react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@assistant-ui/react')>()

  return {
    ...actual,
    useAuiState: ((selector: (state: unknown) => unknown) =>
      aui.override
        ? selector({ message: aui.override })
        : actual.useAuiState(selector as never)) as typeof actual.useAuiState,
  }
})

const COPY = '[data-sl-ai-message-copy]'
const ACTIONS = '[data-sl-ai-message-actions]'

function setClipboard(value: unknown) {
  Object.defineProperty(navigator, 'clipboard', {
    value,
    configurable: true,
  })
}

describe('AIMessageCopy', () => {
  describe('with fake timers', () => {
    let writeText: ReturnType<typeof vi.fn>

    beforeEach(() => {
      aui.override = { content: [{ type: 'text', text: 'Hello world' }] }
      vi.useFakeTimers({ shouldAdvanceTime: false })
      writeText = vi.fn().mockResolvedValue(undefined)
      setClipboard({ writeText })
    })

    afterEach(() => {
      aui.override = null
      vi.useRealTimers()
      setClipboard(undefined)
    })

    async function click(button: HTMLElement) {
      await act(async () => {
        button.click()
      })
    }

    function renderCopy(onCopied?: () => void, node?: ReactNode) {
      return render(
        <LocaleProvider locale="en-US">
          <MessageMessagesProvider>
            {node ?? <AIMessageCopy onCopied={onCopied} />}
          </MessageMessagesProvider>
        </LocaleProvider>
      )
    }

    it('sets data-copied, calls onCopied once and announces', async () => {
      const onCopied = vi.fn()

      renderCopy(onCopied)
      const button = screen.getByRole('button', { name: 'Copy message' })

      await click(button)

      expect(writeText).toHaveBeenCalledTimes(1)
      expect(writeText).toHaveBeenCalledWith('Hello world')
      expect(button).toHaveAttribute('data-copied')
      expect(onCopied).toHaveBeenCalledTimes(1)
      expect(document.querySelector('[aria-live="polite"]')).toHaveTextContent(
        'Message copied'
      )
    })

    it('clears data-copied after 2000 ms', async () => {
      renderCopy()
      const button = screen.getByRole('button', { name: 'Copy message' })

      await click(button)
      act(() => {
        vi.advanceTimersByTime(1999)
      })
      expect(button).toHaveAttribute('data-copied')

      act(() => {
        vi.advanceTimersByTime(1)
      })
      expect(button).not.toHaveAttribute('data-copied')
    })

    it('restarts the timer on a second click', async () => {
      renderCopy()
      const button = screen.getByRole('button', { name: 'Copy message' })

      await click(button)
      act(() => {
        vi.advanceTimersByTime(1000)
      })
      await click(button)
      act(() => {
        vi.advanceTimersByTime(1999)
      })
      expect(button).toHaveAttribute('data-copied')

      act(() => {
        vi.advanceTimersByTime(1)
      })
      expect(button).not.toHaveAttribute('data-copied')
    })

    it('does nothing when writeText rejects', async () => {
      const onCopied = vi.fn()
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      writeText.mockRejectedValue(new Error('denied'))
      renderCopy(onCopied)
      const button = screen.getByRole('button', { name: 'Copy message' })

      await click(button)

      expect(button).not.toHaveAttribute('data-copied')
      expect(onCopied).not.toHaveBeenCalled()
      expect(errorSpy).not.toHaveBeenCalled()
      errorSpy.mockRestore()
    })

    it('does nothing when the clipboard is unavailable', async () => {
      const onCopied = vi.fn()

      setClipboard(undefined)
      renderCopy(onCopied)
      const button = screen.getByRole('button', { name: 'Copy message' })

      await click(button)

      expect(button).not.toHaveAttribute('data-copied')
      expect(onCopied).not.toHaveBeenCalled()
    })

    it('clears the pending timer when unmounted before it fires', async () => {
      const { unmount } = renderCopy()

      await click(screen.getByRole('button', { name: 'Copy message' }))
      expect(vi.getTimerCount()).toBe(1)

      unmount()

      expect(vi.getTimerCount()).toBe(0)
    })

    it('does not update state when the write resolves after unmount', async () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      let resolve: () => void = () => {}

      writeText.mockReturnValue(
        new Promise<void>((r) => {
          resolve = r
        })
      )
      const onCopied = vi.fn()
      const { unmount } = renderCopy(onCopied)

      await click(screen.getByRole('button', { name: 'Copy message' }))
      unmount()
      await act(async () => {
        resolve()
      })

      expect(onCopied).not.toHaveBeenCalled()
      expect(errorSpy).not.toHaveBeenCalled()
      errorSpy.mockRestore()
    })
  })

  describe('AIMessageActions', () => {
    beforeEach(() => {
      aui.override = { content: [{ type: 'text', text: 'Hi' }] }
    })
    afterEach(() => {
      aui.override = null
    })

    it('renders only the copy button without children', () => {
      render(
        <LocaleProvider locale="en-US">
          <MessageMessagesProvider>
            <AIMessageActions />
          </MessageMessagesProvider>
        </LocaleProvider>
      )

      const row = document.querySelector(ACTIONS) as HTMLElement

      expect(row.querySelectorAll('button')).toHaveLength(1)
      expect(row.querySelector(COPY)).not.toBeNull()
    })

    it('renders children after the copy button', () => {
      render(
        <LocaleProvider locale="en-US">
          <MessageMessagesProvider>
            <AIMessageActions>
              <button type="button">Like</button>
            </AIMessageActions>
          </MessageMessagesProvider>
        </LocaleProvider>
      )

      const buttons = Array.from(
        (document.querySelector(ACTIONS) as HTMLElement).querySelectorAll(
          'button'
        )
      )

      expect(buttons).toHaveLength(2)
      expect(buttons[0]).toHaveAttribute('data-sl-ai-message-copy')
      expect(buttons[1]).toHaveTextContent('Like')
    })
  })

  describe('integration', () => {
    afterEach(() => setClipboard(undefined))

    function SendButton({ text = 'Hello' }: { text?: string }) {
      const { sendMessage } = useAIThread()

      return (
        <button type="button" onClick={() => sendMessage({ text })}>
          Send
        </button>
      )
    }

    function renderThread(transport: StreamTransport) {
      return render(
        <LocaleProvider locale="en-US">
          <MockRuntimeProvider transport={transport}>
            <SendButton />
            <AIMessages />
          </MockRuntimeProvider>
        </LocaleProvider>
      )
    }

    it('renders the actions for a completed message and copies its text', async () => {
      const user = userEvent.setup()
      const writeText = vi.fn().mockResolvedValue(undefined)

      setClipboard({ writeText })
      renderThread({
        async *run() {
          yield* []

          return {
            parts: [
              { type: 'text', text: 'First' },
              { type: 'text', text: 'Second' },
            ],
            status: 'ready',
          }
        },
      })

      await user.click(screen.getByRole('button', { name: 'Send' }))
      await waitFor(() =>
        expect(document.querySelectorAll(ACTIONS)).toHaveLength(1)
      )

      await user.click(screen.getByRole('button', { name: 'Copy message' }))

      expect(writeText).toHaveBeenCalledWith('First\n\nSecond')
    })

    it('does not render the actions while running', async () => {
      const user = userEvent.setup()
      let release: () => void = () => {}
      const gate = new Promise<void>((r) => {
        release = r
      })

      renderThread({
        async *run() {
          yield {
            parts: [{ type: 'text', text: 'Partial' }],
            status: 'streaming',
          }
          await gate

          return { parts: [{ type: 'text', text: 'Partial' }], status: 'ready' }
        },
      })

      await user.click(screen.getByRole('button', { name: 'Send' }))
      await waitFor(() =>
        expect(screen.getByText('Partial')).toBeInTheDocument()
      )
      expect(document.querySelectorAll(ACTIONS)).toHaveLength(0)

      release()
      await waitFor(() =>
        expect(document.querySelectorAll(ACTIONS)).toHaveLength(1)
      )
    })

    it('does not render the actions for a message without text', async () => {
      const user = userEvent.setup()

      renderThread({
        async *run() {
          yield* []

          return {
            parts: [{ type: 'reasoning', text: 'Hmm', status: 'complete' }],
            status: 'ready',
          }
        },
      })

      await user.click(screen.getByRole('button', { name: 'Send' }))
      await waitFor(() => expect(screen.getByText('Hmm')).toBeInTheDocument())
      expect(document.querySelectorAll(ACTIONS)).toHaveLength(0)
    })
  })
})
