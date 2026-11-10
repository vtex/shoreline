/**
 * Maps engine thread messages and parts to Shoreline AI types. Internal —
 * used for the run input and for the messages the hooks return. The other
 * direction lives in `map-to-assistant-ui.ts`.
 */

import type {
  CompleteAttachment,
  FileMessagePart,
  ImageMessagePart,
  ThreadAssistantMessagePart,
  ThreadMessage,
  ThreadUserMessage,
  ThreadUserMessagePart,
} from '@assistant-ui/react'

import type {
  AIMessage,
  AIMessagePart,
  AIResourcePart,
  ToolStatus,
} from '../../types/public'

import { readExtras } from './part-extras'

/**
 * Turns an engine file or image part into a resource part. This is the only
 * place resource parts are built from the engine.
 *
 * The MIME type is the one stored with the part when it came from a resource
 * part. Otherwise it is the `mimeType` of a file, or `image/*` for an image.
 * The name is `name` when given (the name of an attachment), else the file
 * name of the part, else `image` or `file`.
 */
function mapFileOrImageToResource(
  part: FileMessagePart | ImageMessagePart,
  name?: string
): AIResourcePart {
  const extras = readExtras(part)
  const isImage = part.type === 'image'

  return {
    type: 'resource',
    uri: isImage ? part.image : part.data,
    name: name ?? part.filename ?? (isImage ? 'image' : 'file'),
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
    if ((content.type === 'file' && content.data) || content.type === 'image') {
      return mapFileOrImageToResource(content, attachment.name)
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

function mapContentPartsToAIMessageParts(
  content: readonly ThreadAssistantMessagePart[]
): AIMessagePart[] {
  return content
    .map((part): AIMessagePart | null => {
      const extras = readExtras(part)
      const metadata = extras.metadata as Record<string, unknown> | undefined

      if (part.type === 'text') {
        return { type: 'text', text: part.text, metadata }
      }

      if (part.type === 'reasoning') {
        return {
          type: 'reasoning',
          text: part.text,
          status: extras.status === 'streaming' ? 'streaming' : 'complete',
          metadata,
        }
      }

      if (part.type === 'tool-call') {
        const status: ToolStatus = part.isError
          ? 'error'
          : extras.status === 'running'
            ? 'running'
            : 'complete'

        return {
          type: 'tool',
          name: part.toolName,
          args: part.args ?? {},
          output: part.isError ? undefined : part.result,
          error: part.isError
            ? ((part.result as { message: string }) ?? {
                message: 'Unknown error',
              })
            : undefined,
          status,
          metadata,
        }
      }

      if (part.type === 'file' || part.type === 'image') {
        return mapFileOrImageToResource(part)
      }

      return null
    })
    .filter((p): p is AIMessagePart => p !== null)
}

export function mapThreadMessageToAIMessage(message: ThreadMessage): AIMessage {
  if (message.role === 'user') {
    return mapThreadUserMessageToAIMessage(message)
  }

  return {
    id: message.id,
    role: message.role,
    parts: mapContentPartsToAIMessageParts(message.content),
    createdAt:
      message.createdAt instanceof Date
        ? message.createdAt.toISOString()
        : new Date().toISOString(),
    metadata: message.metadata,
  }
}

export function mapThreadMessagesToAIMessages(
  messages: readonly ThreadMessage[]
): AIMessage[] {
  return messages.map(mapThreadMessageToAIMessage)
}
