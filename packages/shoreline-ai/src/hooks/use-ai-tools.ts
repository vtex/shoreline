/**
 * useAITools — returns typed AIToolPart[] from the current message context
 * or from a specific messageId.
 */

import { useMessage, useThread } from '@assistant-ui/react'
import { useMemo } from 'react'
import type { AIToolPart, ToolStatus } from '../types/public'

interface ContentPart {
  type: string
  toolName?: string
  args?: Record<string, unknown>
  result?: unknown
  isError?: boolean
  status?: string
}

function mapToolStatus(status: string | undefined): ToolStatus {
  if (status === 'complete' || status === 'success') return 'complete'
  if (status === 'error' || status === 'incomplete') return 'error'

  return 'running'
}

function mapToolParts(content: readonly ContentPart[]): AIToolPart[] {
  return content
    .filter((part) => part.type === 'tool-call')
    .map((part) => ({
      type: 'tool' as const,
      name: part.toolName ?? '',
      args: part.args ?? {},
      output: part.result,
      error: part.isError
        ? ((part.result as { message: string }) ?? { message: 'Unknown error' })
        : undefined,
      status: mapToolStatus(part.status),
      metadata: part.args?.metadata as Record<string, unknown> | undefined,
    }))
}

export function useAITools(messageId?: string): AIToolPart[] {
  const contextMessage = useMessage({ optional: true })
  const threadState = useThread({ optional: true })

  return useMemo(() => {
    if (messageId && threadState) {
      const msg = threadState.messages.find((m) => m.id === messageId)

      if (!msg) return []

      return mapToolParts(msg.content as readonly ContentPart[])
    }

    if (contextMessage) {
      return mapToolParts(contextMessage.content as readonly ContentPart[])
    }

    return []
  }, [messageId, contextMessage, threadState])
}
