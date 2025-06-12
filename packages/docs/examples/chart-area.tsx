import { Chart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <Chart
      style={{ height: 300 }}
      series={[
        { data: [70, 40, 55, 35, 39, 30, 25], name: 'Product A' },
        { data: [0, 0, 5, 10, 25, 45, 55], name: 'Product B' },
      ]}
      xAxis={{ data: ['一', '二', '三', '四', '五', '六', '七'] }}
      chartConfig={{ type: 'area', variant: 'overlapping' }}
    />
  )
}
