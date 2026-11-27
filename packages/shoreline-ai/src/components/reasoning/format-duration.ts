/** Reads a string of the message catalog; empty when the locale has none. */
export type FormatMessage = (
  id: string,
  variables?: Record<string, string | number>
) => string

type Unit = 'hour' | 'minute' | 'second'

const UNIT_KEY: Record<Unit, string> = {
  hour: 'durationHour',
  minute: 'durationMinute',
  second: 'durationSecond',
}

/**
 * One unit of a duration. The catalog pattern of the locale wins when it has
 * one (pt-BR: "40s"); every other locale gets the `Intl` narrow unit.
 */
function formatUnit(
  value: number,
  unit: Unit,
  locale: string,
  getMessage?: FormatMessage
) {
  const pattern = getMessage?.(UNIT_KEY[unit], {
    n: new Intl.NumberFormat(locale).format(value),
  })

  if (pattern) return pattern

  return (
    new Intl.NumberFormat(locale, {
      style: 'unit',
      unit,
      unitDisplay: 'narrow',
    })
      .format(value)
      // ICU may emit NBSP (U+00A0) or NNBSP (U+202F) before the unit; normalise to a plain space
      .replace(/[\u00A0\u202F]/g, ' ')
  )
}

function formatSeconds(
  total: number,
  locale: string,
  getMessage?: FormatMessage
): string {
  if (total < 60) return formatUnit(total, 'second', locale, getMessage)

  if (total < 3600) {
    const minutes = Math.floor(total / 60)
    const seconds = total % 60
    const parts = [formatUnit(minutes, 'minute', locale, getMessage)]

    if (seconds > 0) {
      parts.push(formatUnit(seconds, 'second', locale, getMessage))
    }

    return parts.join(' ')
  }

  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const parts = [formatUnit(hours, 'hour', locale, getMessage)]

  if (minutes > 0) parts.push(formatUnit(minutes, 'minute', locale, getMessage))

  return parts.join(' ')
}

/**
 * Formats the running elapsed time in milliseconds, e.g. `1m 5s`.
 * The minimum shown value is `1s`. Pass `getMessage` to let the catalog of
 * the locale override the `Intl` unit format.
 */
export function formatElapsed(
  ms: number,
  locale: string,
  getMessage?: FormatMessage
): string {
  return formatSeconds(Math.max(1, Math.floor(ms / 1000)), locale, getMessage)
}

/**
 * Formats a finished reasoning duration in milliseconds, in the same format
 * as the running counter: seconds, minutes and seconds, then hours and
 * minutes. The minimum shown value is `1s`.
 * Returns `null` for missing or invalid input.
 */
export function formatReasoningDuration(
  ms: number | undefined,
  locale: string,
  getMessage?: FormatMessage
): string | null {
  if (ms === undefined || !Number.isFinite(ms) || ms < 0) return null

  return formatSeconds(Math.max(1, Math.round(ms / 1000)), locale, getMessage)
}
