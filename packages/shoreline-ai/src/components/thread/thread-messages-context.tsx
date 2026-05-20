import { createContext, useContext, type ReactNode } from 'react'
import invariant from 'tiny-invariant'

import { createMessageHook } from '@vtex/shoreline'

import { messages } from './messages'
import type { AIThreadMessages } from './types'

export const useThreadMessage = createMessageHook(messages)

export type ThreadGetMessage = ReturnType<typeof useThreadMessage>

const ThreadMessagesContext = createContext<ThreadGetMessage | null>(null)

export function ThreadMessagesProvider(props: {
  messages?: AIThreadMessages
  children: ReactNode
}) {
  const getMessage = useThreadMessage(props.messages)

  return (
    <ThreadMessagesContext.Provider value={getMessage}>
      {props.children}
    </ThreadMessagesContext.Provider>
  )
}

export function useThreadMessagesContext(): ThreadGetMessage {
  const context = useContext(ThreadMessagesContext)

  invariant(
    context,
    'AIThreadScrollToBottom must be used within <AIThread> (messages context missing)'
  )

  return context
}
