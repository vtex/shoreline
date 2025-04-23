import type { EChartsOption } from 'echarts'
import type { DefaultChartStyles } from '../types/chart'
import type { EChartsInstance } from 'echarts-for-react'
import { defaultSpinnerColor } from './colors'
import { getTooltipStaticString } from '../components/tooltip'

const BASE_TOOLTIP_OPIONS: EChartsOption['tooltip'] = {
  trigger: 'item',
  borderWidth: 1,
  borderColor: 'var(--sl-color-gray-4)',
  extraCssText:
    'padding-top: 12px; padding-bottom: 12px; padding-left: 16px; padding-right: 16px',
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
  icon: 'roundRect',
}

export const GRID_DEFAULT_STYLE: EChartsOption['grid'] = {
  left: 'auto',
  right: 'auto',
  top: '5',
  bottom: '13%',
  containLabel: true,
}

export const DATAZOOM_DEFAULT_STYLE: EChartsOption['dataZoom'] = [
  {
    type: 'inside',
  },
  {
    type: 'slider',
    //Sizing
    right: '0.6%',
    bottom: '6%',
    height: '6%',
    //Styles
    selectedDataBackground: {
      lineStyle: {
        color: 'rgba(1,103,223,255)',
        width: 1.2,
      },
      areaStyle: {
        color: 'rgba(192,226,253,255)',
      },
    },
    handleStyle: {
      color: 'rgba(1,103,223,255)',
      borderColor: 'rgba(1,103,223,255)',
    },
    moveHandleStyle: {
      color: 'rgba(244,244,244,255)',
    },
    emphasis: {
      moveHandleStyle: {
        color: 'rgba(231,231,231,255)',
      },
      handleStyle: {
        color: 'rgba(2,84,183,255)',
        borderColor: 'rgba(2,84,183,255)',
      },
    },
  },
]

export const DEFAULT_DELAY_FUNCTION = (idx: number) => idx * 20

// if you're looking for a certain feature in a chart and don't find it here, check themes.ts
export const CHART_STYLES: DefaultChartStyles = {
  bar: {
    vertical: {
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
      grid: GRID_DEFAULT_STYLE,
      tooltip: {
        ...BASE_TOOLTIP_OPIONS,
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          z: -1,
          shadowStyle: { color: '#F5F5F5', opacity: '1' },
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
      grid: GRID_DEFAULT_STYLE,
      tooltip: {
        ...BASE_TOOLTIP_OPIONS,
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          z: -1,
          shadowStyle: { color: '#F5F5F5', opacity: '1' },
        },
      },

      animationDelay: DEFAULT_DELAY_FUNCTION,
    },
  },
  line: {
    default: {
      xAxis: { type: 'category' },
      yAxis: { type: 'value' },
      series: {
        type: 'line',
        smooth: true,
        showSymbol: false,
      },
      dataZoom: DATAZOOM_DEFAULT_STYLE,
      legend: LEGEND_DEFAULT_STYLE,
      tooltip: { ...BASE_TOOLTIP_OPIONS, trigger: 'axis' },
      grid: GRID_DEFAULT_STYLE,
    },
  },
}

export const DEFAULT_LOADING_SPINNER: EChartsInstance['showLoading'] = {
  text: '',
  spinnerRadius: 10,
  lineWidth: 3,
  color: defaultSpinnerColor,
}
