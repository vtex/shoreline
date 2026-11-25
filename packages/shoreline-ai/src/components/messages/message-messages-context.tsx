import { createContext, useContext } from 'react'
import invariant from 'tiny-invariant'

import { createMessageHook } from '@vtex/shoreline'

import { messages } from './messages'
import type { AIMessagesI18nProviderProps } from './types'

export const useMessageCatalog = createMessageHook(messages)

export type MessageGetMessage = ReturnType<typeof useMessageCatalog>

const MessageMessagesContext = createContext<MessageGetMessage | null>(null)

/**
 * Gives message pieces their localized strings. `AIMessages` mounts it for
 * you; mount it yourself to render message pieces outside `AIMessages`, for
 * example in a test. Renders no element.
 *
 * @status experimental
 * @example
 * <AIMessagesI18nProvider messages={{ copyMessage: 'Copy answer' }}>
 *   <AIMessageReasoningRoot status="complete">
 *     <AIMessageReasoningHeader />
 *   </AIMessageReasoningRoot>
 * </AIMessagesI18nProvider>
 */
export function AIMessagesI18nProvider(props: AIMessagesI18nProviderProps) {
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
    'AIMessage* components must be used within <AIMessages> or <AIMessagesI18nProvider>'
  )

  return context
}
