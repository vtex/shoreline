import type { EChartsOption } from 'echarts'
import type { DefaultChartStyles } from '../types/chart'
import type { EChartsInstance } from 'echarts-for-react'
import { defaultSpinnerColor } from './colors'

export const BAR_CHART_LEGEND_DEFAULT_STYLE: EChartsOption['legend'] = {
  orient: 'horizontal',
  left: '10rem',
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
  top: '10%',
  bottom: '10%',
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
      series: {
        type: 'bar',
        itemStyle: {
          borderRadius: [0, 4, 4, 0],
        },
      },
    },
  },
  line: {
    default: {},
    base: {},
  },
}

export const DEFAULT_LOADING_SPINNER: EChartsInstance['showLoading'] = {
  text: '',
  spinnerRadius: 10,
  lineWidth: 3,
  color: defaultSpinnerColor,
}
