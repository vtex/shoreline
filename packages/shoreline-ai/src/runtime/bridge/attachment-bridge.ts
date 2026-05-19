/**
 * Bridges AttachmentHandler to Assistant-UI attachment adapter shape.
 */

import type { AttachmentAdapter } from '@assistant-ui/react'

import { generateId } from '../../utils/generate-id'
import type { AttachmentHandler, PendingAttachment } from '../types'

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

  function revokeObjectUrl(attachmentId: string): void {
    const url = objectUrlByAttachmentId.get(attachmentId)

    if (url) {
      URL.revokeObjectURL(url)
      objectUrlByAttachmentId.delete(attachmentId)
    }
  }

  return {
    accept: '*',

    async add({ file }) {
      const id = generateId('att')
      const pending: PendingAttachment = {
        id,
        file,
        name: file.name,
        contentType: file.type,
      }

      pendingMap.set(id, pending)

      const upload = handler.add(file)

      for await (const state of upload) {
        if (state.status === 'error') {
          throw new Error(state.error ?? 'Upload failed')
        }
      }

      const objectUrl = URL.createObjectURL(file)

      objectUrlByAttachmentId.set(id, objectUrl)

      return {
        id,
        type: getAttachmentType(file),
        name: file.name,
        file,
        contentType: file.type,
        status: {
          type: 'requires-action' as const,
          reason: 'composer-send' as const,
        },
        content: [
          {
            type: 'file',
            data: objectUrl,
            mimeType: file.type,
          },
        ],
      }
    },

    async send(attachment) {
      const pending = pendingMap.get(attachment.id)

      if (!pending) {
        throw new Error(`No pending attachment for ${attachment.id}`)
      }

      revokeObjectUrl(attachment.id)

      const resource = await handler.send(pending)

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
          },
        ],
      }
    },

    async remove(attachment) {
      const pending = pendingMap.get(attachment.id)

      revokeObjectUrl(attachment.id)

      if (pending) {
        await handler.remove(pending)
        pendingMap.delete(attachment.id)
      }
    },
  }
}
