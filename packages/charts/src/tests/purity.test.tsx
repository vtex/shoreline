import { render } from '@vtex/shoreline-test-utils'
import { beforeAll, test } from 'vitest'
import { Chart } from '../components'
import { expect } from '@vtex/shoreline-test-utils'

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

test('Asserts options are not modified in Bar chart', () => {
  const series = [{ data: [1, 2, 3], name: 'A' }]
  const xAxis = { data: ['a', 'b', 'c'] }
  const { unmount } = render(
    <Chart series={series} xAxis={xAxis} chartConfig={{ type: 'bar' }} />
  )
  unmount()
  expect(series).toEqual([{ data: [1, 2, 3], name: 'A' }])
  expect(xAxis).toEqual({ data: ['a', 'b', 'c'] })
})

test('Asserts options are not modified in Area overlapping chart', () => {
  const series = [{ data: [1, 2, 3], name: 'A' }]
  const xAxis = { data: ['a', 'b', 'c'] }
  const { unmount } = render(
    <Chart series={series} xAxis={xAxis} chartConfig={{ type: 'area' }} />
  )
  unmount()
  expect(series).toEqual([{ data: [1, 2, 3], name: 'A' }])
  expect(xAxis).toEqual({ data: ['a', 'b', 'c'] })
})

test('Asserts options are not modified in Area stacked chart', () => {
  const series = [{ data: [1, 2, 3], name: 'A' }]
  const xAxis = { data: ['a', 'b', 'c'] }
  const { unmount } = render(
    <Chart
      series={series}
      xAxis={xAxis}
      chartConfig={{ type: 'area', variant: 'stacked' }}
    />
  )
  unmount()
  expect(series).toEqual([{ data: [1, 2, 3], name: 'A' }])
  expect(xAxis).toEqual({ data: ['a', 'b', 'c'] })
})
