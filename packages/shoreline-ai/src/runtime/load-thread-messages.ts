import type { AIMessage } from '../types/public'
import type { AIRuntime } from '../types/runtime'
import { mapAIMessagesToThreadMessages } from './bridge/map-from-assistant-ui'

/**
 * Replaces the current thread messages with the given history.
 *
 * @param runtime - Assistant runtime from `useRuntime` / `useAIContext`
 * @param messages - Messages in Shoreline `AIMessage` shape
 */
export function loadThreadMessages(
  runtime: AIRuntime,
  messages: AIMessage[]
): void {
  runtime.thread.reset(mapAIMessagesToThreadMessages(messages))
}
