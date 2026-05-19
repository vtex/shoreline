/**
 * Maps Shoreline AI types to Assistant-UI thread messages.
 * Internal — used for history hydration and inbound run input.
 */

import type {
  CompleteAttachment,
  FileMessagePart,
  ThreadAssistantMessagePart,
  ToolCallMessagePart,
  ThreadMessageLike,
  ThreadUserMessage,
  ThreadUserMessagePart,
} from '@assistant-ui/react'

import type {
  AIMessage,
  AIMessagePart,
  AIResourcePart,
} from '../../types/public'

function mapResourceToFilePart(resource: AIResourcePart): FileMessagePart {
  return {
    type: 'file',
    data: resource.uri,
    mimeType: resource.mimeType ?? 'application/octet-stream',
    filename: resource.name,
  }
}

function mapAIMessagePartToUserContent(
  part: AIMessagePart
): ThreadUserMessagePart | null {
  if (part.type === 'text') {
    return { type: 'text', text: part.text }
  }

  if (part.type === 'resource') {
    return mapResourceToFilePart(part)
  }

  return null
}

function mapAIMessagePartToAssistantContent(
  part: AIMessagePart
): ThreadAssistantMessagePart | null {
  if (part.type === 'text') {
    return { type: 'text', text: part.text }
  }

  if (part.type === 'reasoning') {
    return { type: 'reasoning', text: part.text }
  }

  if (part.type === 'tool') {
    const toolCallId =
      (part.metadata?.toolCallId as string | undefined) ?? `tool-${part.name}`

    return {
      type: 'tool-call',
      toolCallId,
      toolName: part.name,
      args: part.args as ToolCallMessagePart['args'],
      argsText: JSON.stringify(part.args),
      result: part.error ?? part.output,
      isError: part.status === 'error',
    }
  }

  if (part.type === 'resource') {
    return {
      type: 'file',
      data: part.uri,
      mimeType: part.mimeType ?? 'application/octet-stream',
      filename: part.name,
    }
  }

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

    const content = message.parts
      .map(mapAIMessagePartToAssistantContent)
      .filter((part): part is ThreadAssistantMessagePart => part !== null)

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

function mapUserContentPartToAIMessagePart(
  part: ThreadUserMessagePart
): AIMessagePart | null {
  if (part.type === 'text') {
    return { type: 'text', text: part.text }
  }

  if (part.type === 'image') {
    return {
      type: 'resource',
      uri: part.image,
      name: part.filename ?? 'image',
      mimeType: 'image/*',
    }
  }

  if (part.type === 'file') {
    return {
      type: 'resource',
      uri: part.data,
      name: part.filename ?? 'file',
      mimeType: part.mimeType,
    }
  }

  return null
}

function mapAttachmentContentToResource(
  attachment: CompleteAttachment
): AIResourcePart | null {
  for (const content of attachment.content) {
    if (content.type === 'file' && content.data) {
      return {
        type: 'resource',
        uri: content.data,
        name: attachment.name,
        mimeType: content.mimeType ?? 'application/octet-stream',
      }
    }

    if (content.type === 'image') {
      return {
        type: 'resource',
        uri: content.image,
        name: attachment.name,
        mimeType: attachment.contentType ?? 'image/*',
      }
    }
  }

  return null
}

export function mapThreadUserMessageToAIMessage(
  message: ThreadUserMessage
): AIMessage {
  const parts: AIMessagePart[] = []

  for (const part of message.content) {
    const mapped = mapUserContentPartToAIMessagePart(part)

    if (mapped) {
      parts.push(mapped)
    }
  }

  for (const attachment of message.attachments ?? []) {
    const resource = mapAttachmentContentToResource(attachment)

    if (resource) {
      parts.push(resource)
    }
  }

  return {
    id: message.id,
    role: 'user',
    parts,
    createdAt: message.createdAt.toISOString(),
  }
}

export function getLastThreadUserMessage(
  messages: readonly { role: string }[]
): ThreadUserMessage | null {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index]

    if (message.role === 'user') {
      return message as ThreadUserMessage
    }
  }

  return null
}
