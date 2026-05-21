import { useAuiState } from '@assistant-ui/react'
import type { EnrichedPartState } from '@assistant-ui/react'

import type { AIMessagePart } from '../../types/public'
import { useAIMessagePartPlacement } from './ai-message-part-placement-context'
import { renderDefaultParts, toolRegistry } from './default-parts'
import { parseMessagePart } from './parser'
import type { AIMessagePartMeta, AIMessagePartRenderer } from './types'
import { useMessagePartIndex } from './use-message-part-index'

function resolvePartMeta(
  part: AIMessagePart,
  options: {
    index: number
    placement: AIMessagePartMeta['placement']
    threadIsRunning: boolean
    messageIsLast: boolean
  }
): AIMessagePartMeta {
  const toolRegistration =
    part.type === 'tool' ? (toolRegistry.get(part.name) ?? null) : null

  let isStreaming = false

  if (part.type === 'reasoning') {
    isStreaming = part.status === 'streaming'
  } else if (part.type === 'text') {
    isStreaming = options.threadIsRunning && options.messageIsLast
  } else if (part.type === 'tool') {
    isStreaming = part.status === 'running'
  }

  return {
    index: options.index,
    isStreaming,
    placement: options.placement,
    toolRegistration,
  }
}

/** @internal */
export function AIMessagePartLeaf(props: {
  auiPart: EnrichedPartState
  showReasoningTools: boolean
  customPartRenderer?: AIMessagePartRenderer
}) {
  const { auiPart, showReasoningTools, customPartRenderer } = props
  const placement = useAIMessagePartPlacement()
  const index = useMessagePartIndex()
  const threadIsRunning = useAuiState((state) => state.thread.isRunning)
  const messageIsLast = useAuiState((state) => state.message.isLast)
  const shorelinePart = parseMessagePart(auiPart)

  if (!shorelinePart) {
    return null
  }

  const meta = resolvePartMeta(shorelinePart, {
    index,
    placement,
    threadIsRunning,
    messageIsLast,
  })

  const custom = customPartRenderer?.(shorelinePart, meta)

  if (custom !== null && custom !== undefined) {
    return custom
  }

  return renderDefaultParts(shorelinePart, meta, { showReasoningTools })
}
