/**
 * useAIResources — returns typed AIResourcePart[] from the current message context
 * or from a specific messageId. Extracts data-resource parts.
 */

import { useMessage, useThread } from '@assistant-ui/react'
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

export function useAIResources(messageId?: string): AIResourcePart[] {
  const contextMessage = useMessage({ optional: true })
  const threadState = useThread({ optional: true })

  return useMemo(() => {
    if (messageId && threadState) {
      const msg = threadState.messages.find((m) => m.id === messageId)

      if (!msg) return []

      return mapResourceParts(msg.content as readonly ContentPart[])
    }

    if (contextMessage) {
      return mapResourceParts(contextMessage.content as readonly ContentPart[])
    }

    return []
  }, [messageId, contextMessage, threadState])
}
