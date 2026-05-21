import type { ComponentPropsWithoutRef } from 'react'
import { MessagePartPrimitive } from '@assistant-ui/react'
import { forwardRef } from '@vtex/shoreline'

import { AIMarkdown } from './ai-markdown'
import type { AIMessageTextProps } from './types'

function MarkdownTextComponent(
  props: ComponentPropsWithoutRef<'div'> & { children?: string }
) {
  return <AIMarkdown {...props}>{props.children ?? ''}</AIMarkdown>
}

/**
 * Renders a text message part as markdown.
 *
 * @status experimental
 */
export const AIMessageText = forwardRef<HTMLDivElement, AIMessageTextProps>(
  function AIMessageText(props, ref) {
    return (
      <div ref={ref} data-sl-ai-message-text {...props}>
        <MessagePartPrimitive.Text
          smooth={false}
          component={MarkdownTextComponent}
        />
      </div>
    )
  }
)
