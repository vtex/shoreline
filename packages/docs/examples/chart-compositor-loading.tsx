import { ChartCompositor } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <ChartCompositor
      charts={[]}
      tooltip={{ type: 'line' }}
      loading={true}
      xAxis={{ type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] }}
      yAxis={{ type: 'value', splitLine: { show: true } }}
    />
  )
}
