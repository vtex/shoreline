import type { EChartsOption } from 'echarts'
import { forwardRef, useMemo } from 'react'
import type { MultiChart } from '../../types/chart'
import { Chart } from '../chart/chart'
import { cloneDeep, type Dictionary } from 'lodash'
import type { EChartsInstance } from 'echarts-for-react'
import { CHART_STYLES } from '../../theme/chartStyles'
import { merge } from '@vtex/shoreline-utils'
import { getDataFromChart } from '../../utils/chart'

export const ChartsCompositor = forwardRef<
  echarts.EChartsType | undefined,
  ChartsCompositorOptions
>(function ChartCompositor(props, ref) {
  const { charts } = props

  const chartOptions: EChartsOption = useMemo(() => {
    const series = []
    for (let i = 0; i < charts.length; i++) {
      const serie = charts[i]
      series.push(getDataFromChart(serie))
    }

    const optionBarRest = cloneDeep(CHART_STYLES.bar.default)

    const optionLineRest = cloneDeep(CHART_STYLES.line.default)

    const optionRest = merge(optionBarRest, optionLineRest)

    optionRest.series = series

    return optionRest
  }, [charts])

  return (
    <Chart
      chartConfig="multitype"
      option={chartOptions}
      style={{ height: 550 }}
    />
  )
})

export interface ChartsCompositorOptions {
  charts: MultiChart[]

  background?: 'line' | 'column' | 'full' | 'empty'

  tooltip?: 'line' | 'bar'

  xAxis?: EChartsOption['xAxis']

  yAxis?: EChartsOption['yAxis']

  renderer?: 'svg' | 'canvas'

  theme?: Dictionary<any> | string

  loading?: boolean

  loadingConfig?: EChartsInstance['showLoading']
}
