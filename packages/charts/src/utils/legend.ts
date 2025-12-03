import type { EChartsOption } from 'echarts'
import type { LegendAction, LegendState } from '../components/legend'
import { defaultColorShade } from '../theme/colors'
import { defaultTheme } from '../theme/themes'
import { cloneDeep } from 'lodash.clonedeep'

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

/**
 * Toggles series visibility
 */
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

/**
 * Round the border from bar stacked charts
 */
export function changeBarRounding(
  options: EChartsOption,
  action: LegendAction
): EChartsOption {
  switch (action.type) {
    case 'toggle': {
      return barRoundingToggle(options, action.state)
    }

    case 'exclusive': {
      return barRoundingExclusive(options, action.index)
    }

    default: {
      action.type satisfies 'selectAll'

      return {}
    }
  }
}

/**
 * Round the border for the action.type = 'toggle'
 */
function barRoundingToggle(
  options: EChartsOption,
  state: LegendState
): EChartsOption {
  const defaultBorderRadius = defaultTheme.bar.itemStyle.borderRadius
  const series = options.series
  const booleanStates = state.map((s) => s.state !== 'off')

  if (!series || !Array.isArray(series)) return options

  const visibleSeries = series
    .filter((_, index) => booleanStates[index])
    .map((serie) => cloneDeep(serie))

  if (
    visibleSeries.length >= series.length ||
    visibleSeries.length === 0 ||
    !visibleSeries.every((serie) => serie.data)
  ) {
    return options
  }

  // From the checking above we're certain this array is non empty and has series with non null data
  const safeVisibleSeries = visibleSeries as any
  for (let i = 0; i < safeVisibleSeries[0].data.length; i++) {
    let top = -1

    // rounding the top
    for (let j = safeVisibleSeries.length - 1; j > -1; j--) {
      const data = safeVisibleSeries[j].data

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

    // making sure everyone else is not round
    for (let j = 0; j < safeVisibleSeries.length; j++) {
      if (j === top) continue

      const data = safeVisibleSeries[j].data

      if (typeof data[i] === 'object') {
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

  return { series: safeVisibleSeries }
}

/**
 * Round the border for the action.type = 'exclusive'
 */
function barRoundingExclusive(
  options: EChartsOption,
  index: number
): EChartsOption {
  const defaultBorderRadius = defaultTheme.bar.itemStyle.borderRadius
  const series = options.series

  if (!series || !Array.isArray(series)) return options

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
