import { describe, expect, test } from 'vitest'

import { formatRelativeDate } from '../format-relative-date'
import { messages } from '../messages'

/** Reads the built-in catalog the way the message hook does. */
function catalog(locale: keyof typeof messages) {
  const strings: Record<string, string> = messages[locale]

  return (id: string, variables: Record<string, string | number> = {}) =>
    Object.entries(variables).reduce(
      (text, [key, value]) => text.split(`{${key}}`).join(String(value)),
      strings[id] ?? ''
    )
}

// Local-time constructors: the calendar facts hold in any timezone.
const now = new Date(2026, 10, 25, 16, 0, 0).getTime()
const local = (day: number, hour = 14, minute = 32, year = 2026) =>
  new Date(year, 10, day, hour, minute, 0)
const ago = (ms: number) => new Date(now - ms)

describe('formatRelativeDate in en-US (Intl only)', () => {
  const format = (date: Date) =>
    formatRelativeDate(date, now, 'en-US', catalog('en-US'))

  test.each([
    [0, 'now', true],
    [59_000, 'now', true],
    [60_000, '1m ago', false],
    [59 * 60_000, '59m ago', false],
  ])('%i ms ago -> %s', (ms, text, justNow) => {
    expect(format(ago(ms))).toEqual({ text, justNow })
  })

  test('a future date is "now"', () => {
    expect(format(ago(-120_000))).toEqual({ text: 'now', justNow: true })
  })

  test('an invalid date is null', () => {
    expect(format(new Date('nope'))).toBeNull()
  })

  test('same calendar day, an hour or more back: the time', () => {
    expect(format(local(25))?.text).toBe('2:32 PM')
  })

  test('one calendar day back: "yesterday" and the time', () => {
    expect(format(local(24))?.text).toBe('yesterday, 2:32 PM')
    // 25 hours and 47 hours back are both a matter of the calendar, not of hours.
    expect(format(local(24, 23, 30))?.text).toBe('yesterday, 11:30 PM')
  })

  test('older: day, short month and time', () => {
    expect(format(local(23, 13, 0))?.text).toBe('Nov 23, 1:00 PM')
    expect(format(local(12))?.text).toBe('Nov 12, 2:32 PM')
  })

  test('another year: the year is included', () => {
    expect(format(local(12, 14, 32, 2025))?.text).toBe('Nov 12, 2025, 2:32 PM')
  })

  test('never emits NBSP or NNBSP', () => {
    expect(format(local(12))?.text).not.toMatch(/[\u00A0\u202F]/)
  })
})

describe('formatRelativeDate in pt-BR', () => {
  const format = (date: Date) =>
    formatRelativeDate(date, now, 'pt-BR', catalog('pt-BR'))

  test('follows the catalog formats', () => {
    expect(format(ago(0))?.text).toBe('agora')
    expect(format(ago(5 * 60_000))?.text).toBe('há 5 min')
    expect(format(local(25))?.text).toBe('14:32')
    expect(format(local(24))?.text).toBe('ontem, 14:32')
    expect(format(local(12))?.text).toBe('12 nov, 14:32')
    expect(format(local(12, 14, 32, 2025))?.text).toBe('12 nov 2025, 14:32')
  })

  test('without the catalog it is the Intl format of the locale', () => {
    expect(formatRelativeDate(ago(5 * 60_000), now, 'pt-BR')?.text).toBe(
      'há 5 min.'
    )
    expect(formatRelativeDate(local(12), now, 'pt-BR')?.text).toBe(
      '12 de nov., 14:32'
    )
  })
})

describe('formatRelativeDate in a locale with no catalog', () => {
  test('es-ES gets the Intl format through an empty catalog', () => {
    const empty = () => ''

    expect(formatRelativeDate(local(12), now, 'es-ES', empty)?.text).toBe(
      '12 nov, 14:32'
    )
    expect(formatRelativeDate(local(24), now, 'es-ES', empty)?.text).toBe(
      'ayer, 14:32'
    )
  })
})
