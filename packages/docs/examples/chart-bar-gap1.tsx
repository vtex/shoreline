import { Chart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <Chart
      xAxis={{ data: ['Mon', 'Tue', 'Wed'] }}
      series={[
        { data: [3, 2, 1], name: 'Series 1' },
        { data: [1, 4, 3], name: 'Series 2' },
      ]}
      chartConfig={{ type: 'bar', gap: 1 }}
    />
  )
}
