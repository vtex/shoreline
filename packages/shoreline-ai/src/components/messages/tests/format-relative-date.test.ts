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
})

describe('formatRelativeDate by calendar day', () => {
  // Local-time constructors: the calendar facts hold in any timezone.
  const today = new Date(2026, 10, 25, 12, 0, 0).getTime()
  const local = (day: number, hour = 12) => new Date(2026, 10, day, hour, 0, 0)

  test('47h ago, two calendar days back, is the 2-days form', () => {
    expect(formatRelativeDate(local(23, 13), today, 'en-US')?.text).toBe(
      '2d ago'
    )
  })

  test('25h ago, one calendar day back, is "yesterday"', () => {
    expect(formatRelativeDate(local(24, 11), today, 'en-US')?.text).toBe(
      'yesterday'
    )
    expect(formatRelativeDate(local(24, 11), today, 'pt-BR')?.text).toBe(
      'ontem'
    )
  })

  test.each([
    [45, '1mo ago'],
    [59, '1mo ago'],
    [60, '2mo ago'],
    [400, '1y ago'],
    [729, '1y ago'],
  ])('%i calendar days back -> %s', (days, text) => {
    expect(formatRelativeDate(local(25 - days), today, 'en-US')?.text).toBe(
      text
    )
  })

  test('months and years always use numbers in pt-BR too', () => {
    expect(formatRelativeDate(local(25 - 45), today, 'pt-BR')?.text).toBe(
      'há 1 mês'
    )
    expect(formatRelativeDate(local(25 - 400), today, 'pt-BR')?.text).toBe(
      'há 1 ano'
    )
  })
})
