import { Chart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <Chart
      series={[
        { data: [2, 1, 4, 1, 7, 2, 1, 2, 1, 4, 1, 7, 2, 1], name: 'Series 1' },
        { data: [1, 4, 2, 3, 1, 5, 9, 1, 4, 2, 3, 1, 5, 6], name: 'Series 2' },
      ]}
      xAxis={{ data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] }}
      chartConfig={{ type: 'bar', gap: 3 }}
    />
  )
}
