import { ChartCompositor } from '@vtex/shoreline-charts'
const data1: number[] = []
const data2: number[] = []

for (let i = 0; i < 25; i++) {
  data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
  data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5)
}

export default function Example() {
  return (
    <ChartCompositor
      charts={[
        { serie: { data: data1, name: 'Bar 1' }, config: { type: 'bar' } },
        { serie: { data: data2, name: 'Bar 2' }, config: { type: 'bar' } },
        {
          serie: {
            data: data2.map((v) => {
              v > 0 ? v + 2 : v - 2
            }),
            name: 'Line',
          },
          config: { type: 'line' },
        },
      ]}
      background={{ type: 'bar' }}
      tooltip={{ type: 'line' }}
    />
  )
}
