/**
 * Maps Assistant-UI thread messages to Shoreline AIMessage types.
 * @internal
 */

import type {
  FileMessagePart,
  ImageMessagePart,
  PartProviderMetadata,
  ThreadMessage,
} from '@assistant-ui/react'

import type { AIMessage, AIMessagePart, ToolStatus } from '../../types/public'

import {
  mapFileOrImageToResource,
  mapThreadUserMessageToAIMessage,
} from './map-from-assistant-ui'
import { readExtras } from './part-extras'

interface ContentPart {
  type: string
  text?: string
  toolName?: string
  args?: Record<string, unknown>
  result?: unknown
  isError?: boolean
  providerMetadata?: PartProviderMetadata
}

export function mapContentPartsToAIMessageParts(
  content: readonly ContentPart[]
): AIMessagePart[] {
  return content
    .map((part): AIMessagePart | null => {
      const extras = readExtras(part)
      const metadata = extras.metadata as Record<string, unknown> | undefined

      if (part.type === 'text') {
        return { type: 'text', text: part.text ?? '', metadata }
      }

      if (part.type === 'reasoning') {
        return {
          type: 'reasoning',
          text: part.text ?? '',
          status: extras.status === 'streaming' ? 'streaming' : 'complete',
          metadata,
        }
      }

      if (part.type === 'tool-call') {
        const status: ToolStatus = part.isError
          ? 'error'
          : extras.status === 'running'
            ? 'running'
            : 'complete'

        return {
          type: 'tool',
          name: part.toolName ?? '',
          args: part.args ?? {},
          output: part.isError ? undefined : part.result,
          error: part.isError
            ? ((part.result as { message: string }) ?? {
                message: 'Unknown error',
              })
            : undefined,
          status,
          metadata,
        }
      }

      if (part.type === 'file' || part.type === 'image') {
        return mapFileOrImageToResource(
          part as unknown as FileMessagePart | ImageMessagePart
        )
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
