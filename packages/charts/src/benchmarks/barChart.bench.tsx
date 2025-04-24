import { bench } from 'vitest'
import { Chart } from '../components/chart'
import { render } from '@vtex/shoreline-test-utils'
import { CHART_DATA } from './__fixtures__/chartData'

bench(
  'renders bar chart with 1 thousand points',
  async () => {
    const { unmount } = render(
      <Chart
        option={{
          series: [{ data: CHART_DATA.series.dayNumbers_1thousand }],
        }}
        chartConfig={{
          type: 'bar',
        }}
        style={{ width: '100%', height: '100%' }}
      />
    )
    unmount()
  },
  { iterations: 300 }
)

bench(
  'renders bar chart with 5 thousand points',
  async () => {
    const { unmount } = render(
      <Chart
        option={{
          series: [{ data: CHART_DATA.series.dayNumbers_5thousand }],
          tooltip: {},
        }}
        chartConfig={{
          type: 'bar',
        }}
        style={{ width: '100%', height: '100%' }}
      />
    )
    unmount()
  },
  { iterations: 300 }
)

bench(
  'renders bar chart with 10 thousand points',
  async () => {
    const { unmount } = render(
      <Chart
        option={{
          series: [{ data: CHART_DATA.series.dayNumbers_10thousand }],
        }}
        chartConfig={{
          type: 'bar',
        }}
        style={{ width: '100%', height: '100%' }}
      />
    )
    unmount()
  },
  { iterations: 300 }
)
