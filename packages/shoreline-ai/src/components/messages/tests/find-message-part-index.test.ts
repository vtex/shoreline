import { describe, expect, it } from 'vitest'

import { findMessagePartIndex } from '../use-message-part-index'

describe('findMessagePartIndex', () => {
  it('matches by object reference', () => {
    const textPart = { type: 'text' as const, text: 'Hello' }
    const parts = [textPart, { type: 'text' as const, text: 'World' }]

    expect(findMessagePartIndex(textPart, parts)).toBe(0)
  })

  it('matches tool-call parts by toolCallId when reference differs', () => {
    const parts = [
      {
        type: 'tool-call' as const,
        toolCallId: 'call-1',
        toolName: 'search',
        args: {},
      },
    ]
    const updatedPart = {
      type: 'tool-call' as const,
      toolCallId: 'call-1',
      toolName: 'search',
      args: { query: 'updated' },
    }

    expect(findMessagePartIndex(updatedPart, parts)).toBe(0)
  })

  it('returns -1 when no match is found', () => {
    const part = { type: 'text' as const, text: 'Missing' }
    const parts = [{ type: 'text' as const, text: 'Other' }]

    expect(findMessagePartIndex(part, parts)).toBe(-1)
  })
})
