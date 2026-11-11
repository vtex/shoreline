import { BarChart } from '@vtex/shoreline-charts'
import type { ChartTooltipDelta } from '@vtex/shoreline-charts'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const revenue = [4200, 5100, 4800, 6300, 5900, 7200]

// Period-over-period change for each month. direction and tone are
// independent: a fall is critical for revenue but would be success for
// complaints. The comparison data is not plotted, it only feeds the tooltip.
const deltas: Array<ChartTooltipDelta | null> = [
  { value: '7.7%', direction: 'up', tone: 'success' },
  { value: '3.8%', direction: 'down', tone: 'critical' },
  { value: '0.0%', direction: 'flat' },
  { value: '14.5%', direction: 'up', tone: 'success' },
  { value: '3.3%', direction: 'down', tone: 'critical' },
  { value: '12.5%', direction: 'up', tone: 'success' },
]

export default function Example() {
  return (
    <BarChart
      label="Revenue by month, compared with the previous period"
      categories={months}
      series={[{ name: 'Revenue', data: revenue, deltas }]}
    />
  )
}
