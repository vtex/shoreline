export const BAR_CHART_DATA = {
  xAxis: {
    weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  series: {
    dayNumbers: [1, 2, 3, 4, 5, 6, 7],
  },
}

const dayNumbers_100thousand = []
const numbers_50thousand = []
const dayNumbers_30thousand = []
const dayNumbers_20thousand = []
const dayNumbers_10thousand = []
const numbers_5thousand = []
const numbers_4thousand = []
const numbers_1thousand = []

for (let i = 0; i < 100_000; i++) {
  dayNumbers_100thousand.push(i)
  if (i <= 1000) numbers_1thousand.push(i)
  if (i <= 4_000) numbers_4thousand.push(i)
  if (i <= 5_000) numbers_5thousand.push(i)
  if (i <= 10_000) dayNumbers_10thousand.push(i)
  if (i <= 20_000) dayNumbers_20thousand.push(i)
  if (i <= 30_000) dayNumbers_30thousand.push(i)
  if (i <= 50_000) numbers_50thousand.push(i)
}

export const CHART_DATA = {
  xAxis: {
    weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  series: {
    dayNumbers: [1, 2, 3, 4, 5, 6, 7],
    dayNumbers_100thousand: dayNumbers_100thousand,
    dayNumbers_50thousand: numbers_50thousand,
    dayNumbers_30thousand: dayNumbers_30thousand,
    dayNumbers_20thousand: dayNumbers_20thousand,
    dayNumbers_10thousand: dayNumbers_10thousand,
    dayNumbers_5thousand: numbers_5thousand,
    dayNumbers_1thousand: numbers_1thousand,
  },
}

export const CHART_COMPOSITOR_DATA = {
  data1: [1, 2, 3, 4, 5],
  data2: [1, 3, 2, 5, 4],
  data4_thousand: numbers_4thousand,
  data5_thousand: numbers_5thousand,
  data50_thousand: numbers_50thousand,
}
