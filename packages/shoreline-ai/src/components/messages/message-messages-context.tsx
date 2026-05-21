import { createContext, useContext, type ReactNode } from 'react'
import invariant from 'tiny-invariant'

import { createMessageHook } from '@vtex/shoreline'

import { messages } from './messages'
import type { AIMessageMessages } from './types'

export const useMessageCatalog = createMessageHook(messages)

export type MessageGetMessage = ReturnType<typeof useMessageCatalog>

const MessageMessagesContext = createContext<MessageGetMessage | null>(null)

export function MessageMessagesProvider(props: {
  messages?: AIMessageMessages
  children: ReactNode
}) {
  const getMessage = useMessageCatalog(props.messages)

  return (
    <MessageMessagesContext.Provider value={getMessage}>
      {props.children}
    </MessageMessagesContext.Provider>
  )
}

export function useMessageMessagesContext(): MessageGetMessage {
  const context = useContext(MessageMessagesContext)

  invariant(
    context,
    'AIMessage* components must be used within <AIMessages> or <MessageMessagesProvider>'
  )

  return context
}
