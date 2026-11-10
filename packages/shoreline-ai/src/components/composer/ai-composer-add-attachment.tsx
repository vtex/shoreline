import { ComposerPrimitive } from '@assistant-ui/react'
import { IconPlus, IconButton } from '@vtex/shoreline'
import { forwardRef } from '@vtex/shoreline'

import { useComposerMessagesContext } from './composer-messages-context'
import type { AIComposerAddAttachmentProps } from './types'

/**
 * Opens the file picker and adds the chosen files. The picker offers the
 * file types the attachment handler accepts.
 *
 * @status experimental
 */
export const AIComposerAddAttachment = forwardRef<
  HTMLButtonElement,
  AIComposerAddAttachmentProps
>(function AIComposerAddAttachment(props, ref) {
  const { multiple = true, ...buttonProps } = props

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
