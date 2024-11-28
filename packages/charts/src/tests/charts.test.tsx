import {
  describe,
  expect,
  test,
  render,
  waitFor,
  screen,
} from '@vtex/shoreline-test-utils'
import { Chart } from '../components/chart'
import { BAR_CHART_DATA } from './__fixtures__/chartData'
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import React from 'react'

describe('@vtex.shoreline-charts bar chart tests', () => {
  test('renders the bar chart with correct data', async () => {
    const { container } = render(
      <Chart
        option={{
          xAxis: {
            data: BAR_CHART_DATA.xAxis.weekdays,
          },
          series: { data: BAR_CHART_DATA.series.dayNumbers },
        }}
        chartConfig={{ type: 'bar' }}
        style={{ width: '100%', height: '400px' }}
      />
    )

    const divChartContainer = container.querySelector('[data-sl-chart]')
    await waitFor(() => expect(divChartContainer).toBeInTheDocument())

    BAR_CHART_DATA.xAxis.weekdays.forEach((value) =>
      waitFor(() => expect(screen.queryByText(value)).toBeInTheDocument())
    )

    BAR_CHART_DATA.series.dayNumbers.forEach((value) =>
      waitFor(() => expect(screen.queryByText(value)).toBeInTheDocument())
    )
  })
})
