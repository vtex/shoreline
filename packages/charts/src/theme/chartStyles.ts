import type { EChartsOption } from 'echarts'
import type { DefaultChartStyles } from '../types/chart'
import type { EChartsInstance } from 'echarts-for-react'
import { defaultSpinnerColor } from './colors'
import { getTooltipStaticString } from '../components/tooltip'
import { normalizeBarData } from '../utils/chart'

const BASE_TOOLTIP_OPIONS: EChartsOption['tooltip'] = {
  trigger: 'item',
  borderWidth: 1,
  borderColor: 'var(--sl-color-gray-4)',
  formatter: (params) => {
    return getTooltipStaticString(params)
  },
}

export const LEGEND_DEFAULT_STYLE: EChartsOption['legend'] = {
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

export const DEFAULT_DELAY_FUNCTION = (idx: number) => idx * 20

// if you're looking for a certain feature in a chart and don't find it here, check themes.js
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
      legend: LEGEND_DEFAULT_STYLE,
      grid: BAR_CHART_GRID_DEFAULT_STYLE,
      tooltip: {
        ...BASE_TOOLTIP_OPIONS,
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
      },
      emphasis: {
        focus: 'series',
      },
      blur: {
        itemStyle: {
          opacity: 0.4,
        },
      },
      animationDelay: DEFAULT_DELAY_FUNCTION,
    },
    horizontal: {
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'category',
      },
      series: {
        type: 'bar',
        itemStyle: {
          borderRadius: [0, 4, 4, 0],
        },
      },
      legend: LEGEND_DEFAULT_STYLE,
      grid: BAR_CHART_GRID_DEFAULT_STYLE,
      tooltip: {
        ...BASE_TOOLTIP_OPIONS,
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
      },
      emphasis: {
        focus: 'series',
      },
      blur: {
        itemStyle: {
          opacity: 0.4,
        },
      },
      animationDelay: DEFAULT_DELAY_FUNCTION,
    },
  },
  line: {
    default: {
      xAxis: { splitLine: { show: true }, type: 'category' },
      yAxis: { type: 'value' },
      series: {
        type: 'line',
        smooth: true,
        showSymbol: false,
      },
      legend: LEGEND_DEFAULT_STYLE,
      tooltip: { ...BASE_TOOLTIP_OPIONS, trigger: 'axis' },
      grid: BAR_CHART_GRID_DEFAULT_STYLE,
    },
  },
}

export const DEFAULT_LOADING_SPINNER: EChartsInstance['showLoading'] = {
  text: '',
  spinnerRadius: 10,
  lineWidth: 3,
  color: defaultSpinnerColor,
}

const _defaultHooks: Map<string, CallableFunction[]> = new Map()
_defaultHooks.set('bar-default', [normalizeBarData])
export const defaultHooks = _defaultHooks
