import { Chart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <Chart
      chartConfig={{ type: 'line' }}
      series={[
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          lineStyle: { type: 'dashed' },
          name: 'Trend',
        },
        {
          data: [820, 832, 920, 834, 990, 830, 910],
          color: '#adadad',
          name: 'Solid',
        },
      ]}
      xAxis={{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }}
      style={{ height: 550 }}
    />
  )
}
