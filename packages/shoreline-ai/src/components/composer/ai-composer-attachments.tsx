import { ComposerPrimitive } from '@assistant-ui/react'
import { memo } from 'react'
import { forwardRef } from '@vtex/shoreline'

import type { AIAttachment } from '../../types/public'
import { AIComposerAttachment } from './ai-composer-attachment'
import { toAIAttachment } from '../../utils/to-ai-attachment'
import type { AIComposerAttachmentsProps } from './types'

const DefaultAttachment = memo(function DefaultAttachment({
  attachment,
}: {
  attachment: AIAttachment
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
        {({ attachment }) => {
          const mapped = toAIAttachment(attachment)

          return children ? (
            children({ attachment: mapped })
          ) : (
            <DefaultAttachment attachment={mapped} />
          )
        }}
      </ComposerPrimitive.Attachments>
    </div>
  )
})
