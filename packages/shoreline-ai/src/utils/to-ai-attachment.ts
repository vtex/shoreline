import type { Attachment } from '@assistant-ui/react'

import type { AttachmentErrorReason } from '../runtime/bridge/attachment-bridge'
import type { AIAttachment } from '../types/public'
import { formatFileSize } from './attachment-utils'

/** Looks up a composer message by id, with `{name}` placeholders. */
export type AttachmentGetMessage = (
  id: string,
  variables?: Record<string, string | number>
) => string

function reasonMessage(
  reason: AttachmentErrorReason | undefined,
  getMessage: AttachmentGetMessage
): string | undefined {
  if (!reason) return undefined

  if (reason.code === 'too-large') {
    return getMessage('attachmentTooLarge', { max: formatFileSize(reason.max) })
  }

  if (reason.code === 'too-many') {
    return getMessage('attachmentTooMany', { max: reason.max })
  }

  return getMessage('attachmentUploadFailed')
}

function toStatus(
  attachment: Attachment,
  getMessage: AttachmentGetMessage,
  reason: AttachmentErrorReason | undefined
): Pick<AIAttachment, 'status' | 'progress' | 'error'> {
  const status = attachment.status

  if (status.type === 'running') {
    return { status: 'uploading', progress: status.progress }
  }

  if (status.type === 'incomplete') {
    // A message from the handler is shown as is. Without one, the reason
    // gives a localized message.
    return status.reason === 'error'
      ? {
          status: 'error',
          error: status.message || reasonMessage(reason, getMessage),
        }
      : { status: 'uploading' }
  }

  return { status: 'ready' }
}

/**
 * Turns an engine attachment into the public attachment shape. `reason` is
 * why it failed, from the attachment errors of the runtime.
 */
export function toAIAttachment(
  attachment: Attachment,
  getMessage: AttachmentGetMessage,
  reason: AttachmentErrorReason | undefined
): AIAttachment {
  const type: AIAttachment['type'] =
    attachment.type === 'image'
      ? 'image'
      : attachment.type === 'document'
        ? 'document'
        : 'file'

  return {
    id: attachment.id,
    name: attachment.name,
    type,
    contentType: attachment.contentType,
    file: attachment.file,
    ...toStatus(attachment, getMessage, reason),
  }
}
