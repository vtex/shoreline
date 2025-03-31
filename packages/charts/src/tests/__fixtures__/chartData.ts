export const BAR_CHART_DATA = {
  xAxis: {
    weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  series: {
    dayNumbers: [1, 2, 3, 4, 5, 6, 7],
  },
}

const dayNumbers_100thousand = []
for (let i = 0; i < 100_000; i++) {
  dayNumbers_100thousand.push(i)
}

const dayNumbers_10thousand = []
for (let i = 0; i < 10_000; i++) {
  dayNumbers_10thousand.push(i)
}

export const LINE_CHART_DATA = {
  xAxis: {
    weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  series: {
    dayNumbers: [1, 2, 3, 4, 5, 6, 7],
    dayNumbers_100thousand: dayNumbers_100thousand,
    dayNumbers_10thousand: dayNumbers_10thousand,
  },
}

export const CHART_COMPOSITOR_DATA = {
  charts: [
    { serie: { data: [1, 2, 3, 4, 5] }, config: { type: 'bar' } },
    { serie: { data: [1, 3, 2, 5, 4] }, config: { type: 'line' } },
  ],
  background: { type: 'bar' },
  tooltip: { type: 'line' },
}
