import { type ThreadMessage, useAui, useAuiState } from '@assistant-ui/react'
import { useMemo } from 'react'

import { mapThreadMessageToAIMessage } from '../runtime/bridge/map-from-assistant-ui'
import type { AIResourcePart } from '../types/public'

function resourceParts(message: ThreadMessage): AIResourcePart[] {
  return mapThreadMessageToAIMessage(message).parts.filter(
    (part): part is AIResourcePart => part.type === 'resource'
  )
}

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
