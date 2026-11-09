import { Flex, forwardRef } from '@vtex/shoreline'
import type { ComponentPropsWithoutRef } from 'react'

import { AIDotsLoader } from './ai-dots-loader'
import { AIMessageReasoningTrigger } from './ai-message-reasoning-trigger'

export interface AIMessageReasoningHeaderOptions {
  /** Whether the assistant is still generating the current message. */
  streaming?: boolean
}

export type AIMessageReasoningHeaderProps = AIMessageReasoningHeaderOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'children'>

/**
 * Collapsible reasoning panel header with trigger label and streaming dots.
 *
 * @status experimental
 */
export const AIMessageReasoningHeader = forwardRef<
  HTMLDivElement,
  AIMessageReasoningHeaderProps
>(function AIMessageReasoningHeader(props, ref) {
  const { streaming = false, ...divProps } = props

  return (
    <Flex
      ref={ref}
      align="center"
      data-sl-ai-message-reasoning-header
      {...divProps}
    >
      <AIMessageReasoningTrigger streaming={streaming} />
      {streaming ? <AIDotsLoader /> : null}
    </Flex>
  )
})
