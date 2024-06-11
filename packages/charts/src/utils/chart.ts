import type { EChartsOption, SeriesOption } from 'echarts'
import { merge, clone } from 'lodash'
import { CHART_STYLES } from '../theme/chartStyles'
import type { ChartTypes, ChartVariants } from '../types/chart'

export const buildDefaultBarSerie = (
  serie: SeriesOption | SeriesOption[],
  type: ChartTypes,
  variant: ChartVariants
): SeriesOption => {
  const seriesClone = clone(serie)
  const defaultStylesClone = clone(CHART_STYLES[type][variant].series)
  const serieMerged = merge(defaultStylesClone, seriesClone) as SeriesOption

  return serieMerged
}

export const formatSeries = (
  series: SeriesOption | SeriesOption[] | undefined,
  type: ChartTypes,
  variant: ChartVariants
) => {
  if (!series) return
  if (series instanceof Array && series.length) {
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
