import { Chart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <Chart
      style={{ height: 550 }}
      series={[
        { data: [6, 5, 2, 7, 1, 10, 6, 5, 1, 5], name: 'Serie 1' },
        { data: [4, 7, 5, 2, 6, 2, 6, 2, 6, 8], name: 'Serie 2' },
      ]}
      chartConfig={{ type: 'line', variant: 'area' }}
    />
  )
}
