import { type ThreadMessage, useAui, useAuiState } from '@assistant-ui/react'
import { useMemo } from 'react'

import { mapThreadMessageToAIMessage } from '../runtime/bridge/map-thread-messages'
import type { AIResourcePart } from '../types/public'

function resourceParts(message: ThreadMessage): AIResourcePart[] {
  return mapThreadMessageToAIMessage(message).parts.filter(
    (part): part is AIResourcePart => part.type === 'resource'
  )
}

/**
 * Returns the resource parts of a message: the files the user attached and the
 * resources your transport yields. Inside a message component it reads the
 * current message; pass `messageId` to read another one. Returns an empty list
 * when the message is not found.
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
      const message = threadMessages.find((item) => item.id === messageId)

      return message ? resourceParts(message) : []
    }

    if (contextMessage) {
      return resourceParts(contextMessage as ThreadMessage)
    }

    return []
  }, [messageId, contextMessage, threadMessages])
}
