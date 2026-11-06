/**
 * The measurement a series' values are expressed in. Charts that mix units
 * (a composed chart, for instance) use it to decide which value axis a series
 * belongs to and whether its values need a `%` suffix — the consumer declares
 * what the numbers *are*, never which axis to use.
 */
export type ChartUnit = 'number' | 'percentage'

/**
 * The unit a series falls back to when none is declared.
 */
export const defaultChartUnit: ChartUnit = 'number'
