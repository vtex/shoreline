import { ChartCompositor } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <ChartCompositor
      charts={[
        { series: { data: [1, 2, 3, 4, 5] }, chartConfig: { type: 'bar' } },
        { series: { data: [1, 3, 2, 5, 4] }, chartConfig: { type: 'line' } },
      ]}
      tooltip={{ type: 'line' }}
    />
  )
}
