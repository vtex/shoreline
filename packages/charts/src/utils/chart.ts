import type { EChartsOption, SeriesOption } from 'echarts'
import { CHART_STYLES } from '../theme/chartStyles'
import type { ChartConfig, MultiChart } from '../types/chart'
import { merge } from '@vtex/shoreline-utils'
import { cloneDeep } from 'lodash'
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
  console.log(series)
  const formattedSeries = formatSeries(series, defaultStyle)
  console.log(formatSeries)

  const mergedOptions = merge(defaultRest, rest)
  if (
    type === 'bar' &&
    variant === 'default' &&
    typeof formattedSeries !== 'undefined'
  ) {
    normalizeBarData(formattedSeries) // border radius for negative bars fix
  }
  console.log(formatSeries)
  return { ...mergedOptions, series: formattedSeries }
}

export const getDataFromChart = (multi: MultiChart) => {
  const chartStyleType = CHART_STYLES[multi.config.type]
  const defaultStyle = multi.config.variant
    ? chartStyleType[variant]
    : chartStyleType.default

  const serieFinal = cloneDeep(defaultStyle.series)
  serieFinal.data = multi.serie.data

  return serieFinal
}

/**
 * Fix required so that bars with negative values don't render
 * upside down.
 *
 * **Will change series data** but will leave styling alone (except for border radius).
 * @param series
 */
export function normalizeBarData(series: SeriesOption | SeriesOption[]): void {
  if (Array.isArray(series)) {
    for (const v of series) {
      normalizeData(v.data as number[])
    }
  } else {
    normalizeData(series.data as number[])
  }
}

function normalizeData(
  data: (number | { value: number; itemStyle: any })[]
): void {
  const defaultBorder = defaultTheme.bar.itemStyle.borderRadius
  const invertedBorderRadius = [0, 0, defaultBorder[0], defaultBorder[1]]

  data.forEach((v, index) => {
    if (typeof v === 'number') {
      data[index] =
        v > 0
          ? v
          : { value: v, itemStyle: { borderRadius: invertedBorderRadius } }
    } else {
      data[index] =
        v.value > 0
          ? v
          : {
              value: v.value,
              itemStyle: { borderRadius: invertedBorderRadius, ...v.itemStyle },
            }
    }
  })
}
