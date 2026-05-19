/**
 * Thread-level operations and message access.
 *
 * @status experimental
 */

import { useAui, useAuiState } from '@assistant-ui/react'
import { useCallback, useMemo } from 'react'

import { useAIContextInternal } from '../components/provider/ai-context'
import { loadThreadMessages } from '../runtime/load-thread-messages'
import { mapThreadMessageToAIMessage } from '../runtime/bridge/map-thread-messages'
import { mapAIMessageInputToContent } from '../runtime/map-message-input'
import type { AIMessage, AIMessageInput, AIThreadError } from '../types/public'
import { generateThreadId } from '../utils/generate-id'

export function useAIThread(): {
  messages: AIMessage[]
  threadId: string | null
  isOpeningThread: boolean
  error: AIThreadError | null
  sendMessage: (input: AIMessageInput) => void
  stopGeneration: () => void
  switchThread: (threadId: string) => void
  createThread: () => string
  loadMessages: (messages: AIMessage[]) => void
} {
  const { threadId, setThreadId, runtime, isOpeningThread, error } =
    useAIContextInternal()
  const aui = useAui()
  const threadMessages = useAuiState((s) =>
    aui.thread.source ? s.thread.messages : []
  )

  const messages: AIMessage[] = useMemo(
    () => threadMessages.map(mapThreadMessageToAIMessage),
    [threadMessages]
  )

  const sendMessage = useCallback(
    (input: AIMessageInput) => {
      if (!aui.thread.source) return

      const content = mapAIMessageInputToContent(input)

      aui.thread().append({
        role: 'user',
        content,
      })
    },
    [aui]
  )

  const stopGeneration = useCallback(() => {
    if (!aui.thread.source) return

    aui.thread().cancelRun()
  }, [aui])

  const loadMessages = useCallback(
    (history: AIMessage[]) => {
      loadThreadMessages(runtime, history)
    },
    [runtime]
  )

  const switchThread = useCallback(
    (newThreadId: string) => {
      if (aui.thread.source) {
        aui.thread().cancelRun()
      }

      if (newThreadId === threadId) return

      runtime.thread.reset([])
      setThreadId(newThreadId)
    },
    [aui, runtime, setThreadId, threadId]
  )

  const createThread = useCallback(() => {
    const newId = generateThreadId()

    if (aui.thread.source) {
      aui.thread().cancelRun()
    }

    runtime.thread.reset([])
    setThreadId(newId)

    return newId
  }, [aui, runtime, setThreadId])

  return {
    messages,
    threadId,
    isOpeningThread,
    error,
    sendMessage,
    stopGeneration,
    switchThread,
    createThread,
    loadMessages,
  }
}
