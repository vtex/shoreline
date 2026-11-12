import { MessagePrimitive } from '@assistant-ui/react'
import type { EnrichedPartState, PartState } from '@assistant-ui/react'
import { useCallback } from 'react'
import { forwardRef } from '@vtex/shoreline'

import { AIMessagePartLeaf } from './ai-message-part-leaf'
import { AIMessagePartPlacementProvider } from './ai-message-part-placement-context'
import { AIMessageReasoningGroup } from './ai-message-reasoning-group'
import { defaultMessageGroupBy, toolRegistry } from './default-parts'
import { parseMessagePart } from './parser'
import type { AIMessagePartsProps, AIMessageReasoningStatus } from './types'

type GroupPartLike = { status?: { type?: string }; timing?: unknown }

export function getGroupStatus(part: GroupPartLike): AIMessageReasoningStatus {
  return part.status?.type === 'running' ? 'running' : 'complete'
}

/** Reads the group duration (ms) defensively; undefined unless a finite number >= 0. */
export function getGroupDuration(part: GroupPartLike): number | undefined {
  const { timing } = part

  return typeof timing === 'number' && Number.isFinite(timing) && timing >= 0
    ? timing
    : undefined
}

/**
 * Iterates message parts with grouping and optional per-part overrides.
 *
 * @status experimental
 */
export const AIMessageParts = forwardRef<HTMLDivElement, AIMessagePartsProps>(
  function AIMessageParts(props, ref) {
    const {
      showReasoningTools = true,
      children: customPartRenderer,
      ...divProps
    } = props

    const auiGroupBy = useCallback((part: PartState) => {
      const shorelinePart = parseMessagePart(part)

      if (!shorelinePart) {
        return null
      }

      return defaultMessageGroupBy(shorelinePart, { toolRegistry })
    }, [])

    return (
      <div ref={ref} data-sl-ai-message-parts {...divProps}>
        <MessagePrimitive.GroupedParts groupBy={auiGroupBy}>
          {({ part, children }) => {
            if (part.type === 'group-cot') {
              return (
                <AIMessageReasoningGroup
                  status={getGroupStatus(part)}
                  duration={getGroupDuration(part)}
                >
                  <AIMessagePartPlacementProvider placement="cot">
                    {children}
                  </AIMessagePartPlacementProvider>
                </AIMessageReasoningGroup>
              )
            }

            return (
              <AIMessagePartLeaf
                auiPart={part as EnrichedPartState}
                showReasoningTools={showReasoningTools}
                customPartRenderer={customPartRenderer}
              />
            )
          }}
        </MessagePrimitive.GroupedParts>
      </div>
    )
  }
)
