import { Chart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <Chart
      style={{ height: 300 }}
      series={[
        { data: [70, 40, 55, 35, 39, 30, 25], name: 'Product A' },
        { data: [0, 0, 5, 10, 25, 45, 55], name: 'Product B' },
      ]}
      xAxis={{ data: ['1º', '2º', '3º', '4º', '5º', '6º', '7º'] }}
      chartConfig={{ type: 'area', variant: 'overlapping' }}
    />
  )
}
