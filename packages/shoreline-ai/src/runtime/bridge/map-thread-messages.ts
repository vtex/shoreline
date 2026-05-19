/**
 * Maps Assistant-UI thread messages to Shoreline AIMessage types.
 * @internal
 */

import type { ThreadMessage } from '@assistant-ui/react'

import type { AIMessage, AIMessagePart } from '../../types/public'

import { mapThreadUserMessageToAIMessage } from './map-from-assistant-ui'

interface ContentPart {
  type: string
  text?: string
  toolName?: string
  args?: Record<string, unknown>
  result?: unknown
  isError?: boolean
  name?: string
  data?: Record<string, unknown>
  metadata?: Record<string, unknown>
}

export function mapContentPartsToAIMessageParts(
  content: readonly ContentPart[]
): AIMessagePart[] {
  return content
    .map((part): AIMessagePart | null => {
      if (part.type === 'text') {
        return {
          type: 'text',
          text: part.text ?? '',
          metadata: part.metadata,
        }
      }

      if (part.type === 'reasoning') {
        return {
          type: 'reasoning',
          text: part.text ?? '',
          status: 'complete',
          metadata: part.metadata,
        }
      }

      if (part.type === 'tool-call') {
        return {
          type: 'tool',
          name: part.toolName ?? '',
          args: part.args ?? {},
          output: part.result,
          error: part.isError
            ? ((part.result as { message: string }) ?? {
                message: 'Unknown error',
              })
            : undefined,
          status: part.isError ? 'error' : 'complete',
          metadata: part.metadata,
        }
      }

      if (part.type === 'data' && part.name === 'resource') {
        const data = part.data ?? {}

        return {
          type: 'resource',
          uri: (data.uri as string) ?? '',
          name: (data.name as string) ?? '',
          description: data.description as string | undefined,
          mimeType: data.mimeType as string | undefined,
          size: data.size as number | undefined,
          metadata: data.metadata as Record<string, unknown> | undefined,
        }
      }

      if (part.type === 'file') {
        return {
          type: 'resource',
          uri: (part as ContentPart & { data?: string }).data ?? '',
          name:
            (part as ContentPart & { filename?: string }).filename ?? 'file',
          mimeType: (part as ContentPart & { mimeType?: string }).mimeType,
        }
      }

      if (part.type === 'image') {
        return {
          type: 'resource',
          uri: (part as ContentPart & { image?: string }).image ?? '',
          name:
            (part as ContentPart & { filename?: string }).filename ?? 'image',
          mimeType: 'image/*',
        }
      }

      return null
    })
    .filter((p): p is AIMessagePart => p !== null)
}

export function mapThreadMessageToAIMessage(message: ThreadMessage): AIMessage {
  if (message.role === 'user') {
    return mapThreadUserMessageToAIMessage(message)
  }

  return {
    id: message.id,
    role: message.role as 'assistant' | 'system',
    parts: mapContentPartsToAIMessageParts(
      message.content as readonly ContentPart[]
    ),
    createdAt:
      message.createdAt instanceof Date
        ? message.createdAt.toISOString()
        : new Date().toISOString(),
    metadata: (message as Record<string, unknown>).metadata as
      | Record<string, unknown>
      | undefined,
  }
}

export function mapThreadMessagesToAIMessages(
  messages: readonly ThreadMessage[]
): AIMessage[] {
  return messages.map(mapThreadMessageToAIMessage)
}
