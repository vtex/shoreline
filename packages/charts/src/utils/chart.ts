import type { EChartsOption, SeriesOption } from 'echarts'
import { CHART_STYLES } from '../theme/chartStyles'
import { type ChartConfig, type ChartUnit, ChartVariants } from '../types/chart'
import { merge } from '@vtex/shoreline-utils'
import { cloneDeep, isArray } from 'lodash'

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
  if (isArray(series)) {
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

  const defaultStyle =
    variant && checkValidVariant(type, variant)
      ? CHART_STYLES[type][variant]
      : CHART_STYLES[type][getDefaultByType(type)]

  const { series: defaultSeries, ...defaultRest } = defaultStyle
  const formattedSeries = formatSeries(series, defaultStyle)

  if (type === 'bar' && isArray(formattedSeries) && chartConfig.gap)
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
  if (!variant || !checkValidVariant(type, variant))
    return CHART_STYLES[type][getDefaultByType(type)]

  return CHART_STYLES[type][variant]
}

/**
 * Returns the SeriesOption with the options passed and the config
 * @param multi MultiChart config that will be used to pass
 * @returns SeriesOption correct
 */
export const getDataToChartCompositor = ({
  chartConfig,
  series,
}: ChartUnit): SeriesOption => {
  const { type, variant } = chartConfig
  const defaultStyle =
    variant && checkValidVariant(type, variant)
      ? CHART_STYLES[type][variant]
      : CHART_STYLES[type][getDefaultByType(type)]

  const serieFinal = merge(defaultStyle.series, series) as SeriesOption

  return serieFinal
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

export function checkValidVariant(type: string, variant?: string): boolean {
  if (!variant) return false
  return ChartVariants[type].variants.includes(variant)
}

export function getDefaultByType(type: ChartConfig['type']): string {
  return ChartVariants[type].default
}
/**
 * Determines whether to enable zoom by default.
 * If zoom is undefined, certain chart types will enable zoom anyway.
 */
export function checkZoom(
  zoom: boolean | undefined,
  type: string | undefined
): boolean {
  if (typeof zoom === 'boolean') return zoom

  if (type === 'line') return false // temporaly disabled by default

  return false
}

export function getSeriesNames(option: EChartsOption): string[] {
  if (!option.series) return ['series0']
  const series = option.series
  if (isArray(series)) {
    return series.map((v, i) => (v.name ? v.name.toString() : `series${i}`))
  }
  return series.name ? [series.name.toString()] : ['series0']
}
