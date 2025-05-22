import { Chart, ChartCompositor } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <>
      <ChartCompositor
        charts={[
          {
            series: {
              data: [3, 4, 3, 11, 5, 8, 6, 6, 10, 6, 8, 6],
              name: 'Data 1',
            },
            chartConfig: { type: 'bar' },
          },
          {
            series: {
              data: [1, 8, 7, 11, 7, 3, 6, 7, 0, 11, 6, 8],
              name: 'Data 2',
            },
            chartConfig: { type: 'line' },
          },
        ]}
        tooltip={{ type: 'bar' }}
        xAxis={{
          data: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'I', 'J', 'K', 'L'],
        }}
        group="sync"
      />
      <Chart
        series={[
          { data: [5, 6, 1, -12, 2, -7, 10, 7, 10, 9, 3, 5], name: 'Data 1' },
          { data: [10, -4, 6, 11, 9, 10, -6, 2, -8, -4, 3, 4], name: 'Data 2' },
        ]}
        xAxis={{
          data: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'I', 'J', 'K', 'L'],
        }}
        chartConfig={{ type: 'bar', gap: 2 }}
        group="sync"
      />
    </>
  )
}
