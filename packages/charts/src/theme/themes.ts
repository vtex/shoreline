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
  // if enabled, higlighting a series with a shoreline token color makes it go invisible and flicker
  emphasis: { itemStyle: { color: 'inherit' } },
  title: { left: 'center', top: 8 },

  label: {
    color: 'var(--sl-fg-base)',
    fontFamily: 'var(--sl-font-family-sans)',
    fontWeight: 'var(--sl-font-weight-regular)',
    fontSize: 12,
  },

  bar: {
    itemStyle: {
      borderRadius: [4, 4, 0, 0],
    },
    barGap: '1%',
  },
}
