import { Chart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <Chart
      chartConfig={{ type: 'area', variant: 'stacked' }}
      // biome-ignore format: matrix
      series={[
          { data: [3, 4, 8, 8, 5, 4, 10, 9, 2, 7, 6, 3, 9, 2, 3], name: 'Series 1' },
          { data: [5, 4, 5, 9, 6, 8, 7, 2, 8, 5, 3, 9, 4, 9, 5], name: 'Series 2' },
          { data: [5, 4, 5, 9, 6, 8, 7, 4, 8, 5, 3, 9, 4, 9, 5], name: 'Series 3' },
          { data: [5, 4, 5, 9, 6, 8, 7, 6, 8, 5, 3, 9, 4, 9, 5], name: 'Series 4' },
          { data: [5, 4, 5, 9, 6, 8, 7, 8, 8, 5, 3, 9, 4, 9, 5], name: 'Series 5' }]}
      style={{ height: 400 }}
    />
  )
}
