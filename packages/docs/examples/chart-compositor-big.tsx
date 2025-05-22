import { ChartCompositor } from '@vtex/shoreline-charts'
const data1: number[] = []
const data2: number[] = []
const data3: number[] = []

for (let i = 0; i < 25; i++) {
  data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
  data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5)
  data3.push((data1[i] + data2[i]) / 2)
}

export default function Example() {
  return (
    <ChartCompositor
      charts={[
        {
          series: { data: data1, name: 'Bar 1' },
          chartConfig: { type: 'bar' },
        },
        {
          series: { data: data2, name: 'Bar 2' },
          chartConfig: { type: 'bar' },
        },
        {
          series: { data: data3, name: 'Average' },
          chartConfig: { type: 'line' },
        },
      ]}
      tooltip={{ type: 'line' }}
      style={{ height: 450 }}
      zoom
    />
  )
}
