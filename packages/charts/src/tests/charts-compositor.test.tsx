import {
  describe,
  expect,
  render,
  test,
  waitFor,
  screen,
} from '@vtex/shoreline-test-utils'
import { ChartCompositor } from '../components'
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import React from 'react'
import { CHART_COMPOSITOR_DATA } from './__fixtures__/chartData'
import { assert } from 'vitest'

describe('@vtex.shoreline-charts chart compositor tests', () => {
  test('make sure the data is correct', async () => {
    const { container } = render(
      <ChartCompositor
        charts={[
          {
            serie: { data: CHART_COMPOSITOR_DATA.data1 },
            config: { type: 'line' },
          },
          {
            serie: { data: CHART_COMPOSITOR_DATA.data2 },
            config: { type: 'bar' },
          },
        ]}
        background={{ type: 'bar' }}
        tooltip={{ type: 'line' }}
      />
    )

    const divChartContainer = container.querySelector('[data-sl-chart]')
    await waitFor(() => expect(divChartContainer).toBeInTheDocument())

    CHART_COMPOSITOR_DATA.data1.forEach((v) => {
      waitFor(() => expect(screen.queryByText(v)).toBeInTheDocument())
    })

    CHART_COMPOSITOR_DATA.data2.forEach((v) => {
      waitFor(() => expect(screen.queryByText(v)).toBeInTheDocument())
    })
  })
})

describe('@vtex.shoreline-charts chart compositor tests', () => {
  test('testing for 2 charts, with 5 thousand points each rendered above 500 and under 850 miliseconds', () => {
    const topBenchmark = 850
    const bottomBenchmark = 500

    const before = Date.now()

    render(
      <ChartCompositor
        charts={[
          {
            serie: { data: CHART_COMPOSITOR_DATA.data5_thousand },
            config: { type: 'line' },
          },
          {
            serie: { data: CHART_COMPOSITOR_DATA.data5_thousand },
            config: { type: 'bar' },
          },
        ]}
        background={{ type: 'bar' }}
        tooltip={{ type: 'line' }}
      />
    )
    const after = Date.now()

    const result = after - before

    assert(
      result <= topBenchmark,
      `The graphics performance is lower than expected, made on ${result}`
    )

    assert(
      result >= bottomBenchmark,
      `The graphics performance is higher than expected, made on ${result}`
    )
  })
})

describe('@vtex.shoreline-charts chart compositor tests', () => {
  test('testing for 3 charts, with 4 thousand points each, rendered above 450 and under 750 miliseconds (bar)', () => {
    const benchmark = 750

    const bottomBenchmark = 450

    const before = Date.now()

    render(
      <ChartCompositor
        charts={[
          {
            serie: { data: CHART_COMPOSITOR_DATA.data4_thousand },
            config: { type: 'line' },
          },
          {
            serie: { data: CHART_COMPOSITOR_DATA.data4_thousand },
            config: { type: 'bar' },
          },
          {
            serie: { data: CHART_COMPOSITOR_DATA.data4_thousand },
            config: { type: 'bar' },
          },
        ]}
        background={{ type: 'bar' }}
        tooltip={{ type: 'line' }}
      />
    )
    const after = Date.now()

    const result = after - before

    assert(
      result <= benchmark,
      `The graphics performance is lower than expected, made on ${result}`
    )

    assert(
      result >= bottomBenchmark,
      `The graphics performance is higher than expected, made on ${result}`
    )
  })
})

describe('@vtex.shoreline-charts chart compositor tests', () => {
  test('testing for 3 charts, with 4 thousand points each, rendered above 250 and under 500 miliseconds (line)', () => {
    const benchmark = 500

    const bottomBenchmark = 250

    const before = Date.now()

    render(
      <ChartCompositor
        charts={[
          {
            serie: { data: CHART_COMPOSITOR_DATA.data4_thousand },
            config: { type: 'line' },
          },
          {
            serie: { data: CHART_COMPOSITOR_DATA.data4_thousand },
            config: { type: 'line' },
          },
          {
            serie: { data: CHART_COMPOSITOR_DATA.data4_thousand },
            config: { type: 'bar' },
          },
        ]}
        background={{ type: 'bar' }}
        tooltip={{ type: 'line' }}
      />
    )
    const after = Date.now()

    const result = after - before

    assert(
      result <= benchmark,
      `The graphics performance is lower than expected, made on ${result}`
    )

    assert(
      result >= bottomBenchmark,
      `The graphics performance is higher than expected, made on ${result}`
    )
  })
})

describe('@vtex.shoreline-charts chart compositor tests', () => {
  test('testing for 2 charts, with 50 thousand points each, rendered above 2800 and under 4000 miliseconds', () => {
    const benchmark = 4000

    const bottomBenchmark = 2800

    const before = Date.now()

    render(
      <ChartCompositor
        charts={[
          {
            serie: { data: CHART_COMPOSITOR_DATA.data50_thousand },
            config: { type: 'line' },
          },
          {
            serie: { data: CHART_COMPOSITOR_DATA.data50_thousand },
            config: { type: 'bar' },
          },
        ]}
        background={{ type: 'bar' }}
        tooltip={{ type: 'line' }}
      />
    )
    const after = Date.now()

    const result = after - before

    assert(
      result <= benchmark,
      `The graphics performance is lower than expected, made on ${result}`
    )

    assert(
      result >= bottomBenchmark,
      `The graphics performance is higher than expected, made on ${result}`
    )
  })
})
