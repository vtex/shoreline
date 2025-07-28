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
      if (isObject(data[i])) {
        if (data[i].value !== 0) {
          data[i] = {
            ...data[i],
            itemStyle: {
              ...data[i].itemStyle,
              borderRadius: defaultBorderRadius,
            },
          }
          break
        }
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
    const serie = v as LineSeriesOption
    if (serie.color) {
      return
    }
    const areaColor =
      defaultColorShade[
        defaultColorPreset[nextColorIndex % defaultAreaColors.length]
      ]
    serie.areaStyle ??= {}

    if (!gradient) {
      serie.areaStyle.color = defaultAreaColors[nextColorIndex]
      serie.color = defaultColorShade[areaColor]
      nextColorIndex++
      return
    }
    const color = {
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
    serie.areaStyle.color = color
  })
  nextColorIndex++
  return { series, ...otherProps }
}
