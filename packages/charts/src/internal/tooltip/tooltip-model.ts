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
   * Lists only the first `reverseUpTo` rows in reverse series order, leaving
   * the rest in order. The mixed case of a composed chart: its stacked bars
   * are painted bottom-up, while the lines drawn after them keep the series
   * order.
   * @default undefined
   */
  reverseUpTo?: number
  /**
   * Adds a row summing the first `seriesCount` series at the hovered category
   * — the question a stacked bar poses, which the reader would otherwise
   * answer by adding the segments up. It closes the group it sums, so it lands
   * after those series' rows, reversed or not.
   *
   * Positions come from the items' `seriesIndex`; without it the row is
   * appended last. A category where every summed series is `null` gets no
   * total: zero would claim the stack is there, empty.
   * @default undefined
   */
  total?: { label: string; seriesCount: number }
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
 * its call to make via `reverse` / `reverseUpTo`. Deltas come from `getDelta`
 * for the same reason: the row model knows which point a row describes, not
 * what it should be compared against.
 */
export function buildAxisTooltipData(
  items: AxisTooltipItem[],
  options: AxisTooltipOptions = {}
): ChartTooltipData {
  const { reverse, reverseUpTo, total, getDelta } = options

  const entries: Array<{ item: AxisTooltipItem; row: ChartTooltipRow }> = items
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
        item,
        row: {
          label: item.seriesName ?? '',
          value: String(item.value),
          color: item.color,
          ...(delta && { delta }),
        },
      }
    })

  const reverseCount = reverse ? entries.length : (reverseUpTo ?? 0)
  const ordered = [
    ...entries.slice(0, reverseCount).reverse(),
    ...entries.slice(reverseCount),
  ]

  if (total) {
    // Summed in series order, so a gap cannot shift which series the count
    // covers — only what it contributes.
    const sum = items.reduce<number | null>(
      (acc, item, index) =>
        index < total.seriesCount && typeof item.value === 'number'
          ? (acc ?? 0) + item.value
          : acc,
      null
    )

    if (sum !== null) {
      let lastSummed = -1

      ordered.forEach(({ item }, position) => {
        if (
          item.seriesIndex !== undefined &&
          item.seriesIndex < total.seriesCount
        ) {
          lastSummed = position
        }
      })

      ordered.splice(lastSummed + 1, 0, {
        item: { value: sum },
        row: { label: total.label, value: String(sum) },
      })
    }
  }

  // Every item in an axis trigger carries the same category name, so the
  // first one still titles the tooltip whichever way the rows run.
  return { title: items[0]?.name, rows: ordered.map(({ row }) => row) }
}
