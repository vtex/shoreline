import { AttachmentPrimitive } from '@assistant-ui/react'
import {
  IconFileText,
  IconButton,
  IconXSmall,
  Spinner,
  Text,
} from '@vtex/shoreline'
import { useEffect, useState } from 'react'
import { forwardRef } from '@vtex/shoreline'

import { useComposerMessagesContext } from './composer-messages-context'
import type { AIComposerAttachmentProps } from './types'
import {
  formatFileSize,
  isAttachmentError,
  isAttachmentLoading,
  isImageAttachmentType,
} from './utils'

function AIComposerAttachmentProgress(props: {
  name: string
  percent: number
}) {
  return (
    // biome-ignore lint/a11y/useFocusableInteractive: a progress bar is read-only and is not focusable
    <div
      role="progressbar"
      aria-label={props.name}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={props.percent}
      data-sl-ai-composer-attachment-progress
    >
      <Spinner size={20} />
    </div>
  )
}

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
 * @example
 * <AIComposerAttachments>
 *   {({ attachment }) => <AIComposerAttachment attachment={attachment} />}
 * </AIComposerAttachments>
 */
export const AIComposerAttachment = forwardRef<
  HTMLDivElement,
  AIComposerAttachmentProps
>(function AIComposerAttachment(props, ref) {
  const { attachment, ...divProps } = props

  const isImage = isImageAttachmentType(attachment.type, attachment.contentType)
  const isLoading = isAttachmentLoading(attachment.status)
  const hasError = isAttachmentError(attachment.status)
  const file = attachment.file
  const percent = Math.round((attachment.progress ?? 0) * 100)
  // A failed image uses the file row, so the message has room and no preview
  // suggests the upload worked.
  const showPreview = isImage && !hasError
  const attachmentType =
    attachment.type === 'document' ? 'document' : showPreview ? 'image' : 'file'
  const attachmentStatus = hasError
    ? 'error'
    : isLoading
      ? 'loading'
      : 'complete'

  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (!showPreview || !file || previewUrl || imageError) return

    const reader = new FileReader()
    reader.onload = (event) => {
      setPreviewUrl(event.target?.result as string)
    }
    reader.onerror = () => {
      setImageError(true)
    }
    reader.readAsDataURL(file)
  }, [showPreview, file, previewUrl, imageError])

  if (showPreview) {
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
              <AIComposerAttachmentProgress
                name={attachment.name}
                percent={percent}
              />
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
          <AIComposerAttachmentProgress
            name={attachment.name}
            percent={percent}
          />
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
          {isLoading && (
            <Text variant="caption2" color="base-soft">
              {`${percent}%`}
            </Text>
          )}
          {hasError && (
            <div role="alert">
              <Text variant="caption2" color="var(--sl-fg-critical)">
                {attachment.error}
              </Text>
            </div>
          )}
          {!isLoading && !hasError && file && (
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
