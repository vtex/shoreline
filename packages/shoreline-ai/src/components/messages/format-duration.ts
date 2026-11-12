function formatUnit(value: number, unit: 'minute' | 'second', locale: string) {
  return new Intl.NumberFormat(locale, {
    style: 'unit',
    unit,
    unitDisplay: 'short',
  })
    .format(value)
    .replace(/[  ]/g, ' ')
}

/**
 * Formats a reasoning duration in milliseconds as a short localized string,
 * e.g. `1 min 30 sec`. The minimum shown value is `1 sec`.
 * Returns `null` for missing or invalid input.
 */
export function formatReasoningDuration(
  ms: number | undefined,
  locale: string
): string | null {
  if (ms === undefined || !Number.isFinite(ms) || ms < 0) return null

  const totalSeconds = Math.max(1, Math.round(ms / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const parts: string[] = []

  if (minutes > 0) parts.push(formatUnit(minutes, 'minute', locale))
  if (seconds > 0) parts.push(formatUnit(seconds, 'second', locale))

  return parts.join(' ')
}
