import { Chart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <Chart
      chartConfig={{ type: 'bar', variant: 'vertical' }}
      xAxis={{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }}
      series={{
        data: [1, 2, 3, 4, 5, 6, 7],
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
        },
      }}
      option={{
        barGap: '5%',
        color: ['#D95030'],
      }}
    />
  )
}
