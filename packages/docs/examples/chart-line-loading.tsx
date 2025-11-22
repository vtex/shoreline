import { Chart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <Chart
      chartConfig={{ type: 'line' }}
      xAxis={{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }}
      series={{}}
      style={{ height: 550 }}
      loading={true}
    />
  )
}
