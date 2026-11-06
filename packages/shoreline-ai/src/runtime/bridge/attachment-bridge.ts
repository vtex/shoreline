/**
 * Bridges AttachmentHandler to Assistant-UI attachment adapter shape.
 */

import type {
  AttachmentAdapter,
  PendingAttachment as EnginePendingAttachment,
} from '@assistant-ui/react'

import { generateId } from '../../utils/generate-id'
import type { AttachmentHandler, PendingAttachment } from '../types'
import { formatFileSize } from '../../utils/attachment-utils'
import { packExtras } from './part-extras'

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

export function createAssistantAttachmentAdapter(
  handler: AttachmentHandler
): AttachmentAdapter {
  const pendingMap = new Map<string, PendingAttachment>()
  const objectUrlByAttachmentId = new Map<string, string>()

  function release(attachmentId: string): void {
    const url = objectUrlByAttachmentId.get(attachmentId)

    if (url) {
      URL.revokeObjectURL(url)
      objectUrlByAttachmentId.delete(attachmentId)
    }

    pendingMap.delete(attachmentId)
  }

  function rejectionFor(file: File): string | null {
    if (handler.maxSize !== undefined && file.size > handler.maxSize) {
      return `File is too large (max ${formatFileSize(handler.maxSize)})`
    }

    if (handler.maxCount !== undefined && pendingMap.size >= handler.maxCount) {
      return `Too many files (max ${handler.maxCount})`
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
      const failed = (message: string): EnginePendingAttachment => ({
        ...base,
        status: { type: 'incomplete', reason: 'error', message },
      })
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
            yield failed(state.error ?? 'Upload failed')

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
        yield failed(error instanceof Error ? error.message : 'Upload failed')

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
        throw new Error(attachment.status.message ?? 'Upload failed')
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

      if (pending) {
        await handler.remove(pending)
      }
    },
  }
}
