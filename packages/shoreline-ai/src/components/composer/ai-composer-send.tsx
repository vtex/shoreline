import { ComposerPrimitive } from '@assistant-ui/react'
import { IconArrowUp, IconButton } from '@vtex/shoreline'
import { forwardRef } from '@vtex/shoreline'

import { useAIComposer } from '../../hooks/use-ai-composer'
import { useComposerMessagesContext } from './composer-messages-context'
import type { AIComposerSendProps } from './types'

/**
 * Circular send button for the composer. It is disabled while the draft is
 * empty and while an attachment failed to upload: remove the failed
 * attachment to send.
 *
 * @status experimental
 * @example
 * <AIComposerSend />
 */
export const AIComposerSend = forwardRef<
  HTMLButtonElement,
  AIComposerSendProps
>(function AIComposerSend(props, ref) {
  const { disabled: disabledProp, ...buttonProps } = props
  const getMessage = useComposerMessagesContext()
  const { disabled, attachments } = useAIComposer()
  const hasFailedAttachment = attachments.some(
    (attachment) => attachment.status === 'error'
  )
  const isDisabled = disabledProp ?? (disabled || hasFailedAttachment)

  return (
    <ComposerPrimitive.Send asChild disabled={isDisabled} {...buttonProps}>
      <IconButton
        ref={ref}
        label={getMessage('send')}
        variant={isDisabled ? 'secondary' : 'primary'}
        disabled={isDisabled}
        data-sl-ai-composer-send
      >
        <IconArrowUp />
      </IconButton>
    </ComposerPrimitive.Send>
  )
})
