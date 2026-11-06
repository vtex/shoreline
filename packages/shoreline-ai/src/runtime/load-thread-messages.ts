import type { AIMessage } from '../types/public'
import type { AIRuntime } from '../types/runtime'
import { unwrapRuntime } from './unwrap-runtime'
import { mapAIMessagesToThreadMessages } from './bridge/map-from-assistant-ui'

/**
 * Replaces the current thread messages with the given history.
 *
 * @param runtime - Runtime from `useRuntime` / `useAIContext`
 * @param messages - Messages in Shoreline `AIMessage` shape
 */
export function loadThreadMessages(
  runtime: AIRuntime,
  messages: AIMessage[]
): void {
  unwrapRuntime(runtime).thread.reset(mapAIMessagesToThreadMessages(messages))
}
