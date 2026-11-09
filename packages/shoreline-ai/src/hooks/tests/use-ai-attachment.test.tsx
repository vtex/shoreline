import {
  describe,
  expect,
  it,
  render,
  renderHook,
  screen,
  userEvent,
  waitFor,
} from '@vtex/shoreline-test-utils'
import { useEffect } from 'react'
import { afterEach, beforeEach, vi } from 'vitest'

import {
  AIComposer,
  AIComposerAddAttachment,
  AIComposerAttachments,
  AIComposerField,
  AIComposerFooter,
} from '../../components/composer'
import type {
  AttachmentHandler,
  AttachmentUploadState,
} from '../../runtime/types'
import { MockRuntimeProvider } from '../../test-utils'
import type { AIAttachment } from '../../types/public'
import { useAIAttachment } from '../use-ai-attachment'
import { useAIComposer } from '../use-ai-composer'

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

type Api = ReturnType<typeof useAIAttachment>

function Chip(props: { onError?: () => void; onApi?: (api: Api) => void }) {
  const api = useAIAttachment()

  props.onApi?.(api)

  useEffect(() => {
    if (api.attachment.status === 'error') props.onError?.()
  }, [api.attachment.status, props.onError])

  return (
    <div role="note">
      <span>{`${api.attachment.name}:${api.attachment.status}`}</span>
      <button type="button" onClick={api.remove}>
        drop
      </button>
      {api.retry && (
        <button type="button" onClick={api.retry}>
          again
        </button>
      )}
    </div>
  )
}

function Count() {
  const { attachments } = useAIComposer()

  return <output>{`count:${attachments.length}`}</output>
}

function renderChip(
  handler: AttachmentHandler,
  chipProps: Parameters<typeof Chip>[0] = {}
) {
  return render(
    <MockRuntimeProvider attachments={handler}>
      <AIComposer>
        <AIComposerField>
          <AIComposerAttachments>
            {() => <Chip {...chipProps} />}
          </AIComposerAttachments>
          <Count />
          <AIComposerFooter>
            <AIComposerAddAttachment />
          </AIComposerFooter>
        </AIComposerField>
      </AIComposer>
    </MockRuntimeProvider>
  )
}

async function pickFile(
  user: ReturnType<typeof userEvent.setup>,
  file: File
): Promise<void> {
  await user.click(screen.getByRole('button', { name: /add attachment/i }))

  const inputs = document.body.querySelectorAll('input[type="file"]')
  const input = inputs.item(inputs.length - 1)

  if (!(input instanceof HTMLInputElement)) throw new Error('no file input')

  input.removeAttribute('accept')
  await user.upload(input, file)
}

const notes = () => new File(['hello'], 'notes.txt', { type: 'text/plain' })

describe('useAIAttachment', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'URL',
      class extends URL {
        static createObjectURL = vi.fn(() => 'blob:mock')
        static revokeObjectURL = vi.fn()
      }
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns the attachment and a remove that takes it out of the composer', async () => {
    const user = userEvent.setup()
    let seen: AIAttachment | undefined

    renderChip(createHandler(), {
      onApi: (api) => {
        seen = api.attachment
      },
    })
    await pickFile(user, notes())

    expect(await screen.findByText('notes.txt:ready')).toBeInTheDocument()
    expect(seen?.name).toBe('notes.txt')
    expect(screen.getByText('count:1')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'drop' }))

    await waitFor(() => expect(screen.getByText('count:0')).toBeInTheDocument())
    expect(screen.queryByText('notes.txt:ready')).toBeNull()
  })

  it('retries a failed upload with the same file', async () => {
    const user = userEvent.setup()
    const files: File[] = []
    let calls = 0
    const add = vi.fn(async function* (
      file: File
    ): AsyncIterable<AttachmentUploadState> {
      files.push(file)
      calls += 1

      if (calls === 1) {
        yield { progress: 0, status: 'error', error: 'Server said no' }

        return
      }

      yield { progress: 1, status: 'ready' }
    })
    const file = notes()

    renderChip(createHandler({ add }))
    await pickFile(user, file)

    expect(await screen.findByText('notes.txt:error')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'again' }))

    expect(await screen.findByText('notes.txt:ready')).toBeInTheDocument()
    expect(add).toHaveBeenCalledTimes(2)
    expect(files[1]).toBe(file)
    expect(screen.getByText('count:1')).toBeInTheDocument()
  })

  it('has no retry for a rejected file or a ready attachment', async () => {
    const user = userEvent.setup()

    renderChip(createHandler({ maxSize: 3 }))
    await pickFile(user, notes())

    expect(await screen.findByText('notes.txt:error')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'again' })).toBeNull()
  })

  it('has no retry for a ready attachment', async () => {
    const user = userEvent.setup()

    renderChip(createHandler())
    await pickFile(user, notes())

    expect(await screen.findByText('notes.txt:ready')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'again' })).toBeNull()
  })

  it('throws a clear error outside an attachment', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})

    const message = 'useAIAttachment must be used inside AIComposerAttachments'

    expect(() => renderHook(() => useAIAttachment())).toThrow(message)
    expect(() =>
      renderHook(() => useAIAttachment(), {
        wrapper: ({ children }) => (
          <MockRuntimeProvider>
            <AIComposer>{children}</AIComposer>
          </MockRuntimeProvider>
        ),
      })
    ).toThrow(message)
  })

  it('lets a chip react once when the attachment enters the error state', async () => {
    const user = userEvent.setup()
    const onError = vi.fn()

    renderChip(
      createHandler({
        async *add() {
          yield { progress: 0, status: 'error', error: 'Server said no' }
        },
      }),
      { onError }
    )
    await pickFile(user, notes())

    expect(await screen.findByText('notes.txt:error')).toBeInTheDocument()
    expect(onError).toHaveBeenCalledTimes(1)
  })
})
