import { useAui, useAuiState } from '@assistant-ui/react'
import { useMemo } from 'react'
import type { AIResourcePart } from '../types/public'

interface ContentPart {
  type: string
  name?: string
  data?: Record<string, unknown>
}

function mapResourceParts(content: readonly ContentPart[]): AIResourcePart[] {
  return content
    .filter((part) => part.type === 'data' && part.name === 'resource')
    .map((part) => {
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
    })
}

/**
 * Returns resource parts that arrive as data entries of a message. It does not
 * return the resource parts your transport yields or the files the user
 * attached: read those with `useAIMessageParts` and keep the parts whose `type`
 * is `resource`.
 *
 * @status experimental
 * @example
 * const resources = useAIResources(messageId)
 */
export function useAIResources(messageId?: string): AIResourcePart[] {
  const aui = useAui()
  const contextMessage = useAuiState((s) =>
    aui.message.source ? s.message : null
  )
  const threadMessages = useAuiState((s) =>
    aui.thread.source ? s.thread.messages : []
  )

  return useMemo(() => {
    if (messageId) {
      const msg = threadMessages.find((m) => m.id === messageId)

      if (!msg) return []

      return mapResourceParts(msg.content as readonly ContentPart[])
    }

    if (contextMessage) {
      return mapResourceParts(contextMessage.content as readonly ContentPart[])
    }

    return []
  }, [messageId, contextMessage, threadMessages])
}
