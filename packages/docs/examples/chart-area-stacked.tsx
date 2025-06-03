import { Chart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <Chart
      style={{ height: 550 }}
      series={[
        {
          data: [3, 4, 8, 8, 5, 4, 10, 9, 2, 7, 6, 3, 9, 2, 3],
          stack: 'stack',
          name: 'Serie 1 ',
        },
        {
          data: [5, 4, 5, 9, 6, 8, 7, 2, 8, 5, 3, 9, 4, 9, 5],
          stack: 'stack',
          name: 'Serie 2',
        },
      ]}
      chartConfig={{ type: 'line', variant: 'area' }}
    />
  )
}
