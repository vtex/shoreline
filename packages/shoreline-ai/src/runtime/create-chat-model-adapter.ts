/**
 * Wraps a StreamTransport as Assistant-UI ChatModelAdapter.
 */

import type {
  ChatModelAdapter,
  ChatModelRunOptions,
  ChatModelRunResult,
} from '@assistant-ui/react'

import type { AIMessagePart } from '../types/public'
import type { BuiltRuntime, RuntimeRunInput } from './types'
import {
  getLastThreadUserMessage,
  mapThreadUserMessageToAIMessage,
} from './bridge/map-from-assistant-ui'
import { mapThreadMessagesToAIMessages } from './bridge/map-thread-messages'
import {
  mapAIMessagePartsToContentParts,
  mapStreamStatus,
} from './bridge/map-to-assistant-ui'

function optionsToRunInput(
  options: ChatModelRunOptions
): RuntimeRunInput | null {
  const lastUser = getLastThreadUserMessage(options.messages)

  if (!lastUser) return null

  return {
    messages: mapThreadMessagesToAIMessages(options.messages),
    trigger: {
      type: 'message',
      message: mapThreadUserMessageToAIMessage(lastUser),
    },
    abortSignal: options.abortSignal,
    runResponseId: options.unstable_assistantMessageId ?? `asst-${Date.now()}`,
  }
}

function snapshotJson(parts: AIMessagePart[]): string {
  return JSON.stringify(parts)
}

export function createChatModelAdapterFromTransport(
  built: BuiltRuntime
): ChatModelAdapter {
  return {
    async *run(
      options: ChatModelRunOptions
    ): AsyncGenerator<ChatModelRunResult, void> {
      const input = optionsToRunInput(options)

      if (!input) {
        yield {
          content: [{ type: 'text' as const, text: '' }],
          status: { type: 'complete' as const, reason: 'stop' as const },
        }

        return
      }

      const generator = built.transport.run(input)
      let result = await generator.next()
      let lastEmittedJson = ''

      while (!result.done) {
        const snapshot = result.value
        const json = snapshotJson(snapshot.parts)

        if (json !== lastEmittedJson) {
          yield {
            content: mapAIMessagePartsToContentParts(snapshot.parts),
            status: mapStreamStatus(snapshot.status),
          }

          lastEmittedJson = json
        }

        result = await generator.next()
      }

      const final = result.value
      const finalJson = snapshotJson(final.parts)

      if (finalJson !== lastEmittedJson) {
        yield {
          content: mapAIMessagePartsToContentParts(final.parts),
          status: mapStreamStatus(final.status) ?? {
            type: 'complete' as const,
            reason: 'stop' as const,
          },
        }
      }
    },
  }
}
