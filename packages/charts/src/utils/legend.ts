import type { EChartsOption } from 'echarts'
import type { LegendState } from '../components/legend'
import { defaultColorShade } from '../theme/colors'
import { cloneDeep, isArray, isObject } from 'lodash'
import { defaultTheme } from '../theme/themes'

export function turnOnAllSeries(chart: echarts.ECharts, series: string[]) {
  series.forEach((serie) => turnOnSerie(chart, serie))
}

export function turnOnSerie(chart: echarts.ECharts, serie: string) {
  chart.dispatchAction({ type: 'legendSelect', name: serie }, { silent: true })
}

export function turnOffSerie(chart: echarts.ECharts, serie: string) {
  chart.dispatchAction(
    { type: 'legendUnSelect', name: serie },
    { silent: true }
  )
}

export function toggleSerie(chart: echarts.ECharts, serie: string) {
  chart.dispatchAction(
    { type: 'legendToggleSelect', name: serie },
    { silent: true }
  )
}

export function getHoverColor(color: string): string {
  if (Object.keys(defaultColorShade).includes(color)) {
    return defaultColorShade[color]
  }

  return color
}

/**
 * If all series are on, makes sure to hide the checkmark for all of them.
 *
 * If not, the series that are on show their checkmark.
 */
export function checkAllSelected(seriesState: LegendState): LegendState {
  const allOn = seriesState.every((serie) => serie.state !== 'off')

  if (allOn) {
    return seriesState.map((serie) => ({
      ...serie,
      state: 'unchecked',
    })) as LegendState
  }

  return seriesState.map((serie) => ({
    ...serie,
    state: serie.state === 'unchecked' ? 'checked' : serie.state,
  })) as LegendState
}

export function changeBarRoundingToogle(
  options: EChartsOption,
  state: LegendState
): EChartsOption {
  const series = options.series

  if (!series || !isArray(series)) return options

  const defaultBorderRadius = defaultTheme.bar.itemStyle.borderRadius
  const booleanStates = state.map((s) => s.state !== 'off')
  const visibleSeries: any[] = []

  series.forEach((serie, index) => {
    if (booleanStates[index]) visibleSeries.push(cloneDeep(serie))
  })

  if (visibleSeries.length >= series.length) {
    return options
  }

  for (let i = 0; i < visibleSeries[0].data.length; i++) {
    let top = -1
    for (let j = visibleSeries.length - 1; j > -1; j--) {
      const data = visibleSeries[j].data

      if (data[i].value && data[i].value !== 0) {
        data[i].itemStyle = {
          ...data[i].itemStyle,
          borderRadius: defaultBorderRadius,
        }
        top = j
        break
      }

      if (data[i] !== 0) {
        data[i] = {
          value: data[i],
          itemStyle: { borderRadius: defaultBorderRadius },
        }
        top = j
        break
      }
    }

    for (let j = 0; j < visibleSeries.length; j++) {
      if (!(j === top)) {
        const data = visibleSeries[j].data

        if (isObject(data[i])) {
          data[i].itemStyle = {
            ...data[i].itemStyle,
            borderRadius: [0, 0, 0, 0],
          }
        } else {
          data[i] = {
            value: data[i],
            itemStyle: { borderRadius: [0, 0, 0, 0] },
          } as { value: number; itemStyle: { borderRadius: number[] } }
        }
      }
    }
  }

  return { series: visibleSeries }
}

export function changeBarRoundingExclusive(
  options: EChartsOption,
  index: number
): EChartsOption {
  const series = options.series

  if (!series || !isArray(series)) return options

  const defaultBorderRadius = defaultTheme.bar.itemStyle.borderRadius

  return {
    series: series.map((serie, i) => {
      if (i === index) {
        return {
          ...serie,
          itemStyle: {
            borderRadius: defaultBorderRadius,
          },
        }
      }

      return serie
    }),
  }
}
