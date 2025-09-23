import type { EChartsOption } from 'echarts'
import type { DefaultChartStyles } from '../types/chart'
import type { EChartsInstance } from 'echarts-for-react'
import { defaultSpinnerColor } from './colors'
import { getTooltipStaticString } from '../components/tooltip'

const BASE_TOOLTIP_OPIONS: EChartsOption['tooltip'] = {
  trigger: 'axis',
  borderWidth: 1,
  borderColor: 'var(--sl-color-gray-4)',
  confine: true,
  extraCssText:
    'min-width: 128px; max-width: 268px; padding: var(--sl-space-3) var(--sl-space-4);',
  formatter: (params) => {
    return getTooltipStaticString(params)
  },
}

export const LEGEND_DEFAULT_STYLE: EChartsOption['legend'] = { show: false }

export const GRID_DEFAULT_STYLE: EChartsOption['grid'] = {
  left: '0',
  right: '8',
  top: '8',
  bottom: '1',
  containLabel: true,
}

export const DATAZOOM_DEFAULT_STYLE: EChartsOption['dataZoom'] = [
  {
    type: 'inside',
  },
  {
    type: 'slider',
    //Sizing
    right: 'center',
    bottom: '9%',
    height: '9%',
    width: '95%',
    //Styles
    borderColor: 'var(--sl-color-gray-5)',
    backgroundColor: 'var(--sl-color-gray-0)',
    dataBackground: {
      areaStyle: {
        color: 'var(--sl-color-gray-1)',
      },
    },
    fillerColor: '#0064C30D',
    selectedDataBackground: {
      lineStyle: {
        color: 'rgba(1,103,223,255)',
        width: 1.2,
      },
      areaStyle: {
        color: '#D6ECFC',
        opacity: 1,
      },
    },

    handleStyle: {
      // side things
      color: 'rgba(1,103,223,255)',
      borderColor: 'rgba(1,103,223,255)',
    },
    moveHandleStyle: {
      // top drag bar
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
      grid: GRID_DEFAULT_STYLE,
      tooltip: {
        ...BASE_TOOLTIP_OPIONS,
        axisPointer: {
          type: 'shadow',
          z: -1,
          shadowStyle: { color: 'var(--sl-color-gray-1)', opacity: 1 },
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
      grid: GRID_DEFAULT_STYLE,
      tooltip: {
        ...BASE_TOOLTIP_OPIONS,
        axisPointer: {
          type: 'shadow',
          z: -1,
          shadowStyle: { color: 'var(--sl-color-gray-1)', opacity: 1 },
        },
      },

      animationDelay: DEFAULT_DELAY_FUNCTION,
    },
    stacked: {
      xAxis: { type: 'category' },
      yAxis: { type: 'value' },
      series: {
        type: 'bar',
        stack: '__stack',
        itemStyle: {
          borderRadius: 0,
          borderWidth: 2,
          borderColor: '#FFFFFF00',
        },
      },
      grid: GRID_DEFAULT_STYLE,
      tooltip: {
        ...BASE_TOOLTIP_OPIONS,
        formatter: (params) => {
          return getTooltipStaticString(params, true)
        },
        axisPointer: {
          type: 'shadow',
          z: -1,
          shadowStyle: { color: 'var(--sl-color-gray-1)', opacity: 1 },
        },
      },
      animationDelay: DEFAULT_DELAY_FUNCTION,
    },
    'percentage stack': {
      xAxis: { type: 'category' },
      yAxis: {
        type: 'value',
        axisLabel: { formatter: (value) => `${value * 100}%` },
      },
      series: {
        type: 'bar',
        stack: '__stack%',
        itemStyle: {
          borderRadius: 0,
        },
      },
      grid: GRID_DEFAULT_STYLE,
      tooltip: {
        ...BASE_TOOLTIP_OPIONS,
        formatter: (params) => {
          return getTooltipStaticString(params, true, true)
        },
        axisPointer: {
          type: 'shadow',
          z: -1,
          shadowStyle: { color: 'var(--sl-color-gray-1)', opacity: 1 },
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
        emphasis: { itemStyle: { color: '#FFFFFF' } },
      },
      tooltip: { ...BASE_TOOLTIP_OPIONS },
      grid: GRID_DEFAULT_STYLE,
      animationDuration: 750,
      animationDurationUpdate: 300,
      animationEasing: 'cubicInOut',
      animationEasingUpdate: 'cubicInOut',
    },
  },

  area: {
    overlapping: {
      xAxis: { type: 'category', boundaryGap: false },
      yAxis: { type: 'value' },
      series: {
        type: 'line',
        smooth: true,
        showSymbol: false,
        areaStyle: { opacity: 0.2 },
        emphasis: { itemStyle: { color: '#FFFFFF' } },
      },
      tooltip: {
        ...BASE_TOOLTIP_OPIONS,
        formatter: (params) => {
          return getTooltipStaticString(params, true)
        },
      },
      grid: GRID_DEFAULT_STYLE,
      animationDuration: 750,
      animationDurationUpdate: 300,
      animationEasing: 'cubicInOut',
      animationEasingUpdate: 'cubicInOut',
    },
    stacked: {
      xAxis: { type: 'category', boundaryGap: false },
      yAxis: { type: 'value' },
      series: {
        type: 'line',
        smooth: true,
        showSymbol: false,
        areaStyle: { opacity: 0.15 },
        emphasis: { itemStyle: { color: '#FFFFFF' } },
        stack: '_STACK',
      },
      tooltip: {
        ...BASE_TOOLTIP_OPIONS,
        formatter: (params) => {
          return getTooltipStaticString(params, true)
        },
      },
      grid: GRID_DEFAULT_STYLE,
      animationDuration: 750,
      animationDurationUpdate: 300,
      animationEasing: 'cubicInOut',
      animationEasingUpdate: 'cubicInOut',
    },
  },

  funnel: {
    default: {
      series: {
        type: 'funnel',
        label: {
          show: true,
          position: 'inside',
        },
      },
      tooltip: { ...BASE_TOOLTIP_OPIONS, trigger: 'item' },
      grid: { ...GRID_DEFAULT_STYLE },
      legend: { ...LEGEND_DEFAULT_STYLE, left: 'center' },
    },
  },
  sunburst: {
    default: {
      series: {
        type: 'sunburst',
        radius: '100%',
        label: { rotate: 'radial' },
        emphasis: { focus: 'relative' },
        selectedMode: true,
      },
      grid: { ...GRID_DEFAULT_STYLE },
      // tooltip: { ...BASE_TOOLTIP_OPIONS, trigger: 'item' },
    },
  },
  donut: {
    default: {
      series: {
        type: 'pie',
        radius: ['50%', '90%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
      },
      grid: { ...GRID_DEFAULT_STYLE },
      // legend: { ...LEGEND_DEFAULT_STYLE, left: 'center' },
    },
  },
}

export const DEFAULT_LOADING_SPINNER: EChartsInstance['showLoading'] = {
  data: [],
  xAxis: { type: 'category' },
  text: '',
  spinnerRadius: 10,
  lineWidth: 3,
  color: defaultSpinnerColor,
}
