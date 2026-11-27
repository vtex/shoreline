import type { ComponentPropsWithoutRef } from 'react'
import { MessagePartPrimitive } from '@assistant-ui/react'
import { Text, forwardRef } from '@vtex/shoreline'

import { AIMarkdown } from '../messages/ai-markdown'
import type { AIReasoningTextProps } from './types'

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
export const AIReasoningText = forwardRef<HTMLDivElement, AIReasoningTextProps>(
  function AIReasoningText(props, ref) {
    return (
      <Text
        ref={ref}
        as="div"
        variant="caption2"
        color="base-soft"
        data-sl-ai-reasoning-text
        {...props}
      >
        <MessagePartPrimitive.Text
          smooth={false}
          component={ReasoningMarkdownComponent}
        />
      </Text>
    )
  }
)
