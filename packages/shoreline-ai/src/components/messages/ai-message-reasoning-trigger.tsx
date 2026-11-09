import { Button, IconCaretDown, IconCaretUp, forwardRef } from '@vtex/shoreline'

import { useAIMessageReasoningRootContext } from './ai-message-reasoning-root'
import { useMessageMessagesContext } from './message-messages-context'
import type { AIMessageReasoningTriggerProps } from './types'

/**
 * Toggles the reasoning panel open and closed.
 *
 * @status experimental
 */
export const AIMessageReasoningTrigger = forwardRef<
  HTMLButtonElement,
  AIMessageReasoningTriggerProps
>(function AIMessageReasoningTrigger(props, ref) {
  const { label, streaming = false, ...buttonProps } = props
  const { isExpanded, setExpanded } = useAIMessageReasoningRootContext()
  const getMessage = useMessageMessagesContext()

  const resolvedLabel =
    label ?? getMessage(streaming ? 'reasoningStreaming' : 'reasoningReady')

  function handleClick() {
    setExpanded(!isExpanded)
  }

  return (
    <Button
      ref={ref}
      type="button"
      variant="tertiary"
      data-sl-ai-message-reasoning-trigger
      aria-expanded={isExpanded}
      onClick={handleClick}
      {...buttonProps}
    >
      {resolvedLabel}{' '}
      {isExpanded ? (
        <IconCaretUp data-sl-ai-message-reasoning-trigger-icon />
      ) : (
        <IconCaretDown data-sl-ai-message-reasoning-trigger-icon />
      )}
    </Button>
  )
})
