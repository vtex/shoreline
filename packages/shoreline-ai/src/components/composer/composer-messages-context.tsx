import { createContext, useContext, type ReactNode } from 'react'
import invariant from 'tiny-invariant'

import { createMessageHook } from '@vtex/shoreline'

import { messages } from './messages'
import type { AIComposerMessages } from './types'

export const useComposerMessage = createMessageHook(messages)

export type ComposerGetMessage = ReturnType<typeof useComposerMessage>

const ComposerMessagesContext = createContext<ComposerGetMessage | null>(null)

export function ComposerMessagesProvider(props: {
  messages?: AIComposerMessages
  children: ReactNode
}) {
  const getMessage = useComposerMessage(props.messages)

  return (
    <ComposerMessagesContext.Provider value={getMessage}>
      {props.children}
    </ComposerMessagesContext.Provider>
  )
}

export function useComposerMessagesContext(): ComposerGetMessage {
  const context = useContext(ComposerMessagesContext)

  invariant(
    context,
    'AIComposer* components must be used within <AIComposer> (messages context missing)'
  )

  return context
}
