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

/**
 * Local attachment handler — no upload API; simulates progress and returns blob URIs.
 */
export function createMockAttachmentHandler(): AttachmentHandler {
  const blobUriById = new Map<string, string>()

  return {
    async *add(_file: File): AsyncIterable<AttachmentUploadState> {
      yield { progress: 0, status: 'uploading' }
      await delay(120)
      yield { progress: 100, status: 'ready' }
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
