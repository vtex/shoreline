/**
 * A row's change over the compared period, shown beside its value. Not a
 * tooltip variant: there is one tooltip, and a row renders a delta only when
 * its data supplies one — a bar chart whose series carry no `deltas` simply
 * omits it.
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
  /**
   * Position of the series the item belongs to. Identity for delta lookup is
   * positional rather than by name, because names are not required to be
   * unique and two series sharing one would otherwise resolve to the same
   * delta.
   */
  seriesIndex?: number
  /**
   * Position of the hovered category, which together with `seriesIndex`
   * identifies the one data point a delta belongs to.
   */
  dataIndex?: number
}

export interface AxisTooltipOptions {
  /**
   * Lists the rows in reverse series order. Set it when the chart paints later
   * series *before* earlier ones along the reader's axis, so that the rows,
   * read top-down, name the segments in the order they appear.
   * @default false
   */
  reverse?: boolean
  /**
   * Resolves a row's delta from the position of its series and of the category
   * it sits at, returning `undefined` where there is nothing to compare
   * against. Left unset, no row shows a delta — the case for every chart whose
   * data carries no comparison period.
   * @default undefined
   */
  getDelta?: (
    seriesIndex: number,
    dataIndex: number
  ) => ChartTooltipDelta | undefined
}

/**
 * Compiles an axis-trigger tooltip's raw item list — one item per series at
 * the hovered category — into the row model. A series with no bar at this
 * category (`null` value) drops its row instead of showing an empty value.
 *
 * The engine always hands the items over in series order; only the caller
 * knows how its own geometry maps that order onto the screen, so row order is
 * its call to make via `reverse`. Deltas come from `getDelta` for the same
 * reason: the row model knows which point a row describes, not what it should
 * be compared against.
 */
export function buildAxisTooltipData(
  items: AxisTooltipItem[],
  options: AxisTooltipOptions = {}
): ChartTooltipData {
  const { reverse, getDelta } = options

  const rows = items
    .filter(
      (item): item is AxisTooltipItem & { value: number } =>
        typeof item.value === 'number'
    )
    .map((item) => {
      const delta =
        getDelta &&
        item.seriesIndex !== undefined &&
        item.dataIndex !== undefined
          ? getDelta(item.seriesIndex, item.dataIndex)
          : undefined

      return {
        label: item.seriesName ?? '',
        value: String(item.value),
        color: item.color,
        ...(delta && { delta }),
      }
    })

  // Safe to mutate: `map` above already returned a fresh array.
  if (reverse) rows.reverse()

  // Every item in an axis trigger carries the same category name, so the
  // first one still titles the tooltip whichever way the rows run.
  return { title: items[0]?.name, rows }
}
