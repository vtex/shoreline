import { AttachmentPrimitive } from '@assistant-ui/react'
import {
  IconFileText,
  IconButton,
  IconXSmall,
  Spinner,
  Text,
} from '@vtex/shoreline'
import { useEffect, useState } from 'react'
import { forwardRef } from '@vtex/shoreline-utils'

import { useComposerMessagesContext } from './composer-messages-context'
import type { AIComposerAttachmentProps } from './types'
import {
  formatFileSize,
  isAttachmentError,
  isAttachmentLoading,
  isImageAttachmentType,
} from './utils'

function AIComposerAttachmentRemove() {
  const getMessage = useComposerMessagesContext()

  return (
    <AttachmentPrimitive.Remove asChild>
      <IconButton
        label={getMessage('removeAttachment')}
        variant="tertiary"
        data-sl-ai-composer-attachment-remove
      >
        <IconXSmall />
      </IconButton>
    </AttachmentPrimitive.Remove>
  )
}

/**
 * Attachment chip for the composer (image preview or file row).
 *
 * @status experimental
 */
export const AIComposerAttachment = forwardRef<
  HTMLDivElement,
  AIComposerAttachmentProps
>(function AIComposerAttachment(props, ref) {
  const { attachment, ...divProps } = props

  const isImage = isImageAttachmentType(attachment.type, attachment.contentType)
  const isLoading = isAttachmentLoading(attachment.status)
  const hasError = isAttachmentError(attachment.status)
  const file = 'file' in attachment ? attachment.file : undefined
  const attachmentType =
    attachment.type === 'document' ? 'document' : isImage ? 'image' : 'file'
  const attachmentStatus = hasError
    ? 'error'
    : isLoading
      ? 'loading'
      : 'complete'

  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (!isImage || !file || previewUrl || imageError) return

    const reader = new FileReader()
    reader.onload = (event) => {
      setPreviewUrl(event.target?.result as string)
    }
    reader.onerror = () => {
      setImageError(true)
    }
    reader.readAsDataURL(file)
  }, [isImage, file, previewUrl, imageError])

  if (isImage) {
    return (
      <AttachmentPrimitive.Root asChild>
        <div
          ref={ref}
          data-sl-ai-composer-attachment
          data-type="image"
          data-status={attachmentStatus}
          {...divProps}
        >
          <div data-sl-ai-composer-attachment-image>
            {isLoading && (
              <div data-sl-ai-composer-attachment-spinner>
                <Spinner size={20} description={attachment.name} />
              </div>
            )}
            {!isLoading && previewUrl && (
              <img src={previewUrl} alt={attachment.name} />
            )}
            <AIComposerAttachmentRemove />
          </div>
        </div>
      </AttachmentPrimitive.Root>
    )
  }

  return (
    <AttachmentPrimitive.Root asChild>
      <div
        ref={ref}
        data-sl-ai-composer-attachment
        data-type={attachmentType}
        data-status={attachmentStatus}
        {...divProps}
      >
        {isLoading && (
          <div data-sl-ai-composer-attachment-spinner>
            <Spinner size={20} description={attachment.name} />
          </div>
        )}
        {!isLoading && (
          <div data-sl-ai-composer-attachment-icon>
            <IconFileText />
          </div>
        )}
        <div data-sl-ai-composer-attachment-info>
          <Text variant="caption1" color="muted">
            {attachment.name}
          </Text>
          {file && (
            <Text variant="caption2" color="base-soft">
              {formatFileSize(file.size)}
            </Text>
          )}
        </div>
        <AIComposerAttachmentRemove />
      </div>
    </AttachmentPrimitive.Root>
  )
})
