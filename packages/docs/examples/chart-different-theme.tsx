import { Chart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <Chart
      chartConfig={{ type: 'bar', variant: 'vertical', gap: 1 }}
      xAxis={{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }}
      series={{
        data: [1, 2, 3, 4, 5, 6, 7],
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
        },
      }}
      option={{ color: ['#D95030'] }}
    />
  )
}
