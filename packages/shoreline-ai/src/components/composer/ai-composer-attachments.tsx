import { ComposerPrimitive } from '@assistant-ui/react'
import { memo } from 'react'
import { forwardRef } from '@vtex/shoreline-utils'

import { AIComposerAttachment } from './ai-composer-attachment'
import type { AIComposerAttachmentsProps } from './types'

const DefaultAttachment = memo(function DefaultAttachment({
  attachment,
}: {
  attachment: Parameters<
    NonNullable<AIComposerAttachmentsProps['children']>
  >[0]['attachment']
}) {
  return <AIComposerAttachment attachment={attachment} />
})

/**
 * Lists pending composer attachments with a default chip renderer.
 *
 * @status experimental
 */
export const AIComposerAttachments = forwardRef<
  HTMLDivElement,
  AIComposerAttachmentsProps
>(function AIComposerAttachments(props, ref) {
  const { children, ...divProps } = props

  return (
    <div ref={ref} data-sl-ai-composer-attachments {...divProps}>
      <ComposerPrimitive.Attachments>
        {children ??
          (({ attachment }) => <DefaultAttachment attachment={attachment} />)}
      </ComposerPrimitive.Attachments>
    </div>
  )
})
