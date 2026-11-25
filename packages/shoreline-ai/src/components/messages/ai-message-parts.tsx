import { MessagePrimitive, useAuiState } from '@assistant-ui/react'
import type { EnrichedPartState, PartState } from '@assistant-ui/react'
import { useRef } from 'react'
import { forwardRef } from '@vtex/shoreline'

import { AIMessagePartLeaf } from './ai-message-part-leaf'
import { AIMessagePartPlacementProvider } from './ai-message-part-placement-context'
import { AIMessageReasoning } from './ai-message-reasoning'
import { defaultMessageGroupBy, toolRegistry } from './default-parts'
import { parseMessagePart } from './parser'
import { ReasoningGroupProvider } from './reasoning-group-context'
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

function auiGroupBy(part: PartState) {
  const shorelinePart = parseMessagePart(part)

  if (!shorelinePart) {
    return null
  }

  return defaultMessageGroupBy(shorelinePart, { toolRegistry })
}

const defaultReasoning = <AIMessageReasoning />

/**
 * Iterates message parts with grouping and optional per-part overrides.
 * Reasoning groups render through the `reasoning` template; while the message
 * runs and has no text, reasoning or tool call yet, the template renders once
 * as a running header.
 *
 * @status experimental
 */
export const AIMessageParts = forwardRef<HTMLDivElement, AIMessagePartsProps>(
  function AIMessageParts(props, ref) {
    const {
      showReasoningTools = true,
      children: customPartRenderer,
      reasoning = defaultReasoning,
      ...divProps
    } = props

    const running = useAuiState((state) => {
      const status = state.message.status

      return status
        ? status.type === 'running'
        : state.message.isLast && state.thread.isRunning
    })

    const pending = useAuiState(
      (state) =>
        !state.message.content.some(
          (part) =>
            (part.type === 'text' && part.text.length > 0) ||
            part.type === 'reasoning' ||
            part.type === 'tool-call'
        )
    )

    // Index of the first part that opens a reasoning group, or -1.
    const firstGroupIndex = useAuiState((state) =>
      state.message.parts.findIndex(
        (part) => auiGroupBy(part)?.[0] === 'group-cot'
      )
    )

    // Set at the first running render and kept, so the elapsed time of the
    // pending header carries over to the first reasoning group.
    const startedAt = useRef<number>()
    const showPending = running && pending
    // Whether the first reasoning group took the place of the pending header.
    // Decided once, on the render the header goes away. When something else
    // ended it (text, a widget tool, the run stopping), the first group
    // counts from its own start, not from the message start.
    const pendingShown = useRef(false)
    const handedOff = useRef<boolean>()

    if (running && startedAt.current === undefined) {
      startedAt.current = Date.now()
    }

    if (showPending) {
      pendingShown.current = true
    } else if (pendingShown.current && handedOff.current === undefined) {
      handedOff.current = firstGroupIndex !== -1
    }

    return (
      <div ref={ref} data-sl-ai-message-parts {...divProps}>
        {showPending ? (
          <ReasoningGroupProvider
            status="running"
            startedAt={startedAt.current}
            parts={null}
          >
            {reasoning}
          </ReasoningGroupProvider>
        ) : null}
        <MessagePrimitive.GroupedParts groupBy={auiGroupBy}>
          {({ part, children }) => {
            if (part.type === 'group-cot') {
              return (
                <ReasoningGroupProvider
                  status={getGroupStatus(part)}
                  duration={getGroupDuration(part)}
                  startedAt={
                    handedOff.current === true &&
                    part.indices[0] === firstGroupIndex
                      ? startedAt.current
                      : undefined
                  }
                  parts={
                    <AIMessagePartPlacementProvider placement="cot">
                      {children}
                    </AIMessagePartPlacementProvider>
                  }
                >
                  {reasoning}
                </ReasoningGroupProvider>
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
