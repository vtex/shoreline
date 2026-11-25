import { AttachmentPrimitive } from '@assistant-ui/react'
import { IconButton, Spinner, Text } from '@vtex/shoreline'
import { useEffect, useState } from 'react'
import { forwardRef } from '@vtex/shoreline'

import { IconClear } from '../icons/icon-clear'
import { useComposerMessagesContext } from './composer-messages-context'
import type { AIComposerAttachmentProps } from './types'
import {
  formatFileSize,
  getAttachmentTag,
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
        <IconClear />
      </IconButton>
    </AttachmentPrimitive.Remove>
  )
}

/**
 * Attachment tile for the composer: an image preview, or a card with the
 * file type, name and size for any other file.
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
          title={attachment.name}
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

  const tag = getAttachmentTag(attachment.name)

  return (
    <AttachmentPrimitive.Root asChild>
      <div
        ref={ref}
        data-sl-ai-composer-attachment
        data-type={attachmentType}
        data-status={attachmentStatus}
        title={attachment.name}
        {...divProps}
      >
        <div data-sl-ai-composer-attachment-card>
          <div data-sl-ai-composer-attachment-head>
            <span data-sl-ai-composer-attachment-tag data-tone={tag.tone}>
              {tag.label}
            </span>
            {isLoading && (
              <AIComposerAttachmentProgress
                name={attachment.name}
                percent={percent}
              />
            )}
          </div>
          <div data-sl-ai-composer-attachment-foot>
            <span data-sl-ai-composer-attachment-title>{attachment.name}</span>
            {!isLoading && file && (
              <span data-sl-ai-composer-attachment-size>
                {formatFileSize(file.size)}
              </span>
            )}
          </div>
        </div>
        {/* Visually hidden: progress and error text stay available to screen readers. */}
        <div data-sl-ai-composer-attachment-info>
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
        </div>
        <AIComposerAttachmentRemove />
      </div>
    </AttachmentPrimitive.Root>
  )
})
