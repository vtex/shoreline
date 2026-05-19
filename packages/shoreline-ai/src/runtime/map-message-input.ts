/**
 * Maps AIMessageInput parts to Assistant-UI user message content.
 * @internal
 */

import type { ThreadUserMessagePart } from '@assistant-ui/react'

import type { AIMessageInput, AIMessageInputPart } from '../types/public'

export function normalizeAIMessageInput(
  input: AIMessageInput
): AIMessageInputPart[] {
  if ('parts' in input && input.parts) {
    return input.parts
  }

  if ('text' in input) {
    return [{ type: 'text', text: input.text }]
  }

  return []
}

export function mapAIMessageInputPartToContent(
  part: AIMessageInputPart
): ThreadUserMessagePart | null {
  if (part.type === 'text') {
    return { type: 'text', text: part.text }
  }

  if (part.type === 'file') {
    return {
      type: 'file',
      data: part.uri,
      mimeType: part.mimeType ?? 'application/octet-stream',
      filename: part.name,
    }
  }

  if (part.type === 'image') {
    return {
      type: 'image',
      image: part.uri,
      filename: part.name ?? 'image',
    }
  }

  return null
}

export function mapAIMessageInputToContent(
  input: AIMessageInput
): ThreadUserMessagePart[] {
  const parts = normalizeAIMessageInput(input)
    .map(mapAIMessageInputPartToContent)
    .filter((part): part is ThreadUserMessagePart => part !== null)

  return parts.length > 0 ? parts : [{ type: 'text', text: '' }]
}
