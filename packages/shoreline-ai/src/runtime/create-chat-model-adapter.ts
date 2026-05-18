/**
 * Wraps a StreamTransport as Assistant-UI ChatModelAdapter.
 */

import type {
  ChatModelAdapter,
  ChatModelRunOptions,
  ChatModelRunResult,
} from '@assistant-ui/react'

import type { AIMessage } from '../types/public'
import type { BuiltRuntime, RuntimeRunInput } from './types'
import {
  mapAIMessagePartsToContentParts,
  mapStreamStatus,
} from './bridge/map-to-assistant-ui'

function optionsToRunInput(
  options: ChatModelRunOptions
): RuntimeRunInput | null {
  const lastUser = [...options.messages]
    .reverse()
    .find((m) => m.role === 'user')

  if (!lastUser) return null

  const parts: AIMessage['parts'] = []

  for (const part of lastUser.content) {
    if (part.type === 'text' && 'text' in part) {
      parts.push({ type: 'text', text: part.text })
    }
  }

  const attachments = (lastUser as Record<string, unknown>).attachments as
    | ReadonlyArray<{
        content: ReadonlyArray<{
          type: string
          data?: string
          mimeType?: string
        }>
        name?: string
      }>
    | undefined

  if (attachments) {
    for (const attachment of attachments) {
      for (const content of attachment.content) {
        if (content.type === 'file' && content.data) {
          parts.push({
            type: 'resource',
            uri: content.data,
            name: attachment.name ?? 'file',
            mimeType: content.mimeType ?? 'application/octet-stream',
          })
        }
      }
    }
  }

  return {
    messages: [
      {
        id: lastUser.id ?? 'user-msg',
        role: 'user',
        parts,
        createdAt: new Date().toISOString(),
      },
    ],
    abortSignal: options.abortSignal,
    assistantMessageId:
      options.unstable_assistantMessageId ?? `asst-${Date.now()}`,
  }
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
          status: { type: 'complete' as const },
        }

        return
      }

      const generator = built.transport.run(input)
      let result = await generator.next()

      while (!result.done) {
        const snapshot = result.value

        yield {
          content: mapAIMessagePartsToContentParts(snapshot.parts),
          status: mapStreamStatus(snapshot.status),
        }

        result = await generator.next()
      }

      const final = result.value

      yield {
        content: mapAIMessagePartsToContentParts(final.parts),
        status: mapStreamStatus(final.status) ?? { type: 'complete' as const },
      }
    },
  }
}
