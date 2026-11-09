import { useAui, useAuiState } from '@assistant-ui/react'
import type { PartState } from '@assistant-ui/react'
import { useMemo } from 'react'

import { parseMessagePart } from '../components/messages/parser'
import type { AIMessagePart } from '../types/public'

/**
 * Returns the content parts of a message. Inside a message component it reads
 * the current message; pass `messageId` to read another one. Files attached to
 * a user message are not content parts: use `useAIResources` for them.
 *
 * @status experimental
 * @example
 * const parts = useAIMessageParts(messageId)
 */
export function useAIMessageParts(messageId?: string): AIMessagePart[] {
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

      return mapMessageContent(msg.content as readonly PartState[])
    }

    if (contextMessage) {
      return mapMessageContent(contextMessage.content as readonly PartState[])
    }

    return []
  }, [messageId, contextMessage, threadMessages])
}

function mapMessageContent(content: readonly PartState[]): AIMessagePart[] {
  return content
    .map((part) => parseMessagePart(part))
    .filter((part): part is AIMessagePart => part !== null)
}
