import type { EChartsOption, LineSeriesOption, SeriesOption } from 'echarts'
import { isArray, isDate, isObject } from 'lodash'
import { defaultTheme } from '../theme/themes'
import {
  defaultAreaColors,
  defaultColorPreset,
  defaultColorShade,
} from '../theme/colors'

export function applySeriesHook(
  series: SeriesOption,
  fn: (option: EChartsOption) => EChartsOption
): SeriesOption {
  return fn({ series: series }).series as SeriesOption
  // we can be relatively certain no one's gonna return undefined from these
}

/**
 * Fix required so that bars with negative values don't render
 * upside down.
 */
export function normalizeBarData(option: EChartsOption): EChartsOption {
  const series = option.series
  if (typeof series === 'undefined') return option
  if (isArray(series)) {
    option.series = series.map((v: any) => normalizeBarDataInner(v))
    return option
  }
  option.series = normalizeBarDataInner(series)
  return option
}

export function normalizeBarDataInner(series: SeriesOption): SeriesOption {
  const data: any = series.data
  if (data === null || typeof data === 'undefined') return series

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
  }
}

export function normalizeHorizontalBarData(
  option: EChartsOption
): EChartsOption {
  const series = option.series
  if (typeof series === 'undefined') return option
  if (isArray(series)) {
    option.series = series.map((v: any) => normalizeHorizontalBarDataInner(v))
    return option
  }
  option.series = normalizeHorizontalBarDataInner(series)
  return option
}
export function normalizeHorizontalBarDataInner(
  series: SeriesOption
): SeriesOption {
  if (typeof series === 'undefined' || typeof series.data === 'undefined')
    return {}
  const data: any = series.data
  if (data === null || typeof data === 'undefined') return series

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
  }
}

export function roundCap(options: EChartsOption): EChartsOption {
  const series = options.series
  if (!isArray(series) || !isArray(series[0].data)) return options

  const defaultBorderRadius = defaultTheme.bar.itemStyle.borderRadius
  series[0].data.forEach((_, i) => {
    for (let j = series.length - 1; j > -1; j--) {
      const data = series[j].data as (
        | number
        | { value: number; itemStyle: { borderRadius: number[] } }
      )[]

      if (isObject(data[i]) && data[i].value !== 0) {
        data[i] = {
          ...data[i],
          itemStyle: {
            ...data[i].itemStyle,
            borderRadius: defaultBorderRadius,
          },
        }
        break
      }
      if (data[i] !== 0) {
        data[i] = {
          value: data[i],
          itemStyle: { borderRadius: defaultBorderRadius },
        } as { value: number; itemStyle: { borderRadius: number[] } }
        // series[j].data[i].itemStyle ??= {}
        // series[j].data[i].itemStyle.borderRadius = defaultBorderRadius
        break
      }
    }
  })
  return options
}

export function normalizeStackedBars(options: EChartsOption): EChartsOption {
  const series = options.series
  if (!isArray(series) || !isArray(series[0].data)) return options

  const seriesSums: number[] = []
  for (let i = 0; i < series[0].data.length; i++) {
    let currentTotal = 0
    series.forEach((v) => {
      const data = v.data as (number | { value: number })[]
      const current = data[i] as number | { value: number }
      if (isObject(current)) {
        currentTotal += current.value
      } else {
        currentTotal += current
      }
    })
    seriesSums.push(currentTotal)
  }

  series.forEach((serie) => {
    const data = serie.data as (number | { value: number })[]
    data.forEach((v, j) => {
      let value = 0
      if (isObject(v)) {
        value = v.value
      } else {
        value = v
      }
      data[j] = value / seriesSums[j]
    })
  })
  return options
}

export function setAreaGradients(options: EChartsOption): EChartsOption {
  return setAreaColors(options, true)
}

export function setAreaColors(
  options: EChartsOption,
  gradient = false
): EChartsOption {
  const { series, ...otherProps } = options

  const arraySeries = isArray(series) ? series : [series]

  let nextColorIndex = 0
  arraySeries.forEach((v) => {
    let areaColor: any
    const serie = v as LineSeriesOption
    if (serie.areaStyle) {
      return
    }
    if (serie.color) {
      if (Array.isArray(serie.color)) {
        areaColor = serie.color[0]
      } else areaColor = serie.color
    } else {
      areaColor =
        defaultColorShade[
          defaultColorPreset[nextColorIndex % defaultAreaColors.length]
        ]
    }
    serie.areaStyle ??= {}

    if (!gradient) {
      // defaultColorShade[areaColor]
      serie.areaStyle.color = areaColor
      serie.color = areaColor

      nextColorIndex++
      return
    }
    areaColor = {
      type: 'linear' as const,
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      global: false,
      colorStops: [
        {
          offset: 0,
          color: areaColor,
        },
        {
          offset: 1,
          color: '#FFFFFF',
        },
      ],
    }
    serie.areaStyle.color = areaColor
    if (!serie.color) {
      nextColorIndex++
    }
  })
  return { series, ...otherProps }
}
/**
 * Returns a function that formats our matrix based date value format into echarts array of objects format, using the specified locale.
 * If options is already an array of objects, does nothing.
 *
 * Expects options to be like:
 * ```
 * series: [
 *  {
 *    data: [
 *          [new Date('2025-01-01'), 10],
 *          [new Date('2025-05-01'), 11],
 *          [new Date('2025-10-01'), 12],
 *        ],
 *    name: 'Series 1',
 *  },
 * ]
 * ```
 * Which expands into:
 * ```
 * series: [
 *   {
 *     data: [
 *           { name: new Date('2025-01-01').toLocaleDateString(locale, options), value:[new Date('2025-01-02'),10] },
 *           { name: new Date('2025-05-01').toLocaleDateString(locale, options), value:[new Date('2025-05-01'),11] },
 *           { name: new Date('2025-10-01').toLocaleDateString(locale, options), value:[new Date('2025-10-01'),12] },
 *         ],
 *     name: 'Series 1',
 *   },
 * ]
 *```
 */
export function formatTimeAxis(
  locale: Intl.LocalesArgument,
  formatOptions: Intl.DateTimeFormatOptions = { dateStyle: 'full' }
) {
  return (options: EChartsOption) => {
    const series = options.series
    if (!isArray(series) || !isArray(series[0].data)) return options
    series.forEach((serie) => {
      const data = serie.data as any[]
      data.forEach((value: [Date, number], j) => {
        data[j] = {
          name: value[0].toLocaleDateString(locale, formatOptions),
          value: value,
        }
      })
      series
    })
    return options
  }
}
