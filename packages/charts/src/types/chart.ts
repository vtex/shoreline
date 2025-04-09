import type { EChartsOption, SeriesOption } from 'echarts'

export type BarChartVariants = 'default' | 'horizontal'

export type LineChartVariants = 'default'

export type LineChartConfig = { type: 'line'; variant?: LineChartVariants }
export type BarChartConfig = { type: 'bar'; variant?: BarChartVariants }

export type ChartConfig = BarChartConfig | LineChartConfig

export type MultiChart = {
  serie: SeriesOption
  config: ChartConfig
  hooks?: CallableFunction[] | null
}

export type ChartLoadingConfig = {
  text?: string
  color?: string
  textColor?: string
  fontSize?: number
}
export type DefaultChartStyles = {
  bar: Record<BarChartVariants, EChartsOption>
  line: Record<LineChartVariants, EChartsOption>
}
