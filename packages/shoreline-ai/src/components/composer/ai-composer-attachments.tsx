import { ComposerPrimitive, useAuiEvent } from '@assistant-ui/react'
import { Text, forwardRef } from '@vtex/shoreline'
import { memo, useState } from 'react'

import { getRuntimeCore } from '../../runtime/runtime-core'
import type { AIAttachment } from '../../types/public'
import { useAIContextInternal } from '../provider/ai-context'
import { AIComposerAttachment } from './ai-composer-attachment'
import { useComposerMessagesContext } from './composer-messages-context'
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
  const getMessage = useComposerMessagesContext()
  const { attachmentErrors } = getRuntimeCore(useAIContextInternal().runtime)
  const [typeRejected, setTypeRejected] = useState(false)

  // The engine refuses a file type the handler does not accept before any
  // chip exists, so the notice is the only feedback the user gets.
  useAuiEvent('composer.attachmentAddError', (event) => {
    if (event.reason === 'not-accepted') setTypeRejected(true)
  })
  useAuiEvent('composer.attachmentAdd', () => setTypeRejected(false))

  return (
    <div ref={ref} data-sl-ai-composer-attachments {...divProps}>
      <ComposerPrimitive.Attachments>
        {({ attachment }) => {
          const mapped = toAIAttachment(
            attachment,
            getMessage,
            attachmentErrors.get(attachment.id)
          )

          return children ? (
            children({ attachment: mapped })
          ) : (
            <DefaultAttachment attachment={mapped} />
          )
        }}
      </ComposerPrimitive.Attachments>
      {typeRejected && (
        <div role="alert" data-sl-ai-composer-attachments-notice>
          <Text variant="caption2" color="var(--sl-fg-critical)">
            {getMessage('attachmentTypeNotAllowed')}
          </Text>
        </div>
      )}
    </div>
  )
})
