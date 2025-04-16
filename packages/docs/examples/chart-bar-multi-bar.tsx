import { Chart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <Chart
      option={{
        xAxis: {
          data: ['Mon', 'Tue', 'Wed'],
        },
        series: [
          { data: [3, 2, 3, 4], name: 'Series 1' },
          { data: [1, 4, 2, 3], name: 'Series 2' },
          { data: [2, 1, 4, 1], name: 'Series 3' },
        ],
      }}
      chartConfig={{ type: 'bar' }}
    />
  )
}
