import { Chart } from '@vtex/shoreline-charts'

const hook = (options) => {
  const a = options.series[0]
  const b = options.series[1]
  console.log(a.data[1])
  const average = options.xAxis.data.map((_, i) => (a.data[i] + b.data[i]) / 2)
  console.log(average)
  options.series.push({
    data: average,
    name: 'Average',
    type: 'line',
    smooth: true,
  })
  // some extra styling info needs to be passed since this runs after default styles are applied
  return options
}

export default function Example() {
  return (
    <Chart
      chartConfig={{ type: 'line' }}
      xAxis={{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }}
      series={[
        { data: [1, 2, 3, 4, 5, 6, 7], name: 'A' },
        { data: [11, 7, 5, 2, 3, 1, 13], name: 'B' },
      ]}
      optionHooks={[hook]}
    />
  )
}
