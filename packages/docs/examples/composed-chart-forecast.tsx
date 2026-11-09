import { ComposedChart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <ComposedChart
      label="Revenue history, trend and forecast by month"
      categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']}
      series={[
        {
          type: 'bar',
          name: 'Revenue',
          data: [4200, 5100, 4800, 6300, 5900, 7200, null, null],
        },
        {
          type: 'line',
          name: 'Trend',
          data: [4300, 4900, 5200, 5800, 6300, 6900, null, null],
        },
        {
          type: 'line',
          name: 'Forecast',
          variant: 'forecast',
          data: [null, null, null, null, null, null, 7400, 7900],
        },
      ]}
    />
  )
}
