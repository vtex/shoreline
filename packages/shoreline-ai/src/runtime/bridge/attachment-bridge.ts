/**
 * Bridges AttachmentHandler to the attachment adapter of the engine.
 */

import type {
  AttachmentAdapter,
  PendingAttachment as EnginePendingAttachment,
} from '@assistant-ui/react'

import { generateId } from '../../utils/generate-id'
import type { AttachmentHandler, PendingAttachment } from '../types'
import { packExtras } from './part-extras'

/** Why an attachment failed, so the chip can show a localized message. */
export type AttachmentErrorReason =
  | { code: 'too-large'; max: number }
  | { code: 'too-many'; max: number }
  | { code: 'upload-failed' }

function getAttachmentType(file: File): 'image' | 'document' | 'file' {
  if (file.type.startsWith('image/')) return 'image'
  if (
    file.type === 'application/pdf' ||
    file.type.startsWith('text/') ||
    file.type.includes('document')
  ) {
    return 'document'
  }

  return 'file'
}

/**
 * `errors` receives the reason of every failed attachment, by attachment id.
 * An entry is removed when its attachment is removed or sent.
 */
export function createAssistantAttachmentAdapter(
  handler: AttachmentHandler,
  errors: Map<string, AttachmentErrorReason>
): AttachmentAdapter {
  const pendingMap = new Map<string, PendingAttachment>()
  const objectUrlByAttachmentId = new Map<string, string>()

  // Frees the upload of an attachment. Its error reason stays: the chip
  // shows it until the attachment is removed or sent.
  function release(attachmentId: string): void {
    const url = objectUrlByAttachmentId.get(attachmentId)

    if (url) {
      URL.revokeObjectURL(url)
      objectUrlByAttachmentId.delete(attachmentId)
    }

    pendingMap.delete(attachmentId)
  }

  function rejectionFor(file: File): AttachmentErrorReason | null {
    if (handler.maxSize !== undefined && file.size > handler.maxSize) {
      return { code: 'too-large', max: handler.maxSize }
    }

    if (handler.maxCount !== undefined && pendingMap.size >= handler.maxCount) {
      return { code: 'too-many', max: handler.maxCount }
    }

    return null
  }

  return {
    accept: handler.accept ?? '*',

    async *add({ file }) {
      const id = generateId('att')
      const base = {
        id,
        type: getAttachmentType(file),
        name: file.name,
        file,
        contentType: file.type,
      }
      // A message from the handler is shown as is; otherwise the chip builds
      // a localized one from the reason. The reason is stored before the
      // failed state reaches the chip, so the chip never reads an old value.
      const failed = (
        reason: AttachmentErrorReason,
        message?: string
      ): EnginePendingAttachment => {
        errors.set(id, reason)

        return {
          ...base,
          status: { type: 'incomplete', reason: 'error', message },
        }
      }
      const rejection = rejectionFor(file)

      if (rejection) {
        yield failed(rejection)

        return
      }

      pendingMap.set(id, { id, file, name: file.name, contentType: file.type })

      const objectUrl = URL.createObjectURL(file)

      objectUrlByAttachmentId.set(id, objectUrl)

      yield {
        ...base,
        status: { type: 'running', reason: 'uploading', progress: 0 },
      }

      try {
        for await (const state of handler.add(file)) {
          if (state.status === 'error') {
            release(id)
            yield failed({ code: 'upload-failed' }, state.error)

            return
          }

          if (state.status === 'uploading') {
            yield {
              ...base,
              status: {
                type: 'running',
                reason: 'uploading',
                progress: Math.min(1, Math.max(0, state.progress)),
              },
            }
          }
        }
      } catch (error) {
        release(id)
        yield failed(
          { code: 'upload-failed' },
          error instanceof Error ? error.message : undefined
        )

        return
      }

      yield {
        ...base,
        status: { type: 'requires-action', reason: 'composer-send' },
        content: [{ type: 'file', data: objectUrl, mimeType: file.type }],
      }
    },

    async send(attachment) {
      if (
        attachment.status.type === 'incomplete' &&
        attachment.status.reason === 'error'
      ) {
        // A failed upload never blocks the message: it goes out as a
        // complete attachment with no content, which maps to no part.
        errors.delete(attachment.id)

        return {
          id: attachment.id,
          type: attachment.type,
          name: attachment.name,
          contentType: attachment.contentType,
          status: { type: 'complete' as const },
          content: [],
        }
      }

      const pending = pendingMap.get(attachment.id)

      if (!pending) {
        throw new Error(`No pending attachment for ${attachment.id}`)
      }

      const resource = await handler.send(pending)

      release(attachment.id)

      return {
        id: attachment.id,
        type: attachment.type,
        name: attachment.name,
        contentType: attachment.contentType,
        status: { type: 'complete' as const },
        content: [
          {
            type: 'file',
            data: resource.uri,
            mimeType:
              resource.mimeType ??
              attachment.contentType ??
              'application/octet-stream',
            ...packExtras({ size: resource.size }),
          },
        ],
      }
    },

    async remove(attachment) {
      const pending = pendingMap.get(attachment.id)

      release(attachment.id)
      errors.delete(attachment.id)

      if (pending) {
        await handler.remove(pending)
      }
    },
  }
}
