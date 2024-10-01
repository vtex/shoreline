export type BarChartVariants = 'default' | 'horizontal'

export type LineChartVariants = 'default' | 'base'

export type LineChartConfig = { type: 'line'; variant?: LineChartVariants }
export type BarChartConfig = { type: 'bar'; variant?: BarChartVariants }

export type ChartConfig = BarChartConfig | BarChartConfig

export type ChartLoadingConfig = {
  text?: string
  color?: string
  textColor?: string
  fontSize?: number
}
