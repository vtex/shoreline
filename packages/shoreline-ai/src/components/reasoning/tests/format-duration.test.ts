import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, test } from 'vitest'

import { formatElapsed, formatReasoningDuration } from '../format-duration'

describe('formatElapsed', () => {
  test.each([
    [40_000, 'en-US', '40s'],
    [65_000, 'en-US', '1m 5s'],
    [3_900_000, 'en-US', '1h 5m'],
    [40_000, 'pt-BR', '40 s'],
    [65_000, 'pt-BR', '1 min 5 s'],
    [400, 'en-US', '1s'],
  ])('formatElapsed(%i, %s) -> %s', (ms, locale, out) => {
    expect(formatElapsed(ms, locale)).toBe(out)
  })
})

describe('format-duration source', () => {
  test('spells the NBSP and NNBSP as escapes, not invisible characters', () => {
    const source = readFileSync(
      resolve(__dirname, '../format-duration.ts'),
      'utf8'
    )

    expect(source).not.toMatch(/[\u00A0\u202F]/)
    expect(source).toContain('\\u00A0')
    expect(source).toContain('\\u202F')
  })

  test('normalises both spaces to a plain space', () => {
    expect(formatElapsed(40_000, 'pt-BR')).not.toMatch(/[\u00A0\u202F]/)
  })
})

describe('formatReasoningDuration', () => {
  test.each([
    [40_000, 'pt-BR', '40 s'],
    [65_000, 'pt-BR', '1 min'],
    [125_000, 'pt-BR', '2 min'],
    [95_000, 'en-US', '2m'],
    [3_900_000, 'en-US', '1h 5m'],
    [0, 'en-US', '1s'],
    [3_570_000, 'en-US', '1h'],
    [3_599_000, 'en-US', '1h'],
    [3_569_000, 'en-US', '59m'],
  ])('formatReasoningDuration(%i, %s) -> %s', (ms, locale, out) => {
    expect(formatReasoningDuration(ms, locale)).toBe(out)
  })

  test.each([undefined, Number.NaN, -1, Number.POSITIVE_INFINITY])(
    'formatReasoningDuration(%s) -> null',
    (ms) => {
      expect(formatReasoningDuration(ms as number, 'en-US')).toBeNull()
    }
  )
})
