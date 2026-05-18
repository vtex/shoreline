/**
 * useAIMessageParts — returns all parts of a message as typed AIMessagePart[].
 */

import { useMessage, useThread } from '@assistant-ui/react'
import { useMemo } from 'react'
import type { AIMessagePart } from '../types/public'

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

function mapParts(content: readonly ContentPart[]): AIMessagePart[] {
  return content
    .map((part): AIMessagePart | null => {
      if (part.type === 'text') {
        return {
          type: 'text' as const,
          text: part.text ?? '',
          metadata: part.metadata,
        }
      }

      if (part.type === 'reasoning') {
        return {
          type: 'reasoning' as const,
          text: part.text ?? '',
          status: 'complete' as const,
          metadata: part.metadata,
        }
      }

      if (part.type === 'tool-call') {
        return {
          type: 'tool' as const,
          name: part.toolName ?? '',
          args: part.args ?? {},
          output: part.result,
          error: part.isError
            ? ((part.result as { message: string }) ?? {
                message: 'Unknown error',
              })
            : undefined,
          status: part.isError ? ('error' as const) : ('complete' as const),
          metadata: part.args?.metadata as Record<string, unknown> | undefined,
        }
      }

      if (part.type === 'data' && part.name === 'resource') {
        const data = part.data ?? {}

        return {
          type: 'resource' as const,
          uri: (data.uri as string) ?? '',
          name: (data.name as string) ?? '',
          description: data.description as string | undefined,
          mimeType: data.mimeType as string | undefined,
          size: data.size as number | undefined,
          metadata: data.metadata as Record<string, unknown> | undefined,
        }
      }

      return null
    })
    .filter((p): p is AIMessagePart => p !== null)
}

export function useAIMessageParts(messageId?: string): AIMessagePart[] {
  const contextMessage = useMessage({ optional: true })
  const threadState = useThread({ optional: true })

  return useMemo(() => {
    if (messageId && threadState) {
      const msg = threadState.messages.find((m) => m.id === messageId)

      if (!msg) return []

      return mapParts(msg.content as readonly ContentPart[])
    }

    if (contextMessage) {
      return mapParts(contextMessage.content as readonly ContentPart[])
    }

    return []
  }, [messageId, contextMessage, threadState])
}
