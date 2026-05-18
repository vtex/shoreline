/**
 * Bridges AttachmentHandler to Assistant-UI attachment adapter shape.
 */

import type { AttachmentHandler, PendingAttachment } from '../types'

function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `att-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

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

export function createAssistantAttachmentAdapter(handler: AttachmentHandler) {
  const pendingMap = new Map<string, PendingAttachment>()

  return {
    accept: '*',

    async add({ file }: { file: File }) {
      const id = generateId()
      const pending: PendingAttachment = {
        id,
        file,
        name: file.name,
        contentType: file.type,
      }

      pendingMap.set(id, pending)

      const upload = handler.add(file)
      let progress = 0

      for await (const state of upload) {
        progress = state.progress

        if (state.status === 'error') {
          throw new Error(state.error ?? 'Upload failed')
        }
      }

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
            data: URL.createObjectURL(file),
            mimeType: file.type,
          },
        ],
      }
    },

    async send(attachment: {
      id: string
      type: string
      name: string
      contentType: string
    }) {
      const pending = pendingMap.get(attachment.id)

      if (!pending) {
        throw new Error(`No pending attachment for ${attachment.id}`)
      }

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
            mimeType: resource.mimeType ?? attachment.contentType,
          },
        ],
      }
    },

    async remove(attachment: { id: string }) {
      const pending = pendingMap.get(attachment.id)

      if (pending) {
        await handler.remove(pending)
        pendingMap.delete(attachment.id)
      }
    },
  }
}
