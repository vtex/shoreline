import type { AIResourcePart } from '../types/public'
import type {
  AttachmentHandler,
  AttachmentUploadState,
  PendingAttachment,
} from '../runtime/types'

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export type MockAttachmentOptions = Pick<
  AttachmentHandler,
  'accept' | 'maxSize' | 'maxCount'
> & {
  /** Makes every upload fail with this message. */
  failWith?: string
}

/**
 * Local attachment handler — no upload API; simulates progress and returns blob URIs.
 */
export function createMockAttachmentHandler(
  options: MockAttachmentOptions = {}
): AttachmentHandler {
  const { failWith, ...limits } = options
  const blobUriById = new Map<string, string>()

  return {
    ...limits,

    async *add(_file: File): AsyncIterable<AttachmentUploadState> {
      yield { progress: 0, status: 'uploading' }
      await delay(120)

      if (failWith) {
        yield { progress: 0, status: 'error', error: failWith }

        return
      }

      yield { progress: 1, status: 'ready' }
    },

    async send(pending: PendingAttachment): Promise<AIResourcePart> {
      let uri = blobUriById.get(pending.id)

      if (!uri) {
        uri = URL.createObjectURL(pending.file)
        blobUriById.set(pending.id, uri)
      }

      return {
        type: 'resource',
        uri,
        name: pending.name,
        mimeType: pending.contentType,
        size: pending.file.size,
      }
    },

    async remove(pending: PendingAttachment): Promise<void> {
      const uri = blobUriById.get(pending.id)

      if (uri) {
        URL.revokeObjectURL(uri)
        blobUriById.delete(pending.id)
      }
    },
  }
}
