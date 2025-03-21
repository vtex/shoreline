import {
  describe,
  expect,
  test,
  render,
  waitFor,
  screen,
} from '@vtex/shoreline-test-utils'
import { assert } from 'vitest'
import { Chart } from '../components/chart'
import { BAR_CHART_DATA, LINE_CHART_DATA } from './__fixtures__/chartData'
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

describe('@vtex.shoreline-charts line chart test', () => {
  test('renders the line chart with correct data', async () => {
    const { container } = render(
      <Chart
        option={{
          xAxis: {
            data: LINE_CHART_DATA.xAxis.weekdays,
          },
          series: { data: LINE_CHART_DATA.series.dayNumbers },
        }}
        chartConfig={{
          type: 'line',
        }}
        style={{ width: '100%', height: '400px' }}
      />
    )

    const divChartContainer = container.querySelector('[data-sl-chart]')
    await waitFor(() => expect(divChartContainer).toBeInTheDocument())

    LINE_CHART_DATA.xAxis.weekdays.forEach((value) =>
      waitFor(() => expect(screen.queryByText(value)).toBeInTheDocument())
    )

    LINE_CHART_DATA.series.dayNumbers.forEach((value) =>
      waitFor(() => expect(screen.queryByText(value)).toBeInTheDocument())
    )

    LINE_CHART_DATA.xAxis.weekdays.forEach((value) =>
      waitFor(() => expect(screen.queryByText(value)).toBeInTheDocument())
    )
  })
})

describe('@vtex.shoreline-charts line chart test', () => {
  test('tries to render a 100 thousand points chart under 5 seconds', async () => {
    const after = Date.now()

    render(
      <Chart
        option={{
          series: { data: LINE_CHART_DATA.series.dayNumbers_100thousand },
        }}
        chartConfig={{
          type: 'line',
        }}
        style={{ width: '100%', height: '400px' }}
      />
    )

    const before = Date.now()
    assert(before - after < 5000, 'testing the rendering time')
  })
})

describe('@vtex.shoreline-charts line chart test', () => {
  test('tries to render a 10 thousand points chart under 80 miliseconds', async () => {
    const benchmark = 80

    const after = Date.now()

    render(
      <Chart
        option={{
          series: { data: LINE_CHART_DATA.series.dayNumbers_10thousand },
        }}
        chartConfig={{
          type: 'line',
        }}
        style={{ width: '100%', height: '400px' }}
      />
    )

    const before = Date.now()
    assert(
      before - after < benchmark,
      `testing the rendering time with the ${benchmark} miliseconds benchmark`
    )
  })
})

describe('@vtex.shoreline-charts line chart test', () => {
  test('tries to render a 100 thousand points chart under 120 miliseconds', async () => {
    const benchmark = 120

    const after = Date.now()

    render(
      <Chart
        option={{
          series: { data: LINE_CHART_DATA.series.dayNumbers_100thousand },
        }}
        chartConfig={{
          type: 'line',
        }}
        style={{ width: '100%', height: '400px' }}
      />
    )

    const before = Date.now()
    assert(
      before - after < benchmark,
      `testing the rendering time with the ${benchmark} miliseconds benchmark`
    )
  })
})

// describe('@vtex.shoreline-charts line chart test', () => {
//   test('renders the line chart with 100 thousand of points and check if they are all there', async () => {
//     const { container } = render(
//       <Chart
//         option={{
//           series: { data: LINE_CHART_DATA.series.dayNumbers_100thousand },
//         }}
//         chartConfig={{
//           type: 'line',
//         }}
//         style={{ width: '100%', height: '400px' }}
//       />
//     )

//     const divChartContainer = container.querySelector('[data-sl-chart]')
//     await waitFor(() => expect(divChartContainer).toBeInTheDocument())

//     LINE_CHART_DATA.xAxis.weekdays.forEach((value) =>
//       waitFor(() => expect(screen.queryByText(value)).toBeInTheDocument())
//     )

//     LINE_CHART_DATA.series.dayNumbers_100thousand.forEach((value) => {
//       const a = Date.now()
//       waitFor(() => expect(screen.queryByText(value)).toBeInTheDocument())
//       console.log(Date.now() - a)
//     })

//     LINE_CHART_DATA.xAxis.weekdays.forEach((value) =>
//       waitFor(() => expect(screen.queryByText(value)).toBeInTheDocument())
//     )
//   })
// })
