import type { ReactNode } from 'react'

import { AIMessageReasoningContent } from './ai-message-reasoning-content'
import { AIMessageReasoningHeader } from './ai-message-reasoning-header'
import { AIMessageReasoningRoot } from './ai-message-reasoning-root'
import type { AIMessageReasoningStatus } from './types'

export interface AIMessageReasoningGroupProps {
  status: AIMessageReasoningStatus
  /** Duration in milliseconds. */
  duration?: number
  children?: ReactNode
}

/**
 * Collapsible reasoning group: header above the content.
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
      <AIMessageReasoningHeader />
      <AIMessageReasoningContent>{children}</AIMessageReasoningContent>
    </AIMessageReasoningRoot>
  )
}
