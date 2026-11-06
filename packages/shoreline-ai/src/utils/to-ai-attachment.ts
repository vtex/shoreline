import type { Attachment } from '@assistant-ui/react'

import type { AIAttachment } from '../types/public'

function toStatus(
  status: Attachment['status']
): Pick<AIAttachment, 'status' | 'progress' | 'error'> {
  if (status.type === 'running') {
    return { status: 'uploading', progress: status.progress }
  }

  if (status.type === 'incomplete') {
    return status.reason === 'error'
      ? { status: 'error', error: status.message }
      : { status: 'uploading' }
  }

  return { status: 'ready' }
}

/** Turns an engine attachment into the public attachment shape. */
export function toAIAttachment(attachment: Attachment): AIAttachment {
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
    ...toStatus(attachment.status),
  }
}
