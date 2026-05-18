/**
 * useAIThread — provides thread-level operations and message access.
 */

import { useThread, useThreadRuntime } from '@assistant-ui/react'
import type { ThreadMessage } from '@assistant-ui/react'
import { useCallback, useMemo } from 'react'
import type { AIMessage, AIMessageInput, AIMessagePart } from '../types/public'
import { useAIContext } from '../components/provider/ai-context'
import { generateThreadId } from '../utils/generate-id'

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

function mapMessageParts(content: readonly ContentPart[]): AIMessagePart[] {
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

function threadMessageToAIMessage(msg: ThreadMessage): AIMessage {
  return {
    id: msg.id,
    role: msg.role as 'user' | 'assistant' | 'system',
    parts: mapMessageParts(msg.content as readonly ContentPart[]),
    createdAt:
      msg.createdAt instanceof Date
        ? msg.createdAt.toISOString()
        : new Date().toISOString(),
    metadata: (msg as Record<string, unknown>).metadata as
      | Record<string, unknown>
      | undefined,
  }
}

export function useAIThread(): {
  messages: AIMessage[]
  threadId: string | null
  sendMessage: (input: AIMessageInput) => void
  stopGeneration: () => void
  switchThread: (threadId: string) => void
  createThread: () => string
} {
  const { threadId, setThreadId } = useAIContext()
  const threadState = useThread({ optional: true })
  const threadRuntime = useThreadRuntime({ optional: true })

  const messages: AIMessage[] = useMemo(() => {
    if (!threadState) return []

    return threadState.messages.map(threadMessageToAIMessage)
  }, [threadState])

  const sendMessage = useCallback(
    (input: AIMessageInput) => {
      if (!threadRuntime) return

      threadRuntime.append({
        role: 'user',
        content: [{ type: 'text' as const, text: input.text }],
      })
    },
    [threadRuntime]
  )

  const stopGeneration = useCallback(() => {
    threadRuntime?.cancelRun()
  }, [threadRuntime])

  const switchThread = useCallback(
    (newThreadId: string) => {
      setThreadId(newThreadId)
    },
    [setThreadId]
  )

  const createThread = useCallback(() => {
    const newId = generateThreadId()

    setThreadId(newId)

    return newId
  }, [setThreadId])

  return {
    messages,
    threadId,
    sendMessage,
    stopGeneration,
    switchThread,
    createThread,
  }
}
