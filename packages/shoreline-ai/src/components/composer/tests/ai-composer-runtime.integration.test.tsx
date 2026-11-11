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
import { createRef } from 'react'
import { afterEach, beforeEach, vi } from 'vitest'

import { MockRuntimeProvider } from '../../../test-utils'
import { useAIComposer } from '../../../hooks/use-ai-composer'
import type { StreamTransport } from '../../../runtime/types'

import {
  AIComposer,
  AIComposerAction,
  AIComposerAddAttachment,
  AIComposerAttachments,
  AIComposerField,
  AIComposerFooter,
  AIComposerInput,
} from '..'

describe('AIComposer runtime integration', () => {
  it('updates input value when typing via ComposerRuntime', async () => {
    const user = userEvent.setup()

    render(
      <LocaleProvider locale="en-US">
        <MockRuntimeProvider>
          <AIComposer>
            <AIComposerField>
              <AIComposerInput placeholder="Type here" />
            </AIComposerField>
          </AIComposer>
        </MockRuntimeProvider>
      </LocaleProvider>
    )

    const input = screen.getByPlaceholderText('Type here')

    await user.type(input, 'Hello')

    expect(input).toHaveValue('Hello')
  })
})

function DraftProbe() {
  const { text } = useAIComposer()

  return <output data-testid="draft">{text}</output>
}

describe('AIComposerInput asChild', () => {
  it('renders the child as the textarea', () => {
    render(
      <LocaleProvider locale="en-US">
        <MockRuntimeProvider>
          <AIComposer>
            <AIComposerField>
              <AIComposerInput asChild>
                <textarea data-testid="own" />
              </AIComposerInput>
            </AIComposerField>
          </AIComposer>
        </MockRuntimeProvider>
      </LocaleProvider>
    )

    expect(screen.getByTestId('own')).toHaveAttribute('data-sl-textarea-input')
    expect(document.querySelectorAll('textarea')).toHaveLength(1)
  })

  it('keeps the draft in sync through the child', async () => {
    const user = userEvent.setup()

    render(
      <LocaleProvider locale="en-US">
        <MockRuntimeProvider>
          <AIComposer>
            <AIComposerField>
              <AIComposerInput asChild>
                <textarea data-testid="own" />
              </AIComposerInput>
            </AIComposerField>
            <DraftProbe />
          </AIComposer>
        </MockRuntimeProvider>
      </LocaleProvider>
    )

    await user.type(screen.getByTestId('own'), 'Hello')

    expect(screen.getByTestId('own')).toHaveValue('Hello')
    expect(screen.getByTestId('draft')).toHaveTextContent('Hello')
  })

  it('still sends on Enter', async () => {
    const user = userEvent.setup()
    const run = vi.fn()
    const transport: StreamTransport = {
      // biome-ignore lint/correctness/useYield: the run ends without snapshots
      async *run(...args: unknown[]) {
        run(...args)

        return { parts: [{ type: 'text', text: 'Done' }], status: 'ready' }
      },
    }

    render(
      <LocaleProvider locale="en-US">
        <MockRuntimeProvider transport={transport}>
          <AIComposer>
            <AIComposerField>
              <AIComposerInput asChild>
                <textarea data-testid="own" />
              </AIComposerInput>
            </AIComposerField>
          </AIComposer>
        </MockRuntimeProvider>
      </LocaleProvider>
    )

    await user.type(screen.getByTestId('own'), 'Hello{Enter}')

    await waitFor(() => expect(run).toHaveBeenCalledTimes(1))
  })

  it('forwards the ref to the child', () => {
    const ref = createRef<HTMLTextAreaElement>()

    render(
      <LocaleProvider locale="en-US">
        <MockRuntimeProvider>
          <AIComposer>
            <AIComposerField>
              <AIComposerInput asChild ref={ref}>
                <textarea data-testid="own" />
              </AIComposerInput>
            </AIComposerField>
          </AIComposer>
        </MockRuntimeProvider>
      </LocaleProvider>
    )

    expect(ref.current).toBe(screen.getByTestId('own'))
  })
})

describe('AIComposer loading', () => {
  it('keeps the draft when loading toggles off', async () => {
    const user = userEvent.setup()
    const tree = (loading: boolean) => (
      <LocaleProvider locale="en-US">
        <MockRuntimeProvider>
          <AIComposer loading={loading}>
            <AIComposerField>
              <AIComposerInput placeholder="Type here" />
            </AIComposerField>
          </AIComposer>
        </MockRuntimeProvider>
      </LocaleProvider>
    )
    const { rerender } = render(tree(false))

    await user.type(screen.getByPlaceholderText('Type here'), 'Hello')
    rerender(tree(true))
    expect(screen.queryByPlaceholderText('Type here')).toBeNull()
    rerender(tree(false))

    expect(screen.getByPlaceholderText('Type here')).toHaveValue('Hello')
  })
})

describe('AIComposerAction while a run is active', () => {
  it('shows stop while the run has no content yet and send again when it ends', async () => {
    const user = userEvent.setup()
    let release!: () => void
    const gate = new Promise<void>((resolve) => {
      release = resolve
    })
    const transport: StreamTransport = {
      // biome-ignore lint/correctness/useYield: the run holds, then ends without snapshots
      async *run() {
        await gate

        return { parts: [{ type: 'text', text: 'Done' }], status: 'ready' }
      },
    }

    render(
      <LocaleProvider locale="en-US">
        <MockRuntimeProvider transport={transport}>
          <AIComposer>
            <AIComposerField>
              <AIComposerInput placeholder="Type here" />
              <AIComposerFooter>
                <AIComposerAction />
              </AIComposerFooter>
            </AIComposerField>
          </AIComposer>
        </MockRuntimeProvider>
      </LocaleProvider>
    )

    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument()

    await user.type(screen.getByPlaceholderText('Type here'), 'Hello')
    await user.click(screen.getByRole('button', { name: 'Send' }))

    expect(
      await screen.findByRole('button', { name: 'Stop' })
    ).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Send' })).toBeNull()

    release()

    expect(
      await screen.findByRole('button', { name: 'Send' })
    ).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Stop' })).toBeNull()
  })
})

describe('AIComposer attachments', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'URL',
      class extends URL {
        static createObjectURL = vi.fn(() => 'blob:mock-object-url')
        static revokeObjectURL = vi.fn()
      }
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should remove an uploaded attachment when clicking remove', async () => {
    const user = userEvent.setup()

    render(
      <LocaleProvider locale="en-US">
        <MockRuntimeProvider>
          <AIComposer>
            <AIComposerField>
              <AIComposerAttachments />
              <AIComposerInput placeholder="Type here" />
              <AIComposerFooter>
                <AIComposerAddAttachment />
              </AIComposerFooter>
            </AIComposerField>
          </AIComposer>
        </MockRuntimeProvider>
      </LocaleProvider>
    )

    await user.click(screen.getByRole('button', { name: /add attachment/i }))

    const fileInputs = document.body.querySelectorAll('input[type="file"]')
    const fileInput = fileInputs.item(fileInputs.length - 1)

    if (!(fileInput instanceof HTMLInputElement)) {
      throw new Error('File input not found after clicking add attachment')
    }

    await user.upload(
      fileInput,
      new File(['hello'], 'notes.txt', { type: 'text/plain' })
    )

    await waitFor(() => {
      expect(screen.getByText('notes.txt')).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /remove attachment/i }))

    await waitFor(() => {
      expect(screen.queryByText('notes.txt')).not.toBeInTheDocument()
    })
  })
})
