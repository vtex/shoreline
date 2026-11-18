import { describe, expect, it } from 'vitest'

import { formatReasoningDuration } from '../format-duration'

describe('formatReasoningDuration', () => {
  it('formats whole minutes', () => {
    expect(formatReasoningDuration(180_000, 'en-US')).toBe('3 min')
  })

  it('formats seconds', () => {
    expect(formatReasoningDuration(12_000, 'en-US')).toBe('12 sec')
  })

  it('joins minutes and seconds', () => {
    expect(formatReasoningDuration(90_000, 'en-US')).toBe('1 min 30 sec')
  })

  it('shows at least 1 sec', () => {
    expect(formatReasoningDuration(0, 'en-US')).toBe('1 sec')
    expect(formatReasoningDuration(400, 'en-US')).toBe('1 sec')
  })

  it('returns null for invalid input', () => {
    expect(formatReasoningDuration(undefined, 'en-US')).toBeNull()
    expect(formatReasoningDuration(Number.NaN, 'en-US')).toBeNull()
    expect(formatReasoningDuration(-5, 'en-US')).toBeNull()
    expect(
      formatReasoningDuration(Number.POSITIVE_INFINITY, 'en-US')
    ).toBeNull()
  })

  it('respects the locale', () => {
    expect(formatReasoningDuration(180_000, 'pt-BR')).toBe('3 min')
  })

  it('rounds 59.5 s up to 1 min', () => {
    expect(formatReasoningDuration(59_500, 'en-US')).toBe('1 min')
  })

  it('shows exactly one minute without a seconds part', () => {
    expect(formatReasoningDuration(60_000, 'en-US')).toBe('1 min')
  })

  it('rounds fractional milliseconds to the nearest second', () => {
    expect(formatReasoningDuration(1500.7, 'en-US')).toBe('2 sec')
  })

  it('does not throw for very large values', () => {
    expect(() => formatReasoningDuration(1e12, 'en-US')).not.toThrow()
    expect(formatReasoningDuration(1e12, 'en-US')).toEqual(expect.any(String))
  })

  it('joins minutes and seconds in pt-BR', () => {
    expect(formatReasoningDuration(90_000, 'pt-BR')).toBe('1 min 30 s')
  })
})
