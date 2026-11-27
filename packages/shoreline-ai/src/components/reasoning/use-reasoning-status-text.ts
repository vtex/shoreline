import { useLocale } from '@vtex/shoreline'

import { useAIReasoningRootContext } from './ai-reasoning-root'
import { formatReasoningDuration } from './format-duration'
import { useMessageMessagesContext } from '../messages/message-messages-context'

/**
 * Localized status text of the closest reasoning root: "Thinking…" while
 * running, then the done text, with the duration when there is one.
 * Internal; shared by the label and the trigger.
 */
export function useReasoningStatusText(): string {
  const { state } = useAIReasoningRootContext()
  const getMessage = useMessageMessagesContext()
  const locale = useLocale()

  if (state.status === 'running') return getMessage('reasoningStreaming')

  const duration = formatReasoningDuration(state.duration, locale, getMessage)

  return duration
    ? getMessage('reasoningDoneIn', { duration })
    : getMessage('reasoningDone')
}
