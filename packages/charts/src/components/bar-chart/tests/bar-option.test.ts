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
    othersLabel: 'Others',
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

  test('sums series past the third into a single aggregate series', () => {
    const option = build({
      categories: ['Jan', 'Feb'],
      series: [
        { name: 'A', data: [1, 2] },
        { name: 'B', data: [3, 4] },
        { name: 'C', data: [5, 6] },
        { name: 'D', data: [10, 20] },
        { name: 'E', data: [100, 200] },
      ],
    })

    expect(option.series.map((s) => s.name)).toEqual(['A', 'B', 'C', 'Others'])
    expect(option.series[3]?.data.map((d) => d.value)).toEqual([110, 220])
  })

  test('leaves three or fewer series untouched', () => {
    const option = build({
      series: [
        { name: 'A', data: [1] },
        { name: 'B', data: [2] },
        { name: 'C', data: [3] },
      ],
    })

    expect(option.series.map((s) => s.name)).toEqual(['A', 'B', 'C'])
  })

  test('names the aggregate series from othersLabel', () => {
    const option = build({
      othersLabel: 'Outros',
      series: Array.from({ length: 4 }, (_, i) => ({
        name: `S${i}`,
        data: [1],
      })),
    })

    expect(option.series[3]?.name).toBe('Outros')
  })

  test('keeps the aggregate null where every collapsed series is null', () => {
    const option = build({
      categories: ['Jan', 'Feb', 'Mar'],
      series: [
        { name: 'A', data: [1, 1, 1] },
        { name: 'B', data: [1, 1, 1] },
        { name: 'C', data: [1, 1, 1] },
        { name: 'D', data: [null, 5, null] },
        { name: 'E', data: [null, null, 7] },
      ],
    })

    // Jan: both null -> no bar. Feb/Mar: null skipped, not coerced to zero.
    expect(option.series[3]?.data.map((d) => d.value)).toEqual([null, 5, 7])
  })

  test('shows the legend for a single named series plus the aggregate', () => {
    const option = build({
      series: Array.from({ length: 5 }, (_, i) => ({
        name: `S${i}`,
        data: [1],
      })),
    })

    expect(option.legend.show).toBe(true)
    expect(option.series).toHaveLength(4)
  })

  test('rounds the aggregate as the outermost stack segment', () => {
    const option = build({
      grouping: 'stacked',
      series: [
        { name: 'A', data: [10] },
        { name: 'B', data: [10] },
        { name: 'C', data: [10] },
        { name: 'D', data: [10] },
        { name: 'E', data: [10] },
      ],
    })

    // The aggregate is last in the collapsed list, so it owns the rounding.
    expect(radiusAt(option, 2, 0)).toEqual([0, 0, 0, 0])
    expect(radiusAt(option, 3, 0)).toEqual([4, 4, 0, 0])
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
