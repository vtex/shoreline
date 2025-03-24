import { ChartCompositor } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <ChartCompositor
      charts={[
        { serie: { data: [1, 2, 3, 4, 5] }, config: { type: 'bar' } },
        { serie: { data: [1, 3, 2, 5, 4] }, config: { type: 'line' } },
      ]}
      background={{ type: 'bar' }}
      tooltip={{ type: 'line' }}
    />
  )
}
