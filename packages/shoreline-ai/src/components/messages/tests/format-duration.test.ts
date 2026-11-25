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

describe('formatReasoningDuration', () => {
  test.each([
    [40_000, 'pt-BR', '40 s'],
    [65_000, 'pt-BR', '1 min'],
    [125_000, 'pt-BR', '2 min'],
    [95_000, 'en-US', '2m'],
    [3_900_000, 'en-US', '1h 5m'],
    [0, 'en-US', '1s'],
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
