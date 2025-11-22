import type { EChartsOption, SeriesOption } from 'echarts'
import type { LegendAction } from '../components/legend'
const BarChartVariantsArray = [
  'vertical',
  'horizontal',
  'stacked',
  'percentage stack',
] as const
const LineChartVariantsArray = ['default'] as const
const AreaChartVariantsArray = ['overlapping', 'stacked'] as const
const FunnelChartVariantsArray = ['default'] as const
const ScatterChartVariantsArray = ['default', 'third-dimension'] as const
const SunburstChartVariantsArray = ['default'] as const
const DonutChartVariantsArray = ['default'] as const

/**
 * Used to check variants in utils/chart.ts checkValidVariant and getDefaultByTpe
 */
export const ChartVariants = {
  bar: {
    variants: BarChartVariantsArray,
    default: 'vertical' as const,
  },
  line: {
    variants: LineChartVariantsArray,
    default: 'default' as const,
  },
  area: {
    variants: AreaChartVariantsArray,
    default: 'overlapping' as const,
  },
  funnel: {
    variants: FunnelChartVariantsArray,
    default: 'default' as const,
  },
  sunburst: {
    variants: SunburstChartVariantsArray,
    default: 'default' as const,
  },
  donut: {
    variants: DonutChartVariantsArray,
    default: 'default' as const,
  },
  scatter: {
    variants: ScatterChartVariantsArray,
    default: 'default' as const,
  },
} as const

export type BarChartVariants = (typeof BarChartVariantsArray)[number]
export type LineChartVariants = (typeof LineChartVariantsArray)[number]
export type AreaChartVariants = (typeof AreaChartVariantsArray)[number]
export type FunnelChartVariants = (typeof FunnelChartVariantsArray)[number]
export type ScatterChartVariants = (typeof ScatterChartVariantsArray)[number]
export type SunburstChartVariants = (typeof SunburstChartVariantsArray)[number]
export type DonutChartVariants = (typeof DonutChartVariantsArray)[number]

export type BarChartConfig = {
  type: 'bar'
  variant?: BarChartVariants
  gap?: 1 | 2 | 3
}
export type LineChartConfig = { type: 'line'; variant?: LineChartVariants }
export type AreaChartConfig = { type: 'area'; variant?: AreaChartVariants }
export type FunnelChartConfig = {
  type: 'funnel'
  variant?: FunnelChartVariants
}
export type ScatterChartConfig = {
  type: 'scatter'
  variant?: ScatterChartVariants
}
export type SunburstChartConfig = {
  type: 'sunburst'
  variant?: SunburstChartVariants
}

export type DonutChartConfig = {
  type: 'donut'
  variant?: DonutChartVariants
}

export type ChartConfig =
  | BarChartConfig
  | LineChartConfig
  | AreaChartConfig
  | FunnelChartConfig
  | ScatterChartConfig
  | SunburstChartConfig
  | DonutChartConfig

export type ChartUnit = {
  series: SeriesOption
  chartConfig: ChartConfig
  hooks?: ((option: EChartsOption) => EChartsOption)[] | null
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
  area: Record<AreaChartVariants, EChartsOption>
  funnel: Record<FunnelChartVariants, EChartsOption>
  scatter: Record<ScatterChartVariants, EChartsOption>
  sunburst: Record<SunburstChartVariants, EChartsOption>
  donut: Record<DonutChartVariants, EChartsOption>
}

export type DefaultHooks = {
  bar: Record<BarChartVariants, ((series: EChartsOption) => EChartsOption)[]>
  line: Record<LineChartVariants, ((series: EChartsOption) => EChartsOption)[]>
  area: Record<AreaChartVariants, ((series: EChartsOption) => EChartsOption)[]>
  funnel: Record<
    FunnelChartVariants,
    ((series: EChartsOption) => EChartsOption)[]
  >
  scatter: Record<
    ScatterChartVariants,
    ((series: EChartsOption) => EChartsOption)[]
  >
  sunburst: Record<
    SunburstChartVariants,
    ((series: EChartsOption) => EChartsOption)[]
  >
  donut: Record<
    DonutChartVariants,
    ((series: EChartsOption) => EChartsOption)[]
  >
}

export type LegendHooks = {
  bar?: Partial<
    Record<
      BarChartVariants,
      (option: EChartsOption, action: LegendAction) => EChartsOption
    >
  >
}
