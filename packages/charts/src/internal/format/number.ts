/**
 * Formats a chart number the way the reader's locale writes numbers.
 */
export type NumberFormatter = (value: number) => string

/**
 * Builds the formatter charts use for their numeric output — value-axis ticks
 * and tooltip values. `Intl.NumberFormat` decides the grouping separator and
 * the decimal mark, so the same value reads `3,100` in en-US and `3.100` in
 * pt-BR; without it the engine writes every chart in its own fixed locale.
 */
export function createNumberFormatter(locale: string): NumberFormatter {
  const formatter = new Intl.NumberFormat(locale)

  return (value) => formatter.format(value)
}
