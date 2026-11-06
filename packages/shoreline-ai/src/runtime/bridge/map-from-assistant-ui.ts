/**
 * Maps Shoreline AI types to Assistant-UI thread messages.
 * Internal — used for history hydration and inbound run input.
 */

import type {
  CompleteAttachment,
  FileMessagePart,
  ImageMessagePart,
  ThreadMessageLike,
  ThreadUserMessage,
  ThreadUserMessagePart,
} from '@assistant-ui/react'

import type {
  AIMessage,
  AIMessagePart,
  AIResourcePart,
} from '../../types/public'

import { readExtras } from './part-extras'
import {
  mapAIMessagePartsToContentParts,
  mapResourcePart,
  mapTextPart,
} from './map-to-assistant-ui'

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

/** Turns an engine file or image part back into a resource part. */
export function mapFileOrImageToResource(
  part: FileMessagePart | ImageMessagePart
): AIResourcePart {
  const extras = readExtras(part)
  const isImage = part.type === 'image'

  return {
    type: 'resource',
    uri: isImage ? part.image : part.data,
    name: part.filename ?? (isImage ? 'image' : 'file'),
    mimeType:
      (extras.mimeType as string | undefined) ??
      (isImage ? 'image/*' : part.mimeType),
    description: extras.description as string | undefined,
    size: extras.size as number | undefined,
    metadata: extras.metadata as Record<string, unknown> | undefined,
  }
}

function mapUserContentPartToAIMessagePart(
  part: ThreadUserMessagePart
): AIMessagePart | null {
  if (part.type === 'text') {
    return {
      type: 'text',
      text: part.text,
      metadata: readExtras(part).metadata as
        | Record<string, unknown>
        | undefined,
    }
  }

  if (part.type === 'image' || part.type === 'file') {
    return mapFileOrImageToResource(part)
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
