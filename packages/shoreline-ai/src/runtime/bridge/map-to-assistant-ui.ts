/**
 * Maps Shoreline AI message parts to Assistant-UI content parts.
 * Internal — not exported from the package barrel.
 */

import type {
  ChatModelRunResult,
  FileMessagePart,
  ImageMessagePart,
  TextMessagePart,
  ThreadAssistantMessagePart,
  ToolCallMessagePart,
} from '@assistant-ui/react'

import type {
  AIMessagePart,
  AIReasoningPart,
  AIResourcePart,
  AITextPart,
  AIToolPart,
  StreamStatus,
} from '../../types/public'

import { packExtras } from './part-extras'

export type AssistantContentPart = ThreadAssistantMessagePart

export function mapTextPart(part: AITextPart): TextMessagePart {
  return {
    type: 'text',
    text: part.text,
    ...packExtras({ metadata: part.metadata }),
  }
}

function mapReasoningPart(part: AIReasoningPart): AssistantContentPart {
  return {
    type: 'reasoning',
    text: part.text,
    ...packExtras({ status: part.status, metadata: part.metadata }),
  }
}

function mapToolPart(part: AIToolPart, index: number): AssistantContentPart {
  const toolCallId =
    (part.metadata?.toolCallId as string | undefined) ??
    `tool-${part.name}-${index}`

  return {
    type: 'tool-call',
    toolCallId,
    toolName: part.name,
    args: part.args as unknown as ToolCallMessagePart['args'],
    result: part.error ?? part.output,
    isError: part.status === 'error',
    argsText: JSON.stringify(part.args),
    ...packExtras({ status: part.status, metadata: part.metadata }),
  }
}

export function mapResourcePart(
  part: AIResourcePart
): ImageMessagePart | FileMessagePart {
  const extras = packExtras({
    mimeType: part.mimeType,
    size: part.size,
    description: part.description,
    metadata: part.metadata,
  })

  if (part.mimeType?.startsWith('image/')) {
    return {
      type: 'image',
      image: part.uri,
      filename: part.name,
      ...extras,
    }
  }

  return {
    type: 'file',
    data: part.uri,
    mimeType: part.mimeType ?? 'application/octet-stream',
    filename: part.name,
    ...extras,
  }
}

export function mapAIMessagePartsToContentParts(
  parts: AIMessagePart[]
): AssistantContentPart[] {
  const mapped: AssistantContentPart[] = []
  let toolIndex = 0

  for (const part of parts) {
    switch (part.type) {
      case 'text':
        mapped.push(mapTextPart(part))
        break
      case 'reasoning':
        mapped.push(mapReasoningPart(part))
        break
      case 'tool':
        mapped.push(mapToolPart(part, toolIndex))
        toolIndex += 1
        break
      case 'resource':
        mapped.push(mapResourcePart(part))
        break
      default:
        break
    }
  }

  return mapped
}

/** Maps Shoreline stream status to Assistant-UI message status. */
export function mapStreamStatus(
  status?: StreamStatus
): ChatModelRunResult['status'] {
  if (!status || status === 'ready') {
    return { type: 'complete', reason: 'stop' }
  }

  if (status === 'error') {
    return { type: 'incomplete', reason: 'error' }
  }

  return undefined
}
