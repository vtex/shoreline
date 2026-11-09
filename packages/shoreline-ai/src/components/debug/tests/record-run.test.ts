import { describe, expect, it } from '@vtex/shoreline-test-utils'

import { copySnapshot } from '../record-run'

describe('copySnapshot', () => {
  it('returns a deep copy that does not change when the original changes', () => {
    const original = {
      parts: [{ type: 'text', text: 'Hi' }],
      status: 'streaming',
    }
    const copy = copySnapshot(original) as typeof original

    original.parts[0].text = 'Changed'

    expect(copy).toEqual({
      parts: [{ type: 'text', text: 'Hi' }],
      status: 'streaming',
    })
  })

  it('does not throw on a value that structuredClone cannot copy', () => {
    const original = { parts: [], debug: { fn: () => 1, size: 2 } }

    expect(() => copySnapshot(original)).not.toThrow()
    expect(copySnapshot(original)).toMatchObject({ debug: { size: 2 } })
  })

  it('does not throw on a circular value that cannot be cloned or serialized', () => {
    const original: Record<string, unknown> = { fn: () => 1 }

    original.self = original

    expect(() => copySnapshot(original)).not.toThrow()
  })
})
