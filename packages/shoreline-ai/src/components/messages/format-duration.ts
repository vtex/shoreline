function formatUnit(
  value: number,
  unit: 'hour' | 'minute' | 'second',
  locale: string
) {
  return (
    new Intl.NumberFormat(locale, {
      style: 'unit',
      unit,
      unitDisplay: 'narrow',
    })
      .format(value)
      // ICU may emit NBSP (U+00A0) or NNBSP (U+202F) before the unit; normalise to a plain space
      .replace(/[  ]/g, ' ')
  )
}

/**
 * Formats the running elapsed time in milliseconds, e.g. `1m 5s`.
 * The minimum shown value is `1s`.
 */
export function formatElapsed(ms: number, locale: string): string {
  const total = Math.max(1, Math.floor(ms / 1000))

  if (total < 60) return formatUnit(total, 'second', locale)

  if (total < 3600) {
    const minutes = Math.floor(total / 60)
    const seconds = total % 60
    const parts = [formatUnit(minutes, 'minute', locale)]

    if (seconds > 0) parts.push(formatUnit(seconds, 'second', locale))

    return parts.join(' ')
  }

  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const parts = [formatUnit(hours, 'hour', locale)]

  if (minutes > 0) parts.push(formatUnit(minutes, 'minute', locale))

  return parts.join(' ')
}

/**
 * Formats a finished reasoning duration in milliseconds as a short localized
 * string: seconds under a minute, whole rounded minutes under an hour, then
 * hours and minutes. The minimum shown value is `1s`.
 * Returns `null` for missing or invalid input.
 */
export function formatReasoningDuration(
  ms: number | undefined,
  locale: string
): string | null {
  if (ms === undefined || !Number.isFinite(ms) || ms < 0) return null

  const total = Math.max(1, Math.round(ms / 1000))

  if (total < 60) return formatUnit(total, 'second', locale)

  if (total < 3600) return formatUnit(Math.round(total / 60), 'minute', locale)

  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const parts = [formatUnit(hours, 'hour', locale)]

  if (minutes > 0) parts.push(formatUnit(minutes, 'minute', locale))

  return parts.join(' ')
}
