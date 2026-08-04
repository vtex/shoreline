/**
 * A row's change over the compared period, shown beside its value. Not a
 * tooltip variant: there is one tooltip, and a row renders a delta only when
 * its data carries one, so charts whose data model has no deltas — every bar
 * chart today — simply omit it.
 */
export interface ChartTooltipDelta {
  /**
   * The change, already formatted by the caller, who therefore picks the unit:
   * `'12.4%'` for a ratio, `'2.3 pp'` for a move in percentage points. Being a
   * string is also why `direction` can't be inferred — the sign is gone.
   */
  value: string
  /**
   * Which way the value moved. Factual, and independent of `tone`; `'flat'`
   * renders no arrow.
   */
  direction: 'up' | 'down' | 'flat'
  /**
   * Whether that movement reads as good, bad, or neither — semantic, and
   * independent of `direction`, because a decrease is not inherently bad:
   * falling mortality is `direction: 'down'` with `tone: 'success'`. Left
   * alone, a delta stays uncolored rather than guessing from the sign.
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
  delta?: ChartTooltipDelta
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
