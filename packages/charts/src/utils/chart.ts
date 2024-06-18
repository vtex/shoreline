import type { EChartsOption, SeriesOption } from 'echarts'
import { CHART_STYLES } from '../theme/chartStyles'
import type { ChartConfig } from '../types/chart'
import { merge } from '@vtex/shoreline-utils'

export const buildDefaultSerie = (
  serie: SeriesOption | SeriesOption[],
  defaultStyle: EChartsOption
): SeriesOption => {
  const seriesClone = structuredClone(serie)
  const defaultStylesClone = structuredClone(defaultStyle.series)
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
