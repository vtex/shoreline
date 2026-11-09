/**
 * useAIMessageParts — returns all parts of a message as typed AIMessagePart[].
 */

import { useAui, useAuiState } from '@assistant-ui/react'
import type { PartState } from '@assistant-ui/react'
import { useMemo } from 'react'

import { parseMessagePart } from '../components/messages/parser'
import type { AIMessagePart } from '../types/public'

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
