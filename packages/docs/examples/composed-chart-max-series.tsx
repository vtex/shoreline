import { ComposedChart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <ComposedChart
      label="Sales by channel with average order value"
      categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
      series={[
        {
          type: 'bar',
          name: 'Website',
          data: [2300, 2900, 2500, 3400, 3100, 3800],
        },
        {
          type: 'bar',
          name: 'Marketplace',
          data: [1200, 1400, 1500, 1800, 1900, 2200],
        },
        {
          type: 'bar',
          name: 'Physical store',
          data: [700, 800, 800, 1100, 900, 1200],
        },
        {
          type: 'bar',
          name: 'Social',
          data: [300, 350, 400, 500, 450, 600],
        },
        {
          type: 'bar',
          name: 'Phone',
          data: [120, 140, 90, 200, 160, 180],
        },
        {
          type: 'line',
          name: 'Average order',
          data: [900, 950, 920, 1100, 1050, 1200],
        },
      ]}
    />
  )
}
