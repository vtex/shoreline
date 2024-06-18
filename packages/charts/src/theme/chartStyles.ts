export const CHART_STYLES: any = {
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
    },
  },
  line: {
    default: {},
  },
}
