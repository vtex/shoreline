import type { BarSeriesOption, EChartsOption, SeriesOption } from 'echarts'
import { CHART_STYLES } from '../theme/chartStyles'
import type {
  BarChartVariants,
  ChartConfig,
  LineChartVariants,
  ChartUnit,
} from '../types/chart'
import { merge } from '@vtex/shoreline-utils'
import { cloneDeep, isArray, isDate } from 'lodash'
import { defaultTheme } from '../theme/themes'

export const buildDefaultSerie = (
  serie: SeriesOption | SeriesOption[],
  defaultStyle: EChartsOption
): SeriesOption => {
  const seriesClone = cloneDeep(serie)
  const defaultStylesClone = cloneDeep(defaultStyle.series)
  const serieMerged = merge(defaultStylesClone, seriesClone) as SeriesOption

  return serieMerged
}

export const formatSeries = (
  series: SeriesOption | SeriesOption[] | undefined,
  defaultStyle: EChartsOption
) => {
  if (!series) return
  if (Array.isArray(series)) {
    return series.map((serie) => buildDefaultSerie(serie, defaultStyle))
  }

  return buildDefaultSerie(series, defaultStyle)
}

const setBarGap = (series: SeriesOption[], size: number) => {
  let bar = 0

  for (let i = 0; i < series.length; i++) if (series[i].type === 'bar') bar++
  if (bar <= 1) return

  let finalPercentage: number
  finalPercentage = 100
  if (size === 1) finalPercentage = 100 / (bar + 2)

  if (size === 2) finalPercentage = 100 / (bar + 1)

  if (size === 3) finalPercentage = 100 / bar

  for (let i = series.length - 1; i > -1; i--) {
    const serie = series[i]
    if (serie.type === 'bar') {
      serie.barCategoryGap = `${finalPercentage.toFixed(0)}%`
    }
  }
}

export const getChartOptions = (
  options: EChartsOption,
  chartConfig: ChartConfig
): EChartsOption | undefined => {
  const { type, variant } = chartConfig
  if (typeof options === 'undefined') return
  const { series, ...rest } = options

  const defaultStyle = getDefaultStyle(type, variant)

  const { series: defaultSeries, ...defaultRest } = defaultStyle
  const formattedSeries = formatSeries(series, defaultStyle)

  if (chartConfig.type === 'bar' && isArray(formattedSeries) && chartConfig.gap)
    setBarGap(formattedSeries, chartConfig.gap)

  const mergedOptions = merge(defaultRest, rest)
  return { ...mergedOptions, series: formattedSeries }
}

/**
 * Returns the default style for that chart type and variant,
 * or the appropriate default variant if the variant is not passed.
 */
function getDefaultStyle(
  type: ChartConfig['type'],
  variant?: ChartConfig['variant']
): EChartsOption {
  if (type === 'bar') {
    return variant ? CHART_STYLES[type][variant] : CHART_STYLES[type].vertical
  }
  return variant ? CHART_STYLES[type][variant] : CHART_STYLES[type].default
}

/**
 * Returns the SeriesOption with the options passed and the config
 * @param multi MultiChart config that will be used to pass
 * @returns SeriesOption correct
 */
export const getDataToChartCompositor = (multi: ChartUnit): SeriesOption => {
  const defaultStyle = getDefaultStyle(
    multi.chartConfig.type,
    multi.chartConfig.variant
  )

  const serieFinal = merge(defaultStyle.series, multi.series) as SeriesOption

  return serieFinal
}

export function applySeriesHook(
  series: SeriesOption[],
  fn: CallableFunction
): SeriesOption[]
export function applySeriesHook(
  series: SeriesOption,
  fn: CallableFunction
): SeriesOption
export function applySeriesHook(
  series: SeriesOption | SeriesOption[],
  fn: CallableFunction
): SeriesOption | SeriesOption[]
export function applySeriesHook(
  series: SeriesOption | SeriesOption[],
  fn: CallableFunction
): SeriesOption | SeriesOption[] {
  if (Array.isArray(series)) {
    return series.map((v: any) => fn(v))
  }
  return fn(series)
}

type DefaultHooks = {
  bar: Record<BarChartVariants, ((series: any) => SeriesOption)[]>
  line: Record<LineChartVariants, ((series: any) => SeriesOption)[]>
}
/**
 * Functions that are always called for a certain chart config
 */
export const defaultHooks: DefaultHooks = {
  bar: {
    vertical: [normalizeBarData],
    horizontal: [normalizeHorizontalBarData],
  },
  line: {
    default: [],
  },
}

/**
 * Fix required so that bars with negative values don't render
 * upside down.
 *
 */
export function normalizeBarData(series: BarSeriesOption): SeriesOption {
  if (typeof series === 'undefined' || typeof series.data === 'undefined')
    return {}
  const data = series.data

  const defaultBorder = defaultTheme.bar.itemStyle.borderRadius
  const invertedBorderRadius = [0, 0, defaultBorder[0], defaultBorder[1]]

  return {
    ...series,
    data: data.map((v) => {
      if (
        typeof v === 'string' ||
        isDate(v) ||
        Array.isArray(v) || // We could allow this case, but i don't think we allow arrays of arrays anywhere
        v === null ||
        typeof v === 'undefined'
      ) {
        return v
      }
      if (typeof v === 'number') {
        return v > 0
          ? v
          : { value: v, itemStyle: { borderRadius: invertedBorderRadius } }
      }
      if (typeof v.value === 'number' && v.value < 0) {
        const out = { ...v }
        out.itemStyle ??= {}
        out.itemStyle.borderRadius = invertedBorderRadius
        return out
      }
      return v
    }),
  } as SeriesOption // a BarOption is a SeriesOption but there's nothing directly expressing that relation so TS thinks it's wrong
}

export function normalizeHorizontalBarData(
  series: BarSeriesOption
): SeriesOption {
  if (typeof series === 'undefined' || typeof series.data === 'undefined')
    return {}
  const data = series.data

  const defaultBorder = defaultTheme.bar.itemStyle.borderRadius
  const invertedBorderRadius = [defaultBorder[0], 0, 0, defaultBorder[1]]

  return {
    ...series,
    data: data.map((v) => {
      if (
        typeof v === 'string' ||
        isDate(v) ||
        Array.isArray(v) || // We could allow this case, but i don't think we allow arrays of arrays anywhere
        v === null ||
        typeof v === 'undefined'
      ) {
        return v
      }
      if (typeof v === 'number') {
        return v > 0
          ? v
          : { value: v, itemStyle: { borderRadius: invertedBorderRadius } }
      }
      if (typeof v.value === 'number' && v.value < 0) {
        const out = { ...v }
        out.itemStyle ??= {}
        out.itemStyle.borderRadius = invertedBorderRadius
        return out
      }
      return v
    }),
  } as SeriesOption // a BarOption is a SeriesOption but there's nothing directly expressing that relation so TS thinks it's wrong
}

/**
 * Returns the tooltip config according to the ChartConfig passed.
 * @param tooltip ChartConfig that will be used to select.
 * @returns EChartsOption['tooltip']
 */
export const getTooltipChartCompositor = (
  tooltip: ChartConfig
): EChartsOption['tooltip'] => {
  return getDefaultStyle(tooltip.type, tooltip.variant).tooltip
}

/**
 * Returns an object containing the xAxis and yAxis props, according to the ChartConfig passed in param.
 * @param background ChartConfig
 * @returns Object containing xAxis, and yAxis props.
 */
export const getBackgroundChartCompositor = (
  background: ChartConfig
): { xAxis: EChartsOption['xAxis']; yAxis: EChartsOption['yAxis'] } => {
  const style = getDefaultStyle(background.type, background.variant)

  return { xAxis: style.xAxis, yAxis: style.yAxis }
}
