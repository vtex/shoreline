import { forwardRef } from '@vtex/shoreline'

import { useAIStatus } from '../../hooks/use-ai-status'
import { AIComposerCancel } from './ai-composer-cancel'
import { AIComposerSend } from './ai-composer-send'
import type { AIComposerActionProps } from './types'

/**
 * Toggles between send and cancel based on whether a run is active.
 *
 * @status experimental
 */
export const AIComposerAction = forwardRef<
  HTMLButtonElement,
  AIComposerActionProps
>(function AIComposerAction(props, ref) {
  const { isLoading } = useAIStatus()

  if (isLoading) {
    return <AIComposerCancel ref={ref} {...props} />
  }

  return <AIComposerSend ref={ref} {...props} />
})
