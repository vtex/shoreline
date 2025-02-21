import type { EChartsOption } from 'echarts'
import type { DefaultChartStyles } from '../types/chart'
import type { EChartsInstance } from 'echarts-for-react'
import { defaultSpinnerColor } from './colors'
import { getTooltipStaticString } from '../components/tooltip'

const TOOLTIP_OPTIONS: EChartsOption['tooltip'] = {
  trigger: 'item',
  borderWidth: 1,
  borderColor: 'var(--sl-color-gray-4)',
  formatter: (params) => {
    return getTooltipStaticString(params)
  },
}
const LINE_TOOLTIP_OPTIONS: EChartsOption['tooltip'] = {
  trigger: 'axis',
  borderWidth: 1,
  borderColor: 'var(--sl-color-gray-4)',
  formatter: (params) => {
    return getTooltipStaticString(params)
  },
}
export const BAR_CHART_LEGEND_DEFAULT_STYLE: EChartsOption['legend'] = {
  orient: 'horizontal',
  left: 'auto',
  bottom: 0,
  align: 'left',
  itemWidth: 16,
  itemHeight: 16,
  padding: 0,
  itemGap: 20,
}

export const BAR_CHART_GRID_DEFAULT_STYLE: EChartsOption['grid'] = {
  left: 'auto',
  right: '0',
  top: '5',
  bottom: '7%',
  containLabel: true,
}

export const CHART_STYLES: DefaultChartStyles = {
  bar: {
    default: {
      xAxis: {
        type: 'category',
      },
      yAxis: {
        type: 'value',
      },
      series: {
        type: 'bar',
      },
      barGap: '20%',
      barCategoryGap: '55%',
      legend: BAR_CHART_LEGEND_DEFAULT_STYLE,
      grid: BAR_CHART_GRID_DEFAULT_STYLE,
      barMaxWidth: 60,
      barMinWidth: 15,
      tooltip: TOOLTIP_OPTIONS,
    },
    horizontal: {
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'category',
      },
      barGap: '20%',
      barCategoryGap: '55%',
      legend: BAR_CHART_LEGEND_DEFAULT_STYLE,
      grid: BAR_CHART_GRID_DEFAULT_STYLE,
      barMaxWidth: 60,
      barMinWidth: 15,
      tooltip: TOOLTIP_OPTIONS,
      series: {
        type: 'bar',
        itemStyle: {
          borderRadius: [0, 4, 4, 0],
        },
      },
    },
  },
  line: {
    default: {
      xAxis: { splitLine: { show: true } },
      yAxis: { type: 'value' },
      series: {
        type: 'line',
        smooth: true,
        showSymbol: false, // desliga as bolinhas
      },
      legend: { bottom: 'bottom', left: 'left', icon: 'roundRect' },
      tooltip: LINE_TOOLTIP_OPTIONS, // order não funfa por causa da nossa implementação do texto da tooltip
      // Deve ter um jeito melhor sem fazer merge
      grid: BAR_CHART_GRID_DEFAULT_STYLE,
    },
    // base: {}, // não acho que era pra isso ser um variant
  },
}

export const DEFAULT_LOADING_SPINNER: EChartsInstance['showLoading'] = {
  text: '',
  spinnerRadius: 10,
  lineWidth: 3,
  color: defaultSpinnerColor,
}
