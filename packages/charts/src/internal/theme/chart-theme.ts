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
 * Categorical series palette, assigned to series in this fixed order (never
 * cycled). The order interleaves warm and cool hues so adjacent series stay
 * distinguishable under color-vision deficiency (worst adjacent-pair CVD
 * ΔE 17.1 against the base surface). Provisional until designer sign-off on
 * the Data Visualization spec.
 */
export const chartSeriesTokens = [
  '--sl-color-blue-9',
  '--sl-color-orange-9',
  '--sl-color-teal-9',
  '--sl-color-pink-9',
  '--sl-color-green-9',
  '--sl-color-purple-9',
  '--sl-color-yellow-9',
  '--sl-color-cyan-9',
]

const fontFamily = '--sl-font-family-sans'
const fontSizeCaption = '--sl-font-size-1'
const fgBase = '--sl-fg-base'
const fgMuted = '--sl-fg-muted'
const bgBase = '--sl-bg-base'
// color component of --sl-border-base, which is a full border shorthand
const lineColor = '--sl-color-gray-3'

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
      textStyle: {
        color: get(fgBase),
        fontFamily: get(fontFamily),
        fontSize: px(fontSizeCaption),
      },
    },
    tooltip: {
      backgroundColor: get(bgBase),
      borderColor: get(lineColor),
      textStyle: {
        color: get(fgBase),
        fontFamily: get(fontFamily),
        fontSize: px(fontSizeCaption),
      },
    },
  }
}

export type ChartTheme = ReturnType<typeof createChartTheme>
