import {
  act,
  describe,
  expect,
  it,
  render,
  renderHook,
  screen,
  userEvent,
  waitFor,
} from '@vtex/shoreline-test-utils'
import { LocaleProvider } from '@vtex/shoreline'
import type { ReactNode } from 'react'
import { afterEach, vi } from 'vitest'

import {
  AIComposer,
  AIComposerAction,
  AIComposerAddAttachment,
  AIComposerAttachments,
  AIComposerField,
  AIComposerFooter,
  AIComposerInput,
} from '../../components/composer'
import { AIMessageAssistant, AIMessages } from '../../components/messages'
import type { StreamTransport } from '../../runtime/types'
import { MockRuntimeProvider } from '../../test-utils'
import type { AIMessagePart } from '../../types/public'
import { useAIResources } from '../use-ai-resources'
import { useAIThread } from '../use-ai-thread'

const REPLY: AIMessagePart[] = [
  { type: 'text', text: 'Here are your files' },
  {
    type: 'resource',
    uri: 'https://files.test/report.pdf',
    name: 'report.pdf',
    mimeType: 'application/pdf',
  },
  {
    type: 'resource',
    uri: 'https://files.test/chart.png',
    name: 'chart.png',
    mimeType: 'image/png',
  },
]

const TRANSPORT: StreamTransport = {
  // biome-ignore lint/correctness/useYield: returns the reply right away
  async *run() {
    return { parts: REPLY, status: 'ready' }
  },
}

function wrapper({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider locale="en-US">
      <MockRuntimeProvider transport={TRANSPORT}>
        {children}
      </MockRuntimeProvider>
    </LocaleProvider>
  )
}

describe('useAIResources', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns the resource parts of the message with the given id', async () => {
    const { result } = renderHook(
      () => {
        const thread = useAIThread()
        const assistant = thread.messages.find(
          (message) => message.role === 'assistant'
        )

        return { thread, resources: useAIResources(assistant?.id) }
      },
      { wrapper }
    )

    expect(result.current.resources).toEqual([])

    act(() => result.current.thread.sendMessage({ text: 'files please' }))

    await waitFor(() => expect(result.current.resources).toHaveLength(2))
    expect(result.current.resources).toEqual([
      expect.objectContaining({
        type: 'resource',
        uri: 'https://files.test/report.pdf',
        name: 'report.pdf',
        mimeType: 'application/pdf',
      }),
      expect.objectContaining({
        type: 'resource',
        uri: 'https://files.test/chart.png',
        name: 'chart.png',
        mimeType: 'image/png',
      }),
    ])
  })

  it('returns an empty list for an unknown message id', () => {
    const { result } = renderHook(() => useAIResources('missing'), {
      wrapper,
    })

    expect(result.current).toEqual([])
  })

  it('reads the current message when used inside a message', async () => {
    function ResourceNames() {
      const resources = useAIResources()

      return <p>{resources.map((resource) => resource.name).join(', ')}</p>
    }

    function Send() {
      const { sendMessage, messages } = useAIThread()

      return messages.length === 0 ? (
        <button type="button" onClick={() => sendMessage({ text: 'hi' })}>
          Send hi
        </button>
      ) : null
    }

    render(
      <>
        <Send />
        <AIMessages>
          <AIMessageAssistant>
            <ResourceNames />
          </AIMessageAssistant>
        </AIMessages>
      </>,
      { wrapper }
    )

    act(() => screen.getByRole('button', { name: 'Send hi' }).click())

    expect(await screen.findByText('report.pdf, chart.png')).toBeInTheDocument()
  })

  it('returns the attachment of a user message as a resource part', async () => {
    const user = userEvent.setup()

    vi.stubGlobal(
      'URL',
      class extends URL {
        static createObjectURL = () => 'blob:mock-object-url'
        static revokeObjectURL = () => {}
      }
    )

    function UserResources() {
      const { messages } = useAIThread()
      const first = messages.find((message) => message.role === 'user')
      const resources = useAIResources(first?.id)

      return <p>{resources.map((r) => `${r.name}|${r.mimeType}`).join(',')}</p>
    }

    render(
      <>
        <AIComposer>
          <AIComposerField>
            <AIComposerAttachments />
            <AIComposerInput placeholder="Type here" />
            <AIComposerFooter>
              <AIComposerAddAttachment />
              <AIComposerAction />
            </AIComposerFooter>
          </AIComposerField>
        </AIComposer>
        <UserResources />
      </>,
      { wrapper }
    )

    await user.click(screen.getByRole('button', { name: /add attachment/i }))

    const inputs = document.body.querySelectorAll('input[type="file"]')
    const input = inputs.item(inputs.length - 1) as HTMLInputElement

    await user.upload(
      input,
      new File(['hello'], 'notes.txt', { type: 'text/plain' })
    )
    await waitFor(() => expect(screen.queryByRole('progressbar')).toBeNull())
    await user.type(screen.getByPlaceholderText('Type here'), 'see file')
    await user.click(screen.getByRole('button', { name: 'Send' }))

    expect(await screen.findByText('notes.txt|text/plain')).toBeInTheDocument()
  })
})
