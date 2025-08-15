import { Chart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <Chart
      chartConfig={{ type: 'bar', variant: 'stacked', gap: 3 }}
      xAxis={{ data: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] }}
      series={[
        { data: [3000, 4000, 3500, 4000, 6000, 5250], name: 'Store A' },
        { data: [0, 1500, 2250, 3111, 3250, 3500], name: 'Store B' },
        { data: [4000, 3000, 2500, 1900, 0, 0], name: 'Store C' },
        { data: [4000, 3000, 2500, 1900, 0, 0], name: 'Store D' },
      ]}
    />
  )
}
