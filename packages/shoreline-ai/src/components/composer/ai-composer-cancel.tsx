import { ComposerPrimitive } from '@assistant-ui/react'
import { IconButton } from '@vtex/shoreline'
import { forwardRef } from '@vtex/shoreline-utils'

import { IconSquareFill } from '../icons/icon-square-fill'
import { useComposerMessagesContext } from './composer-messages-context'
import type { AIComposerCancelProps } from './types'

/**
 * Stop button for an in-flight assistant run.
 *
 * @status experimental
 */
export const AIComposerCancel = forwardRef<
  HTMLButtonElement,
  AIComposerCancelProps
>(function AIComposerCancel(props, ref) {
  const getMessage = useComposerMessagesContext()

  return (
    <ComposerPrimitive.Cancel asChild {...props}>
      <IconButton
        ref={ref}
        label={getMessage('cancel')}
        variant="secondary"
        data-sl-ai-composer-cancel
      >
        <IconSquareFill />
      </IconButton>
    </ComposerPrimitive.Cancel>
  )
})
