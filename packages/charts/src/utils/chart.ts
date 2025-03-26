import type { BarSeriesOption, EChartsOption, SeriesOption } from 'echarts'
import { CHART_STYLES } from '../theme/chartStyles'
import type { ChartConfig, MultiChart } from '../types/chart'
import { merge } from '@vtex/shoreline-utils'
import { cloneDeep, isDate } from 'lodash'
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

export const getChartOptions = (
  options: EChartsOption,
  type: ChartConfig['type'],
  variant: ChartConfig['variant']
): EChartsOption | undefined => {
  if (typeof options === 'undefined') return
  const { series, ...rest } = options
  const chartStyleType = CHART_STYLES[type]

  const defaultStyle = variant
    ? chartStyleType[variant]
    : chartStyleType.default

  const { series: defaultSeries, ...defaultRest } = defaultStyle
  const formattedSeries = formatSeries(series, defaultStyle)

  const mergedOptions = merge(defaultRest, rest)
  if (
    type === 'bar' &&
    variant === 'default' &&
    typeof formattedSeries !== 'undefined'
  ) {
    // applySeriesHook(formattedSeries, normalizeBarData)
  }
  return { ...mergedOptions, series: formattedSeries }
}

/**
 * Returns the SeriesOption with the options passed and the config
 * @param multi MultiChart config that will be used to pass
 * @returns SeriesOption correct
 */
export const getDataToMultichart = (multi: MultiChart): SeriesOption => {
  const chartStyleType = CHART_STYLES[multi.config.type]
  const defaultStyle = multi.config.variant
    ? chartStyleType[multi.config.variant]
    : chartStyleType.default

  const serieFinal = merge(defaultStyle.series, multi.serie) as SeriesOption

  return serieFinal
}

export function applySeriesHook(
  series: SeriesOption | SeriesOption[],
  fn: CallableFunction
): void {
  console.log(JSON.stringify(series))
  console.log(`aplying hooks:${fn.name}`)
  if (Array.isArray(series)) {
    for (const v of series) {
      fn(v.data)
    }
  } else {
    fn(series.data)
  }
  console.log(JSON.stringify(series))
}
/**
 * Fix required so that bars with negative values don't render
 * upside down.
 *
 * **Will change series data** but will leave styling alone (except for border radius).
 */
export function normalizeBarData(data: BarSeriesOption['data']): void {
  if (typeof data === 'undefined') return

  const defaultBorder = defaultTheme.bar.itemStyle.borderRadius
  const invertedBorderRadius = [0, 0, defaultBorder[0], defaultBorder[1]]

  data.forEach((v, index) => {
    if (
      typeof v === 'string' ||
      isDate(v) ||
      Array.isArray(v) || // We could allow this case, but i don't think we allow arrays of arrays anywhere
      v === null ||
      typeof v === 'undefined'
    ) {
    } else if (typeof v === 'number') {
      data[index] =
        v > 0
          ? v
          : { value: v, itemStyle: { borderRadius: invertedBorderRadius } }
    } else if (typeof v.value === 'number' && v.value < 0) {
      v.itemStyle ??= {} // is it undefined? if it is assign an empty object to it
      v.itemStyle.borderRadius = invertedBorderRadius
    }
  })
}

/**
 * Returns the tooltip config according to the ChartConfig passed.
 * @param tooltip ChartConfig that will be used to select.
 * @returns EChartsOption['tooltip']
 */
export const getTooltipMultitype = (
  tooltip: ChartConfig
): EChartsOption['tooltip'] => {
  return tooltip.variant
    ? CHART_STYLES[tooltip.type][tooltip.variant].tooltip
    : CHART_STYLES[tooltip.type].default.tooltip
}

/**
 * Returns an object containing the xAxis and yAxis props, according to the ChartConfig passed in param.
 * @param background ChartConfig
 * @returns Object containing xAxis, and yAxis props.
 */
export const getBackgroundMultitype = (
  background: ChartConfig
): { xAxis: EChartsOption['xAxis']; yAxis: EChartsOption['yAxis'] } => {
  const typ = CHART_STYLES[background.type]

  const style = background.variant ? typ[background.variant] : typ.default

  return { xAxis: style.xAxis, yAxis: style.yAxis }
}
