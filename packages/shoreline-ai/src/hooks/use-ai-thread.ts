/**
 * Thread-level operations and message access.
 *
 * @status experimental
 */

import { useAui, useAuiState } from '@assistant-ui/react'
import { useCallback, useMemo } from 'react'

import { useAIContextInternal } from '../components/provider/ai-context'
import { loadThreadMessages } from '../runtime/load-thread-messages'
import { mapThreadMessageToAIMessage } from '../runtime/bridge/map-from-assistant-ui'
import { mapAIMessageInputToContent } from '../runtime/map-message-input'
import type { AIMessage, AIMessageInput, AIThreadError } from '../types/public'

/**
 * Returns the messages of the active thread and the actions to send, stop,
 * switch, create and load threads. `isOpeningThread` and `error` come from
 * `threads.load` of `AIProvider`.
 *
 * @status experimental
 * @example
 * const { messages, sendMessage, switchThread } = useAIThread()
 *
 * sendMessage({ text: 'Hello' })
 */
export function useAIThread(): {
  messages: AIMessage[]
  threadId: string | null
  isOpeningThread: boolean
  error: AIThreadError | null
  isEmpty: boolean
  sendMessage: (input: AIMessageInput) => void
  stopGeneration: () => void
  switchThread: (threadId: string) => void
  createThread: () => string
  loadMessages: (messages: AIMessage[]) => void
} {
  const {
    threadId,
    openThread: switchThread,
    startThread: createThread,
    runtime,
    isOpeningThread,
    error,
  } = useAIContextInternal()
  const aui = useAui()
  const threadMessages = useAuiState((s) =>
    aui.thread.source ? s.thread.messages : []
  )

  const messages: AIMessage[] = useMemo(
    () => threadMessages.map(mapThreadMessageToAIMessage),
    [threadMessages]
  )

  const isEmpty = threadMessages.length === 0

  const sendMessage = useCallback(
    (input: AIMessageInput) => {
      if (!aui.thread.source) return

      const content = mapAIMessageInputToContent(input)

      aui.thread.append({
        role: 'user',
        content,
        startRun: true,
      })
    },
    [aui]
  )

  const stopGeneration = useCallback(() => {
    if (!aui.thread.source) return

    aui.thread.cancelRun()
  }, [aui])

  const loadMessages = useCallback(
    (history: AIMessage[]) => {
      loadThreadMessages(runtime, history)
    },
    [runtime]
  )

  return {
    messages,
    threadId,
    isOpeningThread,
    error,
    isEmpty,
    sendMessage,
    stopGeneration,
    switchThread,
    createThread,
    loadMessages,
  }
}
