/**
 * Maps Shoreline AI messages and parts to the engine. Internal — not
 * exported from the package barrel. The other direction lives in
 * `map-from-assistant-ui.ts`.
 */

import type {
  ChatModelRunResult,
  FileMessagePart,
  ImageMessagePart,
  TextMessagePart,
  ThreadAssistantMessagePart,
  ThreadMessageLike,
  ThreadUserMessagePart,
  ToolCallMessagePart,
} from '@assistant-ui/react'

import type {
  AIMessage,
  AIMessagePart,
  AIReasoningPart,
  AIResourcePart,
  AITextPart,
  AIToolPart,
  StreamStatus,
} from '../../types/public'

import { packExtras } from './part-extras'

export type AssistantContentPart = ThreadAssistantMessagePart

function mapTextPart(part: AITextPart): TextMessagePart {
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

function mapResourcePart(
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

function mapAIMessagePartToUserContent(
  part: AIMessagePart
): ThreadUserMessagePart | null {
  if (part.type === 'text') return mapTextPart(part)

  if (part.type === 'resource') return mapResourcePart(part)

  return null
}

export function mapAIMessagesToThreadMessages(
  messages: AIMessage[]
): ThreadMessageLike[] {
  return messages.map((message) => {
    if (message.role === 'user') {
      const content = message.parts
        .map(mapAIMessagePartToUserContent)
        .filter((part): part is ThreadUserMessagePart => part !== null)

      return {
        id: message.id,
        role: 'user',
        content: content.length > 0 ? content : [{ type: 'text', text: '' }],
        createdAt: new Date(message.createdAt),
        attachments: [],
      }
    }

    if (message.role === 'system') {
      const text = message.parts
        .filter((part) => part.type === 'text')
        .map((part) => (part.type === 'text' ? part.text : ''))
        .join('')

      return {
        id: message.id,
        role: 'system',
        content: [{ type: 'text', text }],
        createdAt: new Date(message.createdAt),
      }
    }

    const content = mapAIMessagePartsToContentParts(message.parts)

    const threadMessage: ThreadMessageLike = {
      id: message.id,
      role: 'assistant',
      content: content.length > 0 ? content : [{ type: 'text', text: '' }],
      createdAt: new Date(message.createdAt),
      status: { type: 'complete', reason: 'stop' },
    }

    return threadMessage
  })
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
