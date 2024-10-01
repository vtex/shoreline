export const BAR_CHART_LEGEND_DEFAULT_STYLE = {
  orient: 'horizontal',
  left: '3%',
  bottom: 0,
  align: 'left',
  itemWidth: 16,
  itemHeight: 16,
  padding: 0,
  itemGap: 20,
}

export const BAR_CHART_GRID_DEFAULT_STYLE = {
  left: '5%',
  right: '0%',
  top: '10%',
  bottom: '10%',
}

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
      barGap: '20%',
      barCategoryGap: '50%',
      legend: BAR_CHART_LEGEND_DEFAULT_STYLE,
      grid: BAR_CHART_GRID_DEFAULT_STYLE,
    },
    horizontal: {
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'category',
      },
      barGap: '20%',
      barCategoryGap: '50%',
      legend: BAR_CHART_LEGEND_DEFAULT_STYLE,
      grid: BAR_CHART_GRID_DEFAULT_STYLE,
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
