import { Chart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <Chart
      chartConfig={{ type: 'line' }}
      series={{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        lineStyle: { type: 'dashed' },
      }}
      xAxis={{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }}
      style={{ height: 550 }}
    />
  )
}
