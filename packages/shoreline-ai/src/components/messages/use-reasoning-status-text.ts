import { useLocale } from '@vtex/shoreline'

import { useAIMessageReasoningRootContext } from './ai-message-reasoning-root'
import { formatReasoningDuration } from './format-duration'
import { useMessageMessagesContext } from './message-messages-context'

/**
 * Localized status text of the closest reasoning root: "Reasoning…" while
 * running, then the done text, with the duration when there is one.
 * Internal; shared by the label and the trigger.
 */
export function useReasoningStatusText(): string {
  const { state } = useAIMessageReasoningRootContext()
  const getMessage = useMessageMessagesContext()
  const locale = useLocale()

  if (state.status === 'running') return getMessage('reasoningStreaming')

  const duration = formatReasoningDuration(state.duration, locale)

  return duration
    ? getMessage('reasoningDoneIn', { duration })
    : getMessage('reasoningDone')
}
