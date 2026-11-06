import { describe, expect, it } from '@vtex/shoreline-test-utils'

import type { AIMessagePart } from '../../../types/public'
import { diffSnapshot } from '../record-run'

describe('diffSnapshot', () => {
  it('marks a new part as added and a grown text part as updated with its delta', () => {
    const prev: AIMessagePart[] = [{ type: 'text', text: 'Hel' }]
    const next: AIMessagePart[] = [
      { type: 'text', text: 'Hello' },
      { type: 'tool', name: 'search', args: {}, status: 'running' },
    ]

    expect(diffSnapshot(prev, next)).toEqual([
      { partIndex: 0, type: 'text', kind: 'updated', delta: 'lo' },
      { partIndex: 1, type: 'tool', kind: 'added' },
    ])
  })

  it('keeps stream order of parts', () => {
    const next: AIMessagePart[] = [
      { type: 'reasoning', text: 'Thinking', status: 'complete' },
      { type: 'text', text: 'Answer' },
    ]

    expect(diffSnapshot([], next)).toEqual([
      { partIndex: 0, type: 'reasoning', kind: 'added', delta: 'Thinking' },
      { partIndex: 1, type: 'text', kind: 'added', delta: 'Answer' },
    ])
    expect(diffSnapshot(next, next)).toEqual([])
  })
})
