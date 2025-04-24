import { bench } from 'vitest'
import { render } from '@vtex/shoreline-test-utils'
import { CHART_DATA } from './__fixtures__/chartData'
import { ChartCompositor } from '../components'

bench(
  'renders a chart compositor of bar and line chart both with 1 thousand points',
  async () => {
    const { unmount } = render(
      <ChartCompositor
        charts={[
          {
            series: { data: CHART_DATA.series.dayNumbers_1thousand },
            chartConfig: { type: 'line' },
          },
          {
            series: { data: CHART_DATA.series.dayNumbers_1thousand },
            chartConfig: { type: 'bar' },
          },
        ]}
        background={{ type: 'bar' }}
        tooltip={{ type: 'line' }}
      />
    )
    unmount()
  },
  { iterations: 300 }
)

bench(
  'renders a chart compositor of bar and line chart both with 5 thousand points',
  async () => {
    const { unmount } = render(
      <ChartCompositor
        charts={[
          {
            series: { data: CHART_DATA.series.dayNumbers_5thousand },
            chartConfig: { type: 'line' },
          },
          {
            series: { data: CHART_DATA.series.dayNumbers_5thousand },
            chartConfig: { type: 'bar' },
          },
        ]}
        background={{ type: 'bar' }}
        tooltip={{ type: 'line' }}
      />
    )
    unmount()
  },
  { iterations: 300 }
)

bench(
  'renders a chart compositor of bar and line chart both with 10 thousand points',
  async () => {
    const { unmount } = render(
      <ChartCompositor
        charts={[
          {
            series: { data: CHART_DATA.series.dayNumbers_10thousand },
            chartConfig: { type: 'line' },
          },
          {
            series: { data: CHART_DATA.series.dayNumbers_10thousand },
            chartConfig: { type: 'bar' },
          },
        ]}
        background={{ type: 'bar' }}
        tooltip={{ type: 'line' }}
      />
    )
    unmount()
  },
  { iterations: 300 }
)
