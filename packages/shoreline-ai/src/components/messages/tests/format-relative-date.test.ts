import { describe, expect, test } from 'vitest'

import { formatRelativeDate } from '../format-relative-date'

const now = Date.UTC(2026, 10, 25, 12, 0, 0)
const at = (msAgo: number) => new Date(now - msAgo)

describe('formatRelativeDate', () => {
  test.each([
    [0, 'pt-BR', 'agora', true],
    [59_000, 'pt-BR', 'agora', true],
    [60_000, 'pt-BR', 'há 1 min.', false],
    [2 * 3_600_000, 'pt-BR', 'há 2 h', false],
    [24 * 3_600_000, 'pt-BR', 'ontem', false],
    [4 * 86_400_000, 'pt-BR', 'há 4 dias', false],
    [60_000, 'en-US', '1m ago', false],
    [0, 'en-US', 'now', true],
  ])('%i ms ago in %s -> %s', (ago, locale, text, justNow) => {
    expect(formatRelativeDate(at(ago), now, locale)).toEqual({ text, justNow })
  })

  test('a future date is "now"', () => {
    expect(formatRelativeDate(at(-120_000), now, 'en-US')).toEqual({
      text: 'now',
      justNow: true,
    })
  })

  test('an invalid date is null', () => {
    expect(formatRelativeDate(new Date('nope'), now, 'en-US')).toBeNull()
  })

  test('older than 30 days uses months, older than 365 days uses years', () => {
    expect(formatRelativeDate(at(45 * 86_400_000), now, 'en-US')?.text).toBe(
      'last mo.'
    )
    expect(formatRelativeDate(at(400 * 86_400_000), now, 'en-US')?.text).toBe(
      'last yr.'
    )
  })
})
