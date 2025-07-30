import type { LegendStateType } from '../components/legend'
import { defaultColorPreset, defaultColorShade } from '../theme/colors'

export function turnOnAllLegend(chart: echarts.ECharts, series: string[]) {
  series.forEach((serie) => turnOnSerieLegend(chart, serie))
}

export function turnOnSerieLegend(chart: echarts.ECharts, serie: string) {
  chart.dispatchAction({ type: 'legendSelect', name: serie }, { silent: true })
}

export function turnOffSerieLegend(chart: echarts.ECharts, serie: string) {
  chart.dispatchAction(
    { type: 'legendUnSelect', name: serie },
    { silent: true }
  )
}

export function toggleSerieLegend(chart: echarts.ECharts, serie: string) {
  chart.dispatchAction(
    { type: 'legendToggleSelect', name: serie },
    { silent: true }
  )
}

export function getHoverColor(color: string): string {
  if (defaultColorPreset.includes(color)) return defaultColorShade[color]
  return color
}

export function checkAllSelected(
  seriesState: LegendStateType
): LegendStateType {
  const allNotFalse = seriesState.every((serie) => serie.state !== false)

  if (allNotFalse)
    return seriesState.map((serie) => ({
      ...serie,
      state: undefined,
    })) as LegendStateType

  return seriesState.map((serie) => ({
    ...serie,
    state: serie.state === undefined ? true : serie.state,
  })) as LegendStateType
}
