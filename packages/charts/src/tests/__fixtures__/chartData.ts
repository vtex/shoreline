export const BAR_CHART_DATA = {
  xAxis: {
    weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  series: {
    dayNumbers: [1, 2, 3, 4, 5, 6, 7],
  },
}

const dayNumbers1milion = []
for (let i = 0; i < 100000; i++) {
  dayNumbers1milion.push(i)
}

export const LINE_CHART_DATA = {
  xAxis: {
    weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  series: {
    dayNumbers: [1, 2, 3, 4, 5, 6, 7],
    dayNumbers1milion: dayNumbers1milion,
  },
}
