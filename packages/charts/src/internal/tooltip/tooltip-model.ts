/**
 * A row's trend indicator. Bar charts never produce one today (their data
 * model carries no deltas); the type exists now because the tooltip row
 * model (title / value / variation) is shared design — a future chart with
 * period-over-period data (e.g. LineChart) renders it through the same
 * `renderChartTooltip`.
 */
export interface ChartTooltipVariation {
  /**
   * Formatted variation value, e.g. `'12.4%'`.
   */
  value: string
  /**
   * Arrow direction. `'flat'` renders no arrow.
   */
  direction: 'up' | 'down' | 'flat'
  /**
   * Semantic color of the value and arrow.
   * @default 'neutral'
   */
  tone?: 'success' | 'critical' | 'neutral'
}

export interface ChartTooltipRow {
  label: string
  value: string
  /**
   * Series color swatch rendered as the row's left line.
   */
  color?: string
  variation?: ChartTooltipVariation
}

export interface ChartTooltipData {
  title?: string
  rows: ChartTooltipRow[]
}

export interface AxisTooltipItem {
  /**
   * The hovered category's label, shared by every item in an axis-trigger
   * tooltip.
   */
  name?: string
  seriesName?: string
  value: number | null | undefined
  color?: string
}

export interface AxisTooltipOptions {
  /**
   * Lists the rows in reverse series order. Set it when the chart paints later
   * series *before* earlier ones along the reader's axis, so that the rows,
   * read top-down, name the segments in the order they appear.
   * @default false
   */
  reverse?: boolean
}

/**
 * Compiles an axis-trigger tooltip's raw item list — one item per series at
 * the hovered category — into the row model. A series with no bar at this
 * category (`null` value) drops its row instead of showing an empty value.
 *
 * The engine always hands the items over in series order; only the caller
 * knows how its own geometry maps that order onto the screen, so row order is
 * its call to make via `reverse`.
 */
export function buildAxisTooltipData(
  items: AxisTooltipItem[],
  options: AxisTooltipOptions = {}
): ChartTooltipData {
  const rows = items
    .filter(
      (item): item is AxisTooltipItem & { value: number } =>
        typeof item.value === 'number'
    )
    .map((item) => ({
      label: item.seriesName ?? '',
      value: String(item.value),
      color: item.color,
    }))

  // Safe to mutate: `map` above already returned a fresh array.
  if (options.reverse) rows.reverse()

  // Every item in an axis trigger carries the same category name, so the
  // first one still titles the tooltip whichever way the rows run.
  return { title: items[0]?.name, rows }
}
