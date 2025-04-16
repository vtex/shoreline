import { defaultChartColorConfig, defaultColorPreset } from './colors'

export const defaultTheme = {
  color: defaultColorPreset,
  categoryAxis: {
    axisTick: {
      show: false,
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: defaultChartColorConfig.lineColor,
      },
    },
    axisLabel: {
      color: defaultChartColorConfig.textSoft,
    },
  },
  valueAxis: {
    type: 'value',
    axisLine: {
      show: false,
    },
    axisLabel: {
      color: defaultChartColorConfig.textSoft,
    },
    splitLine: {
      lineStyle: {
        color: defaultChartColorConfig.bgLineColor,
        width: 1,
      },
    },
  },
  bar: {
    itemStyle: {
      borderRadius: [4, 4, 0, 0],
    },
    barMaxWidth: '60%',
    barMinWidth: '30%',
    barGap: '1%',
    barCategoryGap: '15%',
  },
}
