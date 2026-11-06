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
import type {
  AttachmentHandler,
  AttachmentUploadState,
  RuntimeRunInput,
  StreamTransport,
} from '../../../runtime/types'

import {
  AIComposer,
  AIComposerAction,
  AIComposerAddAttachment,
  AIComposerAttachments,
  AIComposerField,
  AIComposerFooter,
  AIComposerInput,
} from '..'

function createHandler(
  overrides: Partial<AttachmentHandler> = {}
): AttachmentHandler {
  return {
    async *add(): AsyncIterable<AttachmentUploadState> {
      yield { progress: 1, status: 'ready' }
    },
    async send(pending) {
      return {
        type: 'resource',
        uri: `https://files.test/${pending.name}`,
        name: pending.name,
        mimeType: pending.contentType,
        size: pending.file.size,
      }
    },
    async remove() {},
    ...overrides,
  }
}

function renderComposer(
  attachments: AttachmentHandler,
  transport?: StreamTransport
) {
  return render(
    <LocaleProvider locale="en-US">
      <MockRuntimeProvider attachments={attachments} transport={transport}>
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
      </MockRuntimeProvider>
    </LocaleProvider>
  )
}

async function pickFile(
  user: ReturnType<typeof userEvent.setup>,
  file: File
): Promise<HTMLInputElement> {
  await user.click(screen.getByRole('button', { name: /add attachment/i }))

  const inputs = document.body.querySelectorAll('input[type="file"]')
  const input = inputs.item(inputs.length - 1)

  if (!(input instanceof HTMLInputElement)) {
    throw new Error('File input not found after clicking add attachment')
  }

  await user.upload(input, file)

  return input
}

const notes = () => new File(['hello'], 'notes.txt', { type: 'text/plain' })

describe('AIComposer attachments', () => {
  const createObjectURL = vi.fn(() => 'blob:mock-object-url')
  const revokeObjectURL = vi.fn()

  beforeEach(() => {
    createObjectURL.mockClear()
    revokeObjectURL.mockClear()
    vi.stubGlobal(
      'URL',
      class extends URL {
        static createObjectURL = createObjectURL
        static revokeObjectURL = revokeObjectURL
      }
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('shows upload progress while the handler uploads', async () => {
    const user = userEvent.setup()
    let release!: () => void
    const gate = new Promise<void>((resolve) => {
      release = resolve
    })

    renderComposer(
      createHandler({
        async *add() {
          yield { progress: 0.4, status: 'uploading' }
          await gate
          yield { progress: 1, status: 'ready' }
        },
      })
    )

    await pickFile(user, notes())

    const bar = await screen.findByRole('progressbar')

    expect(bar).toHaveAttribute('aria-valuenow', '40')
    expect(screen.getByText('notes.txt')).toBeInTheDocument()

    release()

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).toBeNull()
    })
    expect(screen.getByText('notes.txt')).toBeInTheDocument()
  })

  it('shows an error chip and lets the user remove it when the upload fails', async () => {
    const user = userEvent.setup()

    renderComposer(
      createHandler({
        async *add() {
          yield { progress: 0.2, status: 'uploading' }
          yield { progress: 0.2, status: 'error', error: 'Server said no' }
        },
      })
    )

    await pickFile(user, notes())

    expect(await screen.findByText('Server said no')).toBeInTheDocument()
    expect(screen.getByText('notes.txt')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /remove attachment/i }))

    await waitFor(() => {
      expect(screen.queryByText('notes.txt')).toBeNull()
    })
    expect(screen.queryByText('Server said no')).toBeNull()
  })

  it('shows an error chip when the handler throws', async () => {
    const user = userEvent.setup()

    renderComposer(
      createHandler({
        // biome-ignore lint/correctness/useYield: the upload throws before any state
        async *add() {
          throw new Error('Network down')
        },
      })
    )

    await pickFile(user, notes())

    expect(await screen.findByText('Network down')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /remove attachment/i })
    ).toBeInTheDocument()
  })

  it('rejects a file over maxSize or beyond maxCount', async () => {
    const user = userEvent.setup()
    const add = vi.fn(async function* () {
      yield { progress: 1, status: 'ready' } as AttachmentUploadState
    })

    renderComposer(createHandler({ add, maxSize: 10, maxCount: 1 }))

    await pickFile(
      user,
      new File(['x'.repeat(50)], 'big.txt', { type: 'text/plain' })
    )

    expect(await screen.findByText(/big\.txt/)).toBeInTheDocument()
    expect(screen.getByText(/too large/i)).toBeInTheDocument()
    expect(add).not.toHaveBeenCalled()

    await pickFile(user, new File(['a'], 'a.txt', { type: 'text/plain' }))
    await waitFor(() => expect(add).toHaveBeenCalledTimes(1))

    await pickFile(user, new File(['b'], 'b.txt', { type: 'text/plain' }))

    expect(await screen.findByText(/too many/i)).toBeInTheDocument()
    expect(add).toHaveBeenCalledTimes(1)
  })

  it('uses the handler accept as the file picker filter', async () => {
    const user = userEvent.setup()

    renderComposer(createHandler({ accept: 'image/*,.pdf' }))

    await user.click(screen.getByRole('button', { name: /add attachment/i }))

    const inputs = document.body.querySelectorAll('input[type="file"]')

    expect(inputs.item(inputs.length - 1)).toHaveAttribute(
      'accept',
      'image/*,.pdf'
    )
  })

  it('delivers the sent file to the transport as a resource part with uri, name, mimeType and size', async () => {
    const user = userEvent.setup()
    const runs: RuntimeRunInput[] = []
    const transport: StreamTransport = {
      async *run(input) {
        runs.push(input)
        yield { parts: [{ type: 'text', text: 'ok' }], status: 'streaming' }

        return { parts: [{ type: 'text', text: 'ok' }], status: 'ready' }
      },
    }

    renderComposer(createHandler(), transport)

    await pickFile(user, notes())
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).toBeNull()
    })
    await user.type(screen.getByPlaceholderText('Type here'), 'see file')
    await user.click(screen.getByRole('button', { name: 'Send' }))

    await waitFor(() => expect(runs).toHaveLength(1))

    const resources = runs[0].trigger.message.parts.filter(
      (part) => part.type === 'resource'
    )

    expect(resources).toEqual([
      {
        type: 'resource',
        uri: 'https://files.test/notes.txt',
        name: 'notes.txt',
        mimeType: 'text/plain',
        size: 5,
      },
    ])
  })

  it('releases the object url after send, remove and failed upload', async () => {
    const user = userEvent.setup()

    renderComposer(createHandler(), {
      // biome-ignore lint/correctness/useYield: the run ends without snapshots
      async *run() {
        return { parts: [{ type: 'text', text: 'ok' }], status: 'ready' }
      },
    })

    await pickFile(user, notes())
    await user.click(
      await screen.findByRole('button', { name: /remove attachment/i })
    )
    await waitFor(() => expect(revokeObjectURL).toHaveBeenCalledTimes(1))

    await pickFile(user, notes())
    await screen.findByText('notes.txt')
    await user.type(screen.getByPlaceholderText('Type here'), 'go')
    await user.click(screen.getByRole('button', { name: 'Send' }))
    await waitFor(() => expect(revokeObjectURL).toHaveBeenCalledTimes(2))
  })

  it('releases the object url when the upload fails', async () => {
    const user = userEvent.setup()

    renderComposer(
      createHandler({
        async *add() {
          yield { progress: 0, status: 'error', error: 'Nope' }
        },
      })
    )

    await pickFile(user, notes())
    await screen.findByText('Nope')

    expect(createObjectURL).toHaveBeenCalledTimes(1)
    expect(revokeObjectURL).toHaveBeenCalledTimes(1)
  })

  it('adds a new file after a failed one was removed', async () => {
    const user = userEvent.setup()
    let attempt = 0

    renderComposer(
      createHandler({
        async *add() {
          attempt += 1

          if (attempt === 1) {
            yield { progress: 0, status: 'error', error: 'First failed' }

            return
          }

          yield { progress: 1, status: 'ready' }
        },
      })
    )

    await pickFile(user, notes())
    await screen.findByText('First failed')
    await user.click(screen.getByRole('button', { name: /remove attachment/i }))
    await waitFor(() => expect(screen.queryByText('First failed')).toBeNull())

    await pickFile(user, new File(['b'], 'second.txt', { type: 'text/plain' }))

    expect(await screen.findByText('second.txt')).toBeInTheDocument()
    expect(screen.queryByText('First failed')).toBeNull()
  })
})
