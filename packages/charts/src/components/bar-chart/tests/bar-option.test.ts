import { describe, expect, test } from 'vitest'

import type { ChartTokens } from '../../../internal/theme'
import type { BuildBarOptionArgs } from '../bar-option'
import { buildBarOption } from '../bar-option'

const tokens: ChartTokens = {
  get: () => undefined,
  px: (token) => (token === '--sl-radius-1' ? 4 : 8),
}

function build(overrides: Partial<BuildBarOptionArgs> = {}) {
  return buildBarOption({
    series: [{ name: 'Revenue', data: [10, 20] }],
    categories: ['Jan', 'Feb'],
    direction: 'vertical',
    grouping: 'grouped',
    tokens,
    ...overrides,
  }) as {
    legend: { show: boolean }
    xAxis: { type: string; data?: string[] }
    yAxis: { type: string; data?: string[] }
    series: Array<{
      name: string
      stack?: string
      data: Array<{
        value: number | null
        itemStyle: { borderRadius: number[] }
      }>
    }>
  }
}

function radiusAt(
  option: ReturnType<typeof build>,
  seriesIndex: number,
  categoryIndex: number
) {
  return option.series[seriesIndex]?.data[categoryIndex]?.itemStyle.borderRadius
}

describe('buildBarOption', () => {
  test('puts categories on the x axis when vertical and on the y axis when horizontal', () => {
    const vertical = build()

    expect(vertical.xAxis).toEqual({ type: 'category', data: ['Jan', 'Feb'] })
    expect(vertical.yAxis).toEqual({ type: 'value' })

    const horizontal = build({ direction: 'horizontal' })

    expect(horizontal.xAxis).toEqual({ type: 'value' })
    expect(horizontal.yAxis).toEqual({
      type: 'category',
      data: ['Jan', 'Feb'],
    })
  })

  test('shows the legend only for multiple series, bottom left', () => {
    expect(build().legend.show).toBe(false)

    const multi = build({
      series: [
        { name: 'A', data: [1] },
        { name: 'B', data: [2] },
      ],
    })

    expect(multi.legend).toEqual({ show: true, left: 0, bottom: 0 })
  })

  test('stacks all series on a single stack when grouping is stacked', () => {
    const option = build({
      grouping: 'stacked',
      series: [
        { name: 'A', data: [1] },
        { name: 'B', data: [2] },
      ],
    })

    expect(option.series.map((s) => s.stack)).toEqual(['total', 'total'])
    expect(build().series[0]?.stack).toBeUndefined()
  })

  test('rounds bars away from the zero line by value sign', () => {
    const option = build({ series: [{ name: 'A', data: [10, -10] }] })

    expect(radiusAt(option, 0, 0)).toEqual([4, 4, 0, 0])
    expect(radiusAt(option, 0, 1)).toEqual([0, 0, 4, 4])

    const horizontal = build({
      direction: 'horizontal',
      series: [{ name: 'A', data: [10, -10] }],
    })

    expect(radiusAt(horizontal, 0, 0)).toEqual([0, 4, 4, 0])
    expect(radiusAt(horizontal, 0, 1)).toEqual([4, 0, 0, 4])
  })

  test('rounds only the outermost segment of each sign in a stack', () => {
    const option = build({
      grouping: 'stacked',
      series: [
        { name: 'A', data: [10, -10] },
        { name: 'B', data: [10, 10] },
        { name: 'C', data: [0, null] },
      ],
    })

    // positive pile: B is outermost in both categories (C is zero/null)
    expect(radiusAt(option, 0, 0)).toEqual([0, 0, 0, 0])
    expect(radiusAt(option, 1, 0)).toEqual([4, 4, 0, 0])
    expect(radiusAt(option, 2, 0)).toEqual([0, 0, 0, 0])

    // negative pile: A is the only negative segment and keeps its rounding
    expect(radiusAt(option, 0, 1)).toEqual([0, 0, 4, 4])
    expect(radiusAt(option, 1, 1)).toEqual([4, 4, 0, 0])
  })

  test('skips rounding for null, zero, and unresolvable radius', () => {
    const option = build({ series: [{ name: 'A', data: [null, 0] }] })

    expect(radiusAt(option, 0, 0)).toEqual([0, 0, 0, 0])
    expect(radiusAt(option, 0, 1)).toEqual([0, 0, 0, 0])

    const noToken = build({
      tokens: { get: () => undefined, px: () => undefined },
    })

    expect(radiusAt(noToken, 0, 0)).toEqual([0, 0, 0, 0])
  })
})
