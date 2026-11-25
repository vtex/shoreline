const MINUTE = 60_000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

/** Local midnight of the day `time` (epoch ms) falls on. */
function startOfLocalDay(time: number): number {
  const date = new Date(time)

  date.setHours(0, 0, 0, 0)

  return date.getTime()
}

/**
 * Formats a date relative to `now` (epoch ms) using `Intl.RelativeTimeFormat`.
 * `justNow` is true under one minute (including future dates).
 * Returns `null` for an invalid date.
 *
 * Under a day it counts elapsed minutes and hours. From 24 hours it counts
 * local calendar days, so exactly one calendar day back is "yesterday". From
 * 30 days it shows whole months (days / 30), from 365 days whole years
 * (days / 365), always with a number ("1mo ago", not "last mo.").
 */
export function formatRelativeDate(
  date: Date,
  now: number,
  locale: string
): { text: string; justNow: boolean } | null {
  const time = date.getTime()

  if (Number.isNaN(time)) return null

  const auto = new Intl.RelativeTimeFormat(locale, {
    style: 'narrow',
    numeric: 'auto',
  })
  const diff = now - time

  if (diff < MINUTE) return { text: auto.format(0, 'second'), justNow: true }

  const text = (() => {
    if (diff < HOUR) return auto.format(-Math.floor(diff / MINUTE), 'minute')
    if (diff < DAY) return auto.format(-Math.floor(diff / HOUR), 'hour')

    // Rounded: a day across a DST change lasts 23 or 25 hours.
    const days = Math.max(
      1,
      Math.round((startOfLocalDay(now) - startOfLocalDay(time)) / DAY)
    )

    if (days < 30) return auto.format(-days, 'day')

    const always = new Intl.RelativeTimeFormat(locale, {
      style: 'narrow',
      numeric: 'always',
    })

    if (days < 365) return always.format(-Math.floor(days / 30), 'month')

    return always.format(-Math.floor(days / 365), 'year')
  })()

  return { text, justNow: false }
}
