import type { ChartTooltipDelta } from '../tooltip'
import { chartSeriesTokens } from '../theme'

/**
 * The series shape every chart shares: a named array of values with optional
 * tooltip deltas. Each public chart owns its own series type
 * (`BarChartSeries`, `LineChartSeries`, …) with its own JSDoc, and each is
 * structurally compatible with this one so the shared logic below applies to
 * all of them.
 */
export interface ChartSeries {
  name: string
  data: Array<number | null>
  deltas?: Array<ChartTooltipDelta | null>
}

/**
 * Hard ceiling on rendered series, set by the palette itself: there are only
 * this many designed colors and they are never cycled, so no chart can show
 * more distinct series than this regardless of what `maxSeries` asks for.
 */
export const seriesLimit = chartSeriesTokens.length

/**
 * Default number of rendered series: the primary and secondary series plus the
 * aggregate in the tertiary color.
 */
export const defaultMaxSeries = 3

/**
 * Folds the tail of `series` into a single aggregate so that no more than
 * `maxSeries` series render, keeping every value represented instead of
 * dropping data. Requests above `seriesLimit` clamp to it, because past that
 * point the palette has no color left to tell series apart.
 *
 * The aggregate takes the last rendered slot, so it wears that slot's color —
 * the tertiary color at the default `maxSeries`.
 *
 * Values are summed per category. A null contributes nothing, and a category
 * where every folded series is null stays null, so the aggregate renders no
 * bar rather than a spurious zero.
 *
 * The aggregate carries no deltas: they arrive already formatted, so there is
 * no sound way to combine those of the series it replaces. Series that keep
 * their own slot keep their own deltas.
 */
export function collapseSeries(
  series: ChartSeries[],
  othersLabel: string,
  maxSeries: number
): ChartSeries[] {
  // A fractional or non-finite request would otherwise slice unpredictably.
  const limit = Math.min(Math.max(Math.floor(maxSeries) || 1, 1), seriesLimit)

  if (series.length <= limit) return series

  // The aggregate occupies the last slot, so one fewer series keeps its name.
  const rest = series.slice(limit - 1)
  const length = Math.max(...rest.map((item) => item.data.length))

  const data = Array.from({ length }, (_, index) =>
    rest.reduce<number | null>((sum, item) => {
      const value = item.data[index]

      return value === null || value === undefined ? sum : (sum ?? 0) + value
    }, null)
  )

  return [...series.slice(0, limit - 1), { name: othersLabel, data }]
}

/**
 * Builds a positional delta lookup from a series list: the tooltip calls it
 * with the series and category positions the engine reports, and it returns
 * the delta for that data point or `undefined` when there is nothing to
 * compare against.
 *
 * Returns `undefined` entirely when no series carries deltas, so the tooltip
 * skips the lookup for the common case. Identity is positional rather than by
 * name, because names are not required to be unique and two series sharing one
 * would otherwise resolve to the same delta.
 */
export function createDeltaLookup(
  series: ChartSeries[]
):
  | ((seriesIndex: number, dataIndex: number) => ChartTooltipDelta | undefined)
  | undefined {
  const deltasBySeries = series.map((item) => item.deltas)

  if (!deltasBySeries.some(Boolean)) return undefined

  return (seriesIndex, dataIndex) =>
    deltasBySeries[seriesIndex]?.[dataIndex] ?? undefined
}
