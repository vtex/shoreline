import { Chart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <Chart
      xAxis={{ data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] }}
      series={[
        { data: [3, 2, 3, 4, 1, 9, 7], name: 'Series 1' },
        { data: [1, 4, 2, 3, 1, 5, 4], name: 'Series 2' },
        { data: [5, 5, 1, 5, 5, 2, 7], name: 'Series 3' },
      ]}
      chartConfig={{ type: 'bar', gap: 2 }}
    />
  )
}
