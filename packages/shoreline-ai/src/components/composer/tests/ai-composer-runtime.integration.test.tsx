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
import { afterEach, beforeEach, vi } from 'vitest'

import { MockRuntimeProvider } from '../../../test-utils'
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
