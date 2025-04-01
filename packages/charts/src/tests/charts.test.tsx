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
import { BAR_CHART_DATA, CHART_DATA } from './__fixtures__/chartData'

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

describe('@vtex.shoreline-charts bar chart test', () => {
  test('tries to render a 100 thousand points bar chart above 5000 and under 8000 miliseconds', async () => {
    const benchmark = 8000
    const bottomBenchmark = 5000

    const before = Date.now()

    render(
      <Chart
        option={{
          series: { data: CHART_DATA.series.dayNumbers_100thousand },
        }}
        chartConfig={{
          type: 'bar',
        }}
        style={{ width: '100%', height: '400px' }}
      />
    )

    const after = Date.now()
    assert(after - before < benchmark, `time: ${after - before}`)
    assert(after - before >= bottomBenchmark, `time: ${after - before}`)
  })
})

describe('@vtex.shoreline-charts bar chart test', () => {
  test('tries to render a 10 thousand points bar chart above 500 and under 800 miliseconds', async () => {
    const benchmark = 800
    const bottomBenchmark = 500

    const before = Date.now()

    render(
      <Chart
        option={{
          series: { data: CHART_DATA.series.dayNumbers_10thousand },
        }}
        chartConfig={{
          type: 'bar',
        }}
        style={{ width: '100%', height: '400px' }}
      />
    )

    const after = Date.now()
    assert(after - before < benchmark, `time: ${after - before}`)
    assert(after - before >= bottomBenchmark, `time: ${after - before}`)
  })
})

describe('@vtex.shoreline-charts bar chart test', () => {
  test('tries to render a 1 thousand points bar chart above 70 and under 200 miliseconds', async () => {
    const benchmark = 200
    const bottomBenchmark = 70

    const before = Date.now()

    render(
      <Chart
        option={{
          series: { data: CHART_DATA.series.dayNumbers_1thousand },
        }}
        chartConfig={{
          type: 'bar',
        }}
        style={{ width: '100%', height: '400px' }}
      />
    )

    const after = Date.now()
    assert(after - before < benchmark, `time: ${after - before}`)
    assert(after - before >= bottomBenchmark, `time: ${after - before}`)
  })
})

describe('@vtex.shoreline-charts line chart test', () => {
  test('renders the line chart with correct data', async () => {
    const { container } = render(
      <Chart
        option={{
          xAxis: {
            data: CHART_DATA.xAxis.weekdays,
          },
          series: { data: CHART_DATA.series.dayNumbers },
        }}
        chartConfig={{
          type: 'line',
        }}
        style={{ width: '100%', height: '400px' }}
      />
    )

    const divChartContainer = container.querySelector('[data-sl-chart]')
    await waitFor(() => expect(divChartContainer).toBeInTheDocument())

    CHART_DATA.xAxis.weekdays.forEach((value) =>
      waitFor(() => expect(screen.queryByText(value)).toBeInTheDocument())
    )

    CHART_DATA.series.dayNumbers.forEach((value) =>
      waitFor(() => expect(screen.queryByText(value)).toBeInTheDocument())
    )
  })
})

describe('@vtex.shoreline-charts line chart test', () => {
  test('tries to render a 100 thousand points chart under 250 miliseconds AND FAILS', async () => {
    const benchmark = 250

    const before = Date.now()

    render(
      <Chart
        option={{
          series: { data: CHART_DATA.series.dayNumbers_100thousand },
        }}
        chartConfig={{
          type: 'line',
        }}
        style={{ width: '100%', height: '400px' }}
      />
    )

    const after = Date.now()
    assert(!(after - before < benchmark))
  })
})

describe('@vtex.shoreline-charts line chart test', () => {
  test('tries to render a 100 thousand points line chart under 400 miliseconds', async () => {
    const benchmark = 400

    const before = Date.now()

    render(
      <Chart
        option={{
          series: { data: CHART_DATA.series.dayNumbers_100thousand },
        }}
        chartConfig={{
          type: 'line',
        }}
        style={{ width: '100%', height: '400px' }}
      />
    )

    const after = Date.now()
    assert(after - before < benchmark)
  })
})

describe('@vtex.shoreline-charts line chart test', () => {
  test('tries to render a 10 thousand points chart under 50 miliseconds AND FAILS', () => {
    const benchmark = 50

    const before = Date.now()

    render(
      <Chart
        option={{
          series: { data: CHART_DATA.series.dayNumbers_10thousand },
        }}
        chartConfig={{
          type: 'line',
        }}
        style={{ width: '100%', height: '400px' }}
      />
    )

    const after = Date.now()
    assert(!(after - before < benchmark))
  })
})

describe('@vtex.shoreline-charts line chart test', () => {
  test('tries to render a 10 thousand points chart under 100 miliseconds', async () => {
    const benchmark = 100

    const after = Date.now()

    render(
      <Chart
        option={{
          series: { data: CHART_DATA.series.dayNumbers_10thousand },
        }}
        chartConfig={{
          type: 'line',
        }}
        style={{ width: '100%', height: '400px' }}
      />
    )

    const before = Date.now()
    assert(before - after < benchmark)
  })
})
