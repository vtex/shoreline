import type { ChartTokens } from '../theme'
import type { ChartTooltipDelta } from '../tooltip'
import { createAxisTooltipFormatter, createTooltipPositioner } from '../tooltip'
import type { ChartUnit } from '../unit'

// Shared design-token constants used by every chart's option.
const spaceSmall = '--sl-space-2'
const spaceLegend = '--sl-space-10'
// Design spec, positioning: 8px between the hovered point and the tooltip
const tooltipOffsetToken = '--sl-space-2'
const tooltipOffsetFallback = 8
// Design spec, axis labels: percentages read with a trailing sign, not as raw
// ratios.
const percentageSuffix = '%'

/**
 * Percentage value-axis labels, e.g. `25` reads as `25%`.
 */
function percentageAxisLabel(value: number): string {
  return `${value}${percentageSuffix}`
}

/**
 * The axis pointer shape our charts use: a shadow band (bar) or a guide line
 * (line/area). Typed narrowly so the engine's option union doesn't leak into
 * the shared builders.
 */
export type ChartAxisPointer =
  | { type: 'shadow'; shadowStyle?: { color?: string } }
  | { type: 'line'; lineStyle?: { color?: string } }

/**
 * Legend shown only for multiple series, bottom left, per the design spec.
 */
export function buildLegend(seriesCount: number) {
  return { show: seriesCount > 1, left: 0, bottom: 0 }
}

/**
 * Chart grid with label containment and token-driven padding. The bottom
 * padding grows to make room for the legend when one is shown.
 */
export function buildGrid(args: { tokens: ChartTokens; showLegend: boolean }) {
  const { tokens, showLegend } = args

  return {
    containLabel: true,
    left: tokens.px(spaceSmall),
    right: tokens.px(spaceSmall),
    top: tokens.px(spaceSmall),
    bottom: tokens.px(showLegend ? spaceLegend : spaceSmall),
  }
}

/**
 * Category axis carrying the chart's labels in render order.
 */
export function buildCategoryAxis(categories: string[]) {
  return { type: 'category', data: categories }
}

/**
 * Value axis for the numeric dimension. A percentage axis formats its labels
 * with a `%` suffix; the default leaves the engine's plain numeric labels
 * untouched, so single-unit charts keep their existing output.
 */
export function buildValueAxis(options: { unit?: ChartUnit } = {}) {
  const { unit } = options

  if (unit === 'percentage') {
    return { type: 'value', axisLabel: { formatter: percentageAxisLabel } }
  }

  return { type: 'value' }
}

/**
 * Shared axis-trigger tooltip envelope: the formatter, position, and DOM
 * rendering are the same across charts; only the axis pointer (shadow vs line)
 * and the row order vary, so those are the caller's to supply. Visuals come
 * entirely from the formatter's markup + `tooltip.css`
 * (`data-sl-chart-tooltip*`), not from the engine's tooltip container.
 */
export function buildAxisTooltip(args: {
  tokens: ChartTokens
  axisPointer: ChartAxisPointer
  /**
   * Lists the rows in reverse series order. Set it when the chart paints later
   * series before earlier ones along the reader's axis.
   * @default false
   */
  reverse?: boolean
  /**
   * Resolves a row's delta from the position of its series and category.
   * @default undefined
   */
  getDelta?: (
    seriesIndex: number,
    dataIndex: number
  ) => ChartTooltipDelta | undefined
  /**
   * Resolves a row's unit from the position of its series, so percentage rows
   * can format their value with a `%` suffix. Left unset, every row renders
   * its plain numeric value.
   * @default undefined
   */
  getUnit?: (seriesIndex: number) => ChartUnit | undefined
}) {
  const { tokens, axisPointer, reverse, getDelta, getUnit } = args

  return {
    trigger: 'axis',
    axisPointer,
    // The tooltip is allowed to overflow the chart. `confine` would push it
    // back inside the chart bounds, and leaving the element inside the chart
    // container lets any `overflow: hidden` ancestor clip it — so it renders
    // on `body` instead, above whatever the chart sits in.
    confine: false,
    appendTo: 'body',
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    extraCssText: 'box-shadow: none;',
    formatter: createAxisTooltipFormatter({ reverse, getDelta, getUnit }),
    position: createTooltipPositioner(
      tokens.px(tooltipOffsetToken) ?? tooltipOffsetFallback
    ),
  }
}
