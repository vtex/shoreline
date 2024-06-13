import type { EChartsOption, SeriesOption } from 'echarts'
import { CHART_STYLES } from '../theme/chartStyles'
import type { ChartTypes, ChartVariants } from '../types/chart'
import { merge } from '@vtex/shoreline-utils'

export const buildDefaultBarSerie = (
  serie: SeriesOption | SeriesOption[],
  type: ChartTypes,
  variant: ChartVariants
): SeriesOption => {
  const seriesClone = structuredClone(serie)
  const defaultStylesClone = structuredClone(CHART_STYLES[type][variant].series)
  const serieMerged = merge(defaultStylesClone, seriesClone) as SeriesOption

  return serieMerged
}

export const formatSeries = (
  series: SeriesOption | SeriesOption[] | undefined,
  type: ChartTypes,
  variant: ChartVariants
) => {
  if (!series) return
  if (Array.isArray(series)) {
    return series.map((serie) => buildDefaultBarSerie(serie, type, variant))
  }

  return buildDefaultBarSerie(series, type, variant)
}

export const getChartOptions = (
  options: EChartsOption,
  type: ChartTypes,
  variant: ChartVariants
): EChartsOption | undefined => {
  if (!options) return
  const { series, ...rest } = options

  const { series: defaultSeries, ...defaulRest } = CHART_STYLES[type][variant]

  const formattedSeries = formatSeries(series, type, variant)

  const mergedOptions = merge(defaulRest, rest)

  return { ...mergedOptions, series: formattedSeries }
}
