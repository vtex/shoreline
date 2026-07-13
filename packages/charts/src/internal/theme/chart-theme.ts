/**
 * Resolves `--sl-*` design tokens to concrete values. Values come from the
 * computed styles of the chart's own DOM element (see `createElementTokens`),
 * so token updates propagate to charts without a package release.
 */
export interface ChartTokens {
  /**
   * Raw resolved token value, or undefined when the token can't be resolved
   * (e.g. the Shoreline stylesheet isn't loaded).
   */
  get: (token: string) => string | undefined
  /**
   * Token length resolved to a px number (the engine only accepts px), or
   * undefined when the token can't be resolved.
   */
  px: (token: string) => number | undefined
}

/**
 * Categorical series palette, assigned to series in this fixed order and
 * never cycled — a repeated color would read as a repeated series. The first
 * three are the designed primary, secondary and tertiary colors, which cover
 * the default three-series chart; the rest extend the scale for charts that
 * opt out of aggregation via `maxSeries`, ordered to keep adjacent pairs
 * distinguishable under color-vision deficiency.
 *
 * The length of this list is the hard ceiling on how many series a chart can
 * render (`seriesLimit` in the bar chart derives from it). Red is deliberately
 * absent: it carries error semantics elsewhere in Shoreline.
 */
export const chartSeriesTokens = [
  '--sl-color-blue-8',
  '--sl-color-purple-9',
  '--sl-color-orange-6',
  '--sl-color-pink-9',
  '--sl-color-teal-9',
  '--sl-color-green-9',
]

const fontFamily = '--sl-font-family-sans'
const fontSizeCaption = '--sl-font-size-1'
const fgBase = '--sl-fg-base'
const fgMuted = '--sl-fg-muted'
// color component of --sl-border-base, which is a full border shorthand
const lineColor = '--sl-color-gray-3'
// legend symbols are square, so one token drives both of their dimensions
const legendSymbolSize = '--sl-space-3'

/**
 * Compiles `--sl-*` design tokens into an engine theme object. This bridge is
 * the only path style reaches the engine: charts render to SVG, so CSS can't
 * style them directly. Unresolvable tokens compile to undefined, which the
 * engine ignores in favor of its defaults.
 */
export function createChartTheme(tokens: ChartTokens) {
  const { get, px } = tokens

  const palette = chartSeriesTokens
    .map(get)
    .filter((color): color is string => Boolean(color))

  const label = {
    color: get(fgMuted),
    fontFamily: get(fontFamily),
    fontSize: px(fontSizeCaption),
  }

  const axis = {
    axisLine: { lineStyle: { color: get(lineColor) } },
    axisTick: { lineStyle: { color: get(lineColor) } },
    axisLabel: label,
    splitLine: { lineStyle: { color: get(lineColor) } },
  }

  return {
    color: palette.length > 0 ? palette : undefined,
    backgroundColor: 'transparent',
    textStyle: {
      color: get(fgBase),
      fontFamily: get(fontFamily),
    },
    categoryAxis: axis,
    valueAxis: axis,
    legend: {
      // The engine's default symbol is a wide rectangle (25×14). Driving both
      // dimensions from one token squares it off.
      itemWidth: px(legendSymbolSize),
      itemHeight: px(legendSymbolSize),
      textStyle: {
        color: get(fgBase),
        fontFamily: get(fontFamily),
        fontSize: px(fontSizeCaption),
      },
    },
    // No theme-level tooltip styling: every chart renders its tooltip
    // through a custom `formatter` + `data-sl-chart-tooltip*` CSS (see
    // internal/tooltip), which fully overrides whatever the theme sets here.
  }
}

export type ChartTheme = ReturnType<typeof createChartTheme>
