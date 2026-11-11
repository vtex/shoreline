import { BarChart } from '@vtex/shoreline-charts'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

export default function Example() {
  return (
    <BarChart
      label="Revenue and cost by month"
      categories={months}
      series={[
        { name: 'Revenue', data: [4200, 5100, 4800, 6300, 5900, 7200] },
        { name: 'Cost', data: [2100, 2400, 2600, 2900, 2700, 3100] },
        {
          name: 'Profit',
          data: [2100, 2700, 2200, 3400, 3200, 4100],
        },
      ]}
    />
  )
}
