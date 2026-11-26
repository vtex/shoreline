import type { AIAttachment } from '../types/public'

export function formatFileSize(size: number | string | undefined): string {
  if (size === undefined) return ''

  const bytes = typeof size === 'string' ? Number(size) : size

  if (!Number.isFinite(bytes) || bytes < 0) return ''

  if (bytes < 1024) return `${bytes} B`

  const kb = bytes / 1024

  if (kb < 1024) return `${kb.toFixed(1)} KB`

  const mb = kb / 1024

  return `${mb.toFixed(1)} MB`
}

export function isImageMimeType(mimeType?: string): boolean {
  return Boolean(mimeType?.startsWith('image/'))
}

export function isImageAttachmentType(
  type: string,
  contentType?: string
): boolean {
  if (type === 'image') return true

  return isImageMimeType(contentType)
}

export function isAttachmentLoading(status: AIAttachment['status']): boolean {
  return status === 'uploading'
}

export function isAttachmentError(status: AIAttachment['status']): boolean {
  return status === 'error'
}

export type AttachmentTagTone = 'red' | 'blue' | 'green' | 'orange' | 'gray'

const DOCUMENT_TAGS: Record<
  string,
  { label: string; tone: AttachmentTagTone }
> = {
  pdf: { label: 'PDF', tone: 'red' },
  docx: { label: 'DOCX', tone: 'blue' },
  doc: { label: 'DOC', tone: 'blue' },
  xlsx: { label: 'XLSX', tone: 'green' },
  xls: { label: 'XLS', tone: 'green' },
  csv: { label: 'CSV', tone: 'orange' },
}

/**
 * Label and color tone of the type tag on a file card, from the file name's
 * extension. Unknown extensions show the extension itself; no extension shows
 * `FILE`.
 */
export function getAttachmentTag(name: string): {
  label: string
  tone: AttachmentTagTone
} {
  const extension = name.includes('.') ? (name.split('.').pop() ?? '') : ''

  return (
    DOCUMENT_TAGS[extension.toLowerCase()] ?? {
      label: extension.toUpperCase() || 'FILE',
      tone: 'gray',
    }
  )
}
