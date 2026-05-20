import { ComposerPrimitive, useAuiState } from '@assistant-ui/react'
import { IconArrowUp, IconButton } from '@vtex/shoreline'
import { forwardRef } from '@vtex/shoreline-utils'

import { useComposerMessagesContext } from './composer-messages-context'
import type { AIComposerSendProps } from './types'

/**
 * Circular send button for the composer.
 *
 * @status experimental
 */
export const AIComposerSend = forwardRef<
  HTMLButtonElement,
  AIComposerSendProps
>(function AIComposerSend(props, ref) {
  const { disabled: disabledProp, ...buttonProps } = props
  const getMessage = useComposerMessagesContext()
  const canSend = useAuiState((s) => s.composer.canSend)
  const isDisabled = disabledProp ?? !canSend

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
