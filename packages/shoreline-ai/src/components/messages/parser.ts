import type { PartState } from '@assistant-ui/react'

import type {
  AIMessagePart,
  AIReasoningPart,
  AIResourcePart,
  AIToolPart,
  ToolStatus,
} from '../../types/public'

/**
 * Normalizes reasoning streaming status to `'streaming' | 'complete'`.
 */
function mapReasoningStatus(
  status: PartState['status'] | undefined
): AIReasoningPart['status'] {
  if (status?.type === 'running') {
    return 'streaming'
  }

  return 'complete'
}

/**
 * Derives tool status (`running`, `complete`, `error`) from the part state.
 */
function mapToolStatus(
  part: Extract<PartState, { type: 'tool-call' }>
): ToolStatus {
  if (part.isError) {
    return 'error'
  }

  if (part.status?.type === 'running') {
    return 'running'
  }

  return 'complete'
}

/**
 * Builds an `AIResourcePart` from an image part.
 */
function mapResourceFromImage(
  part: Extract<PartState, { type: 'image' }>
): AIResourcePart {
  return {
    type: 'resource',
    uri: part.image,
    name: part.filename ?? 'image',
    mimeType: 'image/*',
  }
}

/**
 * Builds an `AIResourcePart` from a file part.
 */
function mapResourceFromFile(
  part: Extract<PartState, { type: 'file' }>
): AIResourcePart {
  return {
    type: 'resource',
    uri: part.data,
    name: part.filename ?? 'file',
    mimeType: part.mimeType,
  }
}

/**
 * Builds an `AIResourcePart` from a data part when its name is `resource`.
 * Returns `null` for other data part names.
 */
function mapResourceFromData(
  part: Extract<PartState, { type: 'data' }>
): AIResourcePart | null {
  if (part.name !== 'resource') {
    return null
  }

  const data = part.data ?? {}

  return {
    type: 'resource',
    uri: (data.uri as string) ?? '',
    name: (data.name as string) ?? '',
    description: data.description as string | undefined,
    mimeType: data.mimeType as string | undefined,
    size: data.size as number | undefined,
    metadata: data.metadata as Record<string, unknown> | undefined,
  }
}

/**
 * Parses a raw message part into the public `AIMessagePart` model.
 * Returns `null` for unknown types or unsupported data parts.
 */
export function parseMessagePart(part: PartState): AIMessagePart | null {
  if (part.type === 'text') {
    return {
      type: 'text',
      text: part.text,
    }
  }

  if (part.type === 'reasoning') {
    return {
      type: 'reasoning',
      text: part.text,
      status: mapReasoningStatus(part.status),
    }
  }

  if (part.type === 'tool-call') {
    const metadata = part.args?.metadata as Record<string, unknown> | undefined
    const toolPart: AIToolPart = {
      type: 'tool',
      name: part.toolName,
      args: part.args ?? {},
      output: part.result,
      status: mapToolStatus(part),
      metadata,
    }

    if (part.isError) {
      toolPart.error = (part.result as { message: string }) ?? {
        message: 'Unknown error',
      }
    }

    return toolPart
  }

  if (part.type === 'image') {
    return mapResourceFromImage(part)
  }

  if (part.type === 'file') {
    return mapResourceFromFile(part)
  }

  if (part.type === 'data') {
    return mapResourceFromData(part)
  }

  return null
}
