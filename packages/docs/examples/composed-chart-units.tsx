import { ComposedChart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <ComposedChart
      label="Orders and returning orders by month"
      categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
      series={[
        {
          type: 'bar',
          name: 'Orders',
          data: [420, 510, 480, 630, 590, 720],
        },
        {
          type: 'line',
          name: 'Returning orders',
          data: [120, 150, 140, 210, 190, 260],
        },
      ]}
    />
  )
}
