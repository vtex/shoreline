import { MessagePrimitive, useAuiState } from '@assistant-ui/react'
import type { EnrichedPartState, PartState } from '@assistant-ui/react'
import { useCallback } from 'react'
import { forwardRef } from '@vtex/shoreline'

import { AIMessagePartLeaf } from './ai-message-part-leaf'
import { AIMessagePartPlacementProvider } from './ai-message-part-placement-context'
import { AIMessageReasoningContent } from './ai-message-reasoning-content'
import { AIMessageReasoningHeader } from './ai-message-reasoning-header'
import { AIMessageReasoningRoot } from './ai-message-reasoning-root'
import { defaultMessageGroupBy, toolRegistry } from './default-parts'
import { parseMessagePart } from './parser'
import type { AIMessagePartsProps } from './types'

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

    const messageIsLast = useAuiState((state) => state.message.isLast)
    const threadIsRunning = useAuiState((state) => state.thread.isRunning)
    const streaming = messageIsLast && threadIsRunning

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
                <AIMessageReasoningRoot defaultExpanded={false}>
                  <AIMessageReasoningHeader streaming={streaming} />
                  <AIMessageReasoningContent>
                    <AIMessagePartPlacementProvider placement="cot">
                      {children}
                    </AIMessagePartPlacementProvider>
                  </AIMessageReasoningContent>
                </AIMessageReasoningRoot>
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
