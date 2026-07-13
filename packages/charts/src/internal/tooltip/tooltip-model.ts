/**
 * A row's trend indicator. Bar charts never produce one today (their data
 * model carries no deltas); the type exists now because the tooltip row
 * model (title / value / variation) is shared design, per
 * design-notes/tooltip.md — a future chart with period-over-period data
 * (e.g. LineChart) renders it through the same `renderChartTooltip`.
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

/**
 * Compiles an axis-trigger tooltip's raw item list — one item per series at
 * the hovered category — into the row model. A series with no bar at this
 * category (`null` value) drops its row instead of showing an empty value.
 */
export function buildAxisTooltipData(
  items: AxisTooltipItem[]
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

  return { title: items[0]?.name, rows }
}
