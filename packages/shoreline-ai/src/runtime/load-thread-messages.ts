import type { AIMessage } from '../types/public'
import type { AIRuntime } from '../types/runtime'
import { getRuntimeCore } from './runtime-core'
import { mapAIMessagesToThreadMessages } from './bridge/map-to-assistant-ui'

/**
 * Replaces the current thread messages with the given history.
 *
 * @status experimental
 * @param runtime - Runtime from `useRuntime` / `useAIContext`
 * @param messages - Messages in Shoreline `AIMessage` shape
 * @example
 * loadThreadMessages(runtime, historyMessages)
 */
export function loadThreadMessages(
  runtime: AIRuntime,
  messages: AIMessage[]
): void {
  getRuntimeCore(runtime).engine.thread.reset(
    mapAIMessagesToThreadMessages(messages)
  )
}
