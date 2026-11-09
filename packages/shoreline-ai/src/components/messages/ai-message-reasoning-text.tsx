import type { ComponentPropsWithoutRef } from 'react'
import { MessagePartPrimitive } from '@assistant-ui/react'
import { Text, forwardRef } from '@vtex/shoreline'

import { AIMarkdown } from './ai-markdown'
import type { AIMessageReasoningTextProps } from './types'

function ReasoningMarkdownComponent(
  props: ComponentPropsWithoutRef<'div'> & { children?: string }
) {
  return <AIMarkdown {...props}>{props.children ?? ''}</AIMarkdown>
}

/**
 * Renders a reasoning step through markdown.
 *
 * @status experimental
 */
export const AIMessageReasoningText = forwardRef<
  HTMLDivElement,
  AIMessageReasoningTextProps
>(function AIMessageReasoningText(props, ref) {
  return (
    <Text
      ref={ref}
      as="div"
      variant="caption2"
      color="base-soft"
      data-sl-ai-message-reasoning-text
      {...props}
    >
      <MessagePartPrimitive.Text
        smooth={false}
        component={ReasoningMarkdownComponent}
      />
    </Text>
  )
})
