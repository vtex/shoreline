const MINUTE = 60_000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

/**
 * Formats a date relative to `now` (epoch ms) using `Intl.RelativeTimeFormat`.
 * `justNow` is true under one minute (including future dates).
 * Returns `null` for an invalid date.
 */
export function formatRelativeDate(
  date: Date,
  now: number,
  locale: string
): { text: string; justNow: boolean } | null {
  const time = date.getTime()

  if (Number.isNaN(time)) return null

  const rtf = new Intl.RelativeTimeFormat(locale, {
    style: 'narrow',
    numeric: 'auto',
  })
  const diff = now - time

  if (diff < MINUTE) return { text: rtf.format(0, 'second'), justNow: true }

  const text = (() => {
    if (diff < HOUR) return rtf.format(-Math.floor(diff / MINUTE), 'minute')
    if (diff < DAY) return rtf.format(-Math.floor(diff / HOUR), 'hour')

    const days = Math.floor(diff / DAY)

    if (days < 30) return rtf.format(-days, 'day')
    if (days < 365) return rtf.format(-Math.floor(days / 30), 'month')

    return rtf.format(-Math.floor(days / 365), 'year')
  })()

  return { text, justNow: false }
}
