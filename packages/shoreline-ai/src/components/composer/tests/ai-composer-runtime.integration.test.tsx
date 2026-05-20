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

import {
  AIComposer,
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
