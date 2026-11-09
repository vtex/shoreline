import { ThreadPrimitive } from '@assistant-ui/react'
import {
  Children,
  isValidElement,
  useCallback,
  useMemo,
  type ReactElement,
  type ReactNode,
} from 'react'
import invariant from 'tiny-invariant'
import { forwardRef } from '@vtex/shoreline'

import { useAIContextInternal } from '../provider/ai-context'
import { AIMessageAssistant } from './ai-message-assistant'
import { AIMessageUser } from './ai-message-user'
import { MessageMessagesProvider } from './message-messages-context'
import type { AIMessagesProps } from './types'

function DefaultUserMessage() {
  return <AIMessageUser />
}

function DefaultAssistantMessage(props: { showReasoningTools?: boolean }) {
  return <AIMessageAssistant showReasoningTools={props.showReasoningTools} />
}

function findChildByComponent(
  children: ReactNode,
  component: typeof AIMessageUser | typeof AIMessageAssistant,
  label: string
): ReactElement | null {
  let match: ReactElement | null = null
  let count = 0

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return

    if (child.type === component) {
      count += 1
      if (!match) {
        match = child
      }
    }
  })

  invariant(count <= 1, `AIMessages accepts at most one <${label} /> template`)

  return match
}

/**
 * Renders the full message list with default user and assistant layouts.
 *
 * @status experimental
 */
export const AIMessages = forwardRef<HTMLDivElement, AIMessagesProps>(
  function AIMessages(props, ref) {
    const { showReasoningTools = true, children, messages, ...divProps } = props

    useAIContextInternal()

    const userTemplate = useMemo(
      () => findChildByComponent(children, AIMessageUser, 'AIMessageUser'),
      [children]
    )
    const assistantTemplate = useMemo(
      () =>
        findChildByComponent(
          children,
          AIMessageAssistant,
          'AIMessageAssistant'
        ),
      [children]
    )

    const renderMessage = useCallback(
      ({ message }: { message: { role: string } }) => {
        if (message.role === 'user') {
          return userTemplate ?? <DefaultUserMessage />
        }

        if (message.role === 'assistant') {
          return (
            assistantTemplate ?? (
              <DefaultAssistantMessage
                showReasoningTools={showReasoningTools}
              />
            )
          )
        }

        return null
      },
      [assistantTemplate, showReasoningTools, userTemplate]
    )

    return (
      <MessageMessagesProvider messages={messages}>
        <div ref={ref} data-sl-ai-messages {...divProps}>
          <ThreadPrimitive.Messages>{renderMessage}</ThreadPrimitive.Messages>
        </div>
      </MessageMessagesProvider>
    )
  }
)
