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

export function isAttachmentLoading(
  status: { type: string; reason?: string } | undefined
): boolean {
  return status?.type === 'running' && status.reason === 'uploading'
}

export function isAttachmentError(
  status: { type: string; reason?: string } | undefined
): boolean {
  return status?.type === 'incomplete' && status.reason === 'error'
}
