import { Flex } from '@vtex/shoreline'
import type { ReactNode } from 'react'

import { AIMessageReasoningContent } from './ai-message-reasoning-content'
import { AIMessageReasoningMeta } from './ai-message-reasoning-meta'
import { AIMessageReasoningRoot } from './ai-message-reasoning-root'
import { AIMessageReasoningTrigger } from './ai-message-reasoning-trigger'
import type { AIMessageReasoningStatus } from './types'

export interface AIMessageReasoningGroupProps {
  status: AIMessageReasoningStatus
  /** Duration in milliseconds. */
  duration?: number
  children?: ReactNode
}

/**
 * Collapsible reasoning group: trigger and meta row above the content.
 * Internal composition used by AIMessageParts; not part of the public API.
 *
 * @status experimental
 */
export function AIMessageReasoningGroup(props: AIMessageReasoningGroupProps) {
  const { status, duration, children } = props

  return (
    <AIMessageReasoningRoot
      defaultExpanded={false}
      status={status}
      duration={duration}
    >
      <Flex align="center" data-sl-ai-message-reasoning-row>
        <AIMessageReasoningTrigger />
        <AIMessageReasoningMeta />
      </Flex>
      <AIMessageReasoningContent>{children}</AIMessageReasoningContent>
    </AIMessageReasoningRoot>
  )
}
