/**
 * Maps Shoreline AI message parts to Assistant-UI content parts.
 * Internal — not exported from the package barrel.
 */

import type { ChatModelRunResult } from '@assistant-ui/react'

import type {
  AIMessagePart,
  AIReasoningPart,
  AIResourcePart,
  AITextPart,
  AIToolPart,
  StreamStatus,
} from '../../types/public'

export type AssistantContentPart = ChatModelRunResult['content'][number]

function mapTextPart(part: AITextPart): AssistantContentPart {
  return { type: 'text', text: part.text }
}

function mapReasoningPart(part: AIReasoningPart): AssistantContentPart {
  return { type: 'reasoning', text: part.text }
}

function mapToolPart(part: AIToolPart, index: number): AssistantContentPart {
  const toolCallId =
    (part.metadata?.toolCallId as string | undefined) ??
    `tool-${part.name}-${index}`

  return {
    type: 'tool-call',
    toolCallId,
    toolName: part.name,
    args: part.metadata ? { ...part.args, metadata: part.metadata } : part.args,
    result: part.error ?? part.output,
    isError: part.status === 'error',
    argsText: JSON.stringify(part.args),
  }
}

function mapResourcePart(part: AIResourcePart): AssistantContentPart {
  return {
    type: 'data',
    name: 'resource',
    data: {
      uri: part.uri,
      name: part.name,
      description: part.description,
      mimeType: part.mimeType,
      size: part.size,
      metadata: part.metadata,
    },
  }
}

export function mapAIMessagePartsToContentParts(
  parts: AIMessagePart[]
): AssistantContentPart[] {
  let toolIndex = 0

  return parts.map((part) => {
    switch (part.type) {
      case 'text':
        return mapTextPart(part)
      case 'reasoning':
        return mapReasoningPart(part)
      case 'tool':
        return mapToolPart(part, toolIndex++)
      case 'resource':
        return mapResourcePart(part)
      default:
        return { type: 'text', text: '' }
    }
  })
}

export function mapStreamStatus(
  status?: StreamStatus
): ChatModelRunResult['status'] {
  if (!status || status === 'ready') {
    return { type: 'complete' }
  }

  if (status === 'error') {
    return { type: 'incomplete', reason: 'error' }
  }

  return undefined
}
