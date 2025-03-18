import type { EChartsOption, SeriesOption } from 'echarts'
import { CHART_STYLES } from '../theme/chartStyles'
import type { ChartConfig, MultiChart } from '../types/chart'
import { merge } from '@vtex/shoreline-utils'
import { cloneDeep } from 'lodash'

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
  if (!options) return
  const { series, ...rest } = options
  const chartStyleType = CHART_STYLES[type]

  const defaultStyle = variant
    ? chartStyleType[variant]
    : chartStyleType.default

  const { series: defaultSeries, ...defaultRest } = defaultStyle

  const formattedSeries = formatSeries(series, defaultStyle)

  const mergedOptions = merge(defaultRest, rest)

  return { ...mergedOptions, series: formattedSeries }
}

export const getDataToMultichart = (multi: MultiChart): SeriesOption => {
  const chartStyleType = CHART_STYLES[multi.config.type]
  const defaultStyle = multi.config.variant
    ? chartStyleType[multi.config.variant]
    : chartStyleType.default

  const serieFinal = merge(defaultStyle.series, multi.serie) as SeriesOption

  return serieFinal
}

export const getTooltipMultitype = (
  tooltip: ChartConfig
): EChartsOption['tooltip'] => {
  return tooltip.variant
    ? CHART_STYLES[tooltip.type][tooltip.variant].tooltip
    : CHART_STYLES[tooltip.type].default.tooltip
}

export const getBackgroundMultitype = (
  background: ChartConfig
): EChartsOption => {
  const typ = CHART_STYLES[background.type]

  const style = background.variant ? typ[background.variant] : typ.default

  return style
}
