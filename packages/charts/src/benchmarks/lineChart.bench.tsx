import { beforeAll, bench } from 'vitest'
import { Chart } from '../components/chart'
import { render } from '@vtex/shoreline-test-utils'
import { CHART_DATA } from './__fixtures__/chartData'

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
    configurable: true,
    value: 300,
  })
  Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
    configurable: true,
    value: 200,
  })
})

bench(
  'renders line chart with 1 thousand points',
  async () => {
    const { unmount } = render(
      <Chart
        series={{ data: CHART_DATA.series.dayNumbers_1thousand }}
        chartConfig={{
          type: 'line',
        }}
        style={{ width: '100%', height: '100%' }}
      />
    )
    unmount()
  },
  { iterations: 300 }
)

bench(
  'renders line chart with 5 thousand points',
  async () => {
    const { unmount } = render(
      <Chart
        series={{ data: CHART_DATA.series.dayNumbers_5thousand }}
        chartConfig={{
          type: 'line',
        }}
        style={{ width: '100%', height: '100%' }}
      />
    )
    unmount()
  },
  { iterations: 300 }
)

bench(
  'renders line chart with 10 thousand points',
  async () => {
    const { unmount } = render(
      <Chart
        series={{ data: CHART_DATA.series.dayNumbers_10thousand }}
        chartConfig={{
          type: 'line',
        }}
        style={{ width: '100%', height: '100%' }}
      />
    )
    unmount()
  },
  { iterations: 300 }
)

bench(
  'renders line chart with 30 thousand points',
  async () => {
    const { unmount } = render(
      <Chart
        series={{ data: CHART_DATA.series.dayNumbers_30thousand }}
        chartConfig={{
          type: 'line',
        }}
        style={{ width: '100%', height: '100%' }}
      />
    )
    unmount()
  },
  { iterations: 300 }
)

bench(
  'renders line chart with 50 thousand points',
  async () => {
    const { unmount } = render(
      <Chart
        series={{ data: CHART_DATA.series.dayNumbers_50thousand }}
        chartConfig={{
          type: 'line',
        }}
        style={{ width: '100%', height: '100%' }}
      />
    )
    unmount()
  },
  { iterations: 300 }
)

bench(
  'renders line chart with 100 thousand points',
  async () => {
    const { unmount } = render(
      <Chart
        series={{ data: CHART_DATA.series.dayNumbers_100thousand }}
        chartConfig={{
          type: 'line',
        }}
        style={{ width: '100%', height: '100%' }}
      />
    )
    unmount()
  },
  { iterations: 300 }
)
