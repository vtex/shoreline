import { ComposerPrimitive } from '@assistant-ui/react'
import { IconPlus, IconButton } from '@vtex/shoreline'
import { forwardRef } from '@vtex/shoreline-utils'

import { useComposerMessagesContext } from './composer-messages-context'
import type { AIComposerAddAttachmentProps } from './types'

/**
 * Opens the file picker and adds attachments via the runtime adapter.
 *
 * @status experimental
 */
export const AIComposerAddAttachment = forwardRef<
  HTMLButtonElement,
  AIComposerAddAttachmentProps
>(function AIComposerAddAttachment(props, ref) {
  const { accept: _accept = '*/*', multiple = true, ...buttonProps } = props

  const getMessage = useComposerMessagesContext()

  return (
    <ComposerPrimitive.AddAttachment asChild multiple={multiple}>
      <IconButton
        ref={ref}
        label={getMessage('addAttachment')}
        variant="tertiary"
        data-sl-ai-composer-add-attachment
        {...buttonProps}
      >
        <IconPlus />
      </IconButton>
    </ComposerPrimitive.AddAttachment>
  )
})
