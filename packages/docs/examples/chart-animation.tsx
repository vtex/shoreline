import { Chart } from '@vtex/shoreline-charts'

const data2: number[] = []
const data1: number[] = []

for (let i = 0; i < 25; i++) {
  data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
  data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5)
}

export default function Example() {
  return (
    <Chart
      option={{
        barGap: 0,
        catgoryGap: 0,
        series: [
          { data: data1, name: 'Default animation' },
          {
            data: data2,
            name: 'Custom animation',
            animationDelay: (idx) => idx * 50,
            animationEasing: 'elasticInOut',
          },
        ],
        title: {
          text: 'Reload animation by clicking on the legend',
          left: 'center',
        },
      }}
      chartConfig={{ type: 'bar' }}
    />
  )
}
