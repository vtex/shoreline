/**
 * useAIReasonings — returns typed AIReasoningPart[] from the current message context
 * or from a specific messageId.
 */

import { useAui, useAuiState } from '@assistant-ui/react'
import { useMemo } from 'react'
import type { AIReasoningPart } from '../types/public'

interface ContentPart {
  type: string
  text?: string
  metadata?: Record<string, unknown>
}

function mapReasoningParts(content: readonly ContentPart[]): AIReasoningPart[] {
  return content
    .filter((part) => part.type === 'reasoning')
    .map((part) => ({
      type: 'reasoning' as const,
      text: part.text ?? '',
      status: 'complete' as const,
      metadata: part.metadata,
    }))
}

export function useAIReasonings(messageId?: string): AIReasoningPart[] {
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

      return mapReasoningParts(msg.content as readonly ContentPart[])
    }

    if (contextMessage) {
      return mapReasoningParts(contextMessage.content as readonly ContentPart[])
    }

    return []
  }, [messageId, contextMessage, threadMessages])
}
