import { BASE, CATEGORICAL } from './colors'

export const defaultTheme = {
  color: [
    CATEGORICAL.primary,
    CATEGORICAL.secondary,
    CATEGORICAL.tertiary,
    CATEGORICAL.quaternary,
    CATEGORICAL.quinary,
    CATEGORICAL.senary,
    CATEGORICAL.septenary,
    CATEGORICAL.octonary,
    CATEGORICAL.nonary,
    CATEGORICAL.denary,
    CATEGORICAL.undenary,
    CATEGORICAL.duodenary,
    CATEGORICAL.ternary,
    CATEGORICAL.fourteen,
  ],
  categoryAxis: {
    axisTick: {
      show: false,
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: BASE.lineColor,
      },
    },
  },
  valueAxis: {
    type: 'value',
    axisLine: {
      show: true,
      lineStyle: {
        color: BASE.lineColor,
      },
    },
  },
  bar: {
    itemStyle: {
      borderRadius: [4, 4, 0, 0],
    },
  },
}
