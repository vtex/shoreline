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
})
