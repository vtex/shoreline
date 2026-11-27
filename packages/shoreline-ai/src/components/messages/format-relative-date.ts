import type { FormatMessage } from '../reasoning/format-duration'

const MINUTE = 60_000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

/** Local midnight of the day `time` (epoch ms) falls on. */
function startOfLocalDay(time: number): number {
  const date = new Date(time)

  date.setHours(0, 0, 0, 0)

  return date.getTime()
}

/** ICU may emit NBSP (U+00A0) or NNBSP (U+202F), e.g. before "PM". */
function plainSpaces(text: string): string {
  return text.replace(/[\u00A0\u202F]/g, ' ')
}

/**
 * Day, short month and time, with the year when it is not the current one.
 * The catalog pattern of the locale wins when it has one (pt-BR:
 * "12 nov, 14:32"); the day, month and year still come from `Intl`.
 */
function formatDateTime(
  date: Date,
  time: string,
  withYear: boolean,
  locale: string,
  getMessage?: FormatMessage
): string {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    ...(withYear ? { year: 'numeric' } : {}),
  }

  if (getMessage) {
    const parts = new Intl.DateTimeFormat(locale, options).formatToParts(date)
    const part = (type: Intl.DateTimeFormatPartTypes) =>
      parts.find((item) => item.type === type)?.value ?? ''
    const pattern = getMessage(withYear ? 'dateTimeYear' : 'dateTime', {
      day: part('day'),
      // Some locales abbreviate with a dot ("nov."); the pattern has its own punctuation.
      month: part('month').replace(/\.$/, ''),
      year: part('year'),
      time,
    })

    if (pattern) return pattern
  }

  return plainSpaces(
    new Intl.DateTimeFormat(locale, {
      ...options,
      hour: 'numeric',
      minute: '2-digit',
    }).format(date)
  )
}

/**
 * Formats the date of a message for a reader at `now` (epoch ms).
 * `justNow` is true under one minute (including future dates).
 * Returns `null` for an invalid date.
 *
 * - under a minute: "now"
 * - under an hour: elapsed minutes ("5m ago")
 * - same local calendar day: the time ("2:32 PM")
 * - one calendar day back: "yesterday, 2:32 PM"
 * - older: day, short month and time ("Nov 12, 2:32 PM"), with the year when
 *   it is not the current one
 *
 * Everything comes from `Intl` in the given locale. Pass `getMessage` to let
 * the catalog of the locale override a format (`minutesAgo`, `dateTime`,
 * `dateTimeYear`).
 */
export function formatRelativeDate(
  date: Date,
  now: number,
  locale: string,
  getMessage?: FormatMessage
): { text: string; justNow: boolean } | null {
  const time = date.getTime()

  if (Number.isNaN(time)) return null

  const relative = new Intl.RelativeTimeFormat(locale, {
    style: 'narrow',
    numeric: 'auto',
  })
  const diff = now - time

  if (diff < MINUTE) {
    return { text: relative.format(0, 'second'), justNow: true }
  }

  if (diff < HOUR) {
    const minutes = Math.floor(diff / MINUTE)
    const pattern = getMessage?.('minutesAgo', {
      n: new Intl.NumberFormat(locale).format(minutes),
    })

    return {
      text: pattern || relative.format(-minutes, 'minute'),
      justNow: false,
    }
  }

  const clock = plainSpaces(
    new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: '2-digit',
    }).format(date)
  )
  // Rounded: a day across a DST change lasts 23 or 25 hours.
  const days = Math.round((startOfLocalDay(now) - startOfLocalDay(time)) / DAY)

  if (days <= 0) return { text: clock, justNow: false }

  if (days === 1) {
    return { text: `${relative.format(-1, 'day')}, ${clock}`, justNow: false }
  }

  const withYear = date.getFullYear() !== new Date(now).getFullYear()

  return {
    text: formatDateTime(date, clock, withYear, locale, getMessage),
    justNow: false,
  }
}
