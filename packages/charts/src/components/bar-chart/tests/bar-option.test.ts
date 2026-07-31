import { describe, expect, test } from 'vitest'

import type { ChartTokens } from '../../../internal/theme'
import type { BuildBarOptionArgs } from '../bar-option'
import { buildBarOption, defaultMaxSeries, seriesLimit } from '../bar-option'

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
    maxSeries: defaultMaxSeries,
    tokens,
    ...overrides,
  }) as {
    legend: { show: boolean }
    tooltip: {
      trigger: string
      axisPointer: { type: string }
      backgroundColor: string
      formatter: (params: unknown) => string
      position: unknown
    }
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

// What the engine passes the tooltip formatter on hover: one item per series
// at the hovered category, always in series order.
const hoveredParams = [
  { name: 'Jan', seriesName: 'Website', value: 10, color: '#3993f4' },
  { name: 'Jan', seriesName: 'Marketplace', value: 20, color: '#9c56f3' },
]

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

  test('renders two named series plus the aggregate by default', () => {
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

    expect(defaultMaxSeries).toBe(3)
    expect(option.series.map((s) => s.name)).toEqual(['A', 'B', 'Others'])
    // The aggregate takes the tertiary slot, so it folds C, D and E.
    expect(option.series[2]?.data.map((d) => d.value)).toEqual([115, 226])
  })

  test('leaves the series untouched when they fit within maxSeries', () => {
    const three = build({
      series: [
        { name: 'A', data: [1] },
        { name: 'B', data: [2] },
        { name: 'C', data: [3] },
      ],
    })

    expect(three.series.map((s) => s.name)).toEqual(['A', 'B', 'C'])

    const five = build({
      maxSeries: 5,
      series: Array.from({ length: 5 }, (_, i) => ({
        name: `S${i}`,
        data: [1],
      })),
    })

    expect(five.series.map((s) => s.name)).toEqual([
      'S0',
      'S1',
      'S2',
      'S3',
      'S4',
    ])
  })

  test('raising maxSeries gives more series their own name', () => {
    const option = build({
      maxSeries: 5,
      series: Array.from({ length: 8 }, (_, i) => ({
        name: `S${i}`,
        data: [1],
      })),
    })

    expect(option.series.map((s) => s.name)).toEqual([
      'S0',
      'S1',
      'S2',
      'S3',
      'Others',
    ])
    expect(option.series[4]?.data.map((d) => d.value)).toEqual([4])
  })

  test('clamps maxSeries to the palette limit and still aggregates the rest', () => {
    const option = build({
      maxSeries: 99,
      series: Array.from({ length: 10 }, (_, i) => ({
        name: `S${i}`,
        data: [1],
      })),
    })

    expect(seriesLimit).toBe(6)
    expect(option.series).toHaveLength(seriesLimit)
    expect(option.series[seriesLimit - 1]?.name).toBe('Others')
    // 10 series in, none dropped: 5 named + 5 folded into the aggregate.
    expect(option.series[seriesLimit - 1]?.data.map((d) => d.value)).toEqual([
      5,
    ])
  })

  test('coerces a maxSeries below one, fractional, or non-finite', () => {
    const series = Array.from({ length: 4 }, (_, i) => ({
      name: `S${i}`,
      data: [1],
    }))

    for (const maxSeries of [0, -3, Number.NaN]) {
      const option = build({ maxSeries, series })

      expect(option.series.map((s) => s.name)).toEqual(['Others'])
      expect(option.series[0]?.data.map((d) => d.value)).toEqual([4])
    }

    // 3.7 floors to 3, matching the default shape rather than rounding up.
    expect(build({ maxSeries: 3.7, series }).series.map((s) => s.name)).toEqual(
      ['S0', 'S1', 'Others']
    )
  })

  test('names the aggregate series from othersLabel', () => {
    const option = build({
      othersLabel: 'Outros',
      series: Array.from({ length: 4 }, (_, i) => ({
        name: `S${i}`,
        data: [1],
      })),
    })

    expect(option.series[2]?.name).toBe('Outros')
  })

  test('keeps the aggregate null where every collapsed series is null', () => {
    const option = build({
      categories: ['Jan', 'Feb', 'Mar'],
      series: [
        { name: 'A', data: [1, 1, 1] },
        { name: 'B', data: [1, 1, 1] },
        { name: 'C', data: [null, 5, null] },
        { name: 'D', data: [null, null, 7] },
      ],
    })

    // Jan: both null -> no bar. Feb/Mar: null skipped, not coerced to zero.
    expect(option.series[2]?.data.map((d) => d.value)).toEqual([null, 5, 7])
  })

  test('shows the legend for a single named series plus the aggregate', () => {
    const option = build({
      maxSeries: 2,
      series: Array.from({ length: 5 }, (_, i) => ({
        name: `S${i}`,
        data: [1],
      })),
    })

    expect(option.legend.show).toBe(true)
    expect(option.series.map((s) => s.name)).toEqual(['S0', 'Others'])
  })

  test('rounds the aggregate as the outermost stack segment', () => {
    const option = build({
      grouping: 'stacked',
      series: [
        { name: 'A', data: [10] },
        { name: 'B', data: [10] },
        { name: 'C', data: [10] },
        { name: 'D', data: [10] },
      ],
    })

    // The aggregate is last in the collapsed list, so it owns the rounding.
    expect(radiusAt(option, 1, 0)).toEqual([0, 0, 0, 0])
    expect(radiusAt(option, 2, 0)).toEqual([4, 4, 0, 0])
  })

  test('configures an axis-trigger tooltip with a DOM formatter and position function', () => {
    const option = build()

    expect(option.tooltip.trigger).toBe('axis')
    expect(option.tooltip.axisPointer.type).toBe('shadow')
    expect(option.tooltip.backgroundColor).toBe('transparent')
    expect(typeof option.tooltip.formatter).toBe('function')
    expect(typeof option.tooltip.position).toBe('function')
  })

  test('lists tooltip rows top-down for a vertical stack', () => {
    const option = build({
      series: [
        { name: 'Website', data: [10] },
        { name: 'Marketplace', data: [20] },
      ],
      direction: 'vertical',
      grouping: 'stacked',
    })

    const html = option.tooltip.formatter(hoveredParams)

    // Marketplace stacks on top of Website, so it heads the tooltip.
    expect(html.indexOf('Marketplace')).toBeLessThan(html.indexOf('Website'))
  })

  test('keeps series order for a horizontal stack and for grouped bars', () => {
    const series = [
      { name: 'Website', data: [10] },
      { name: 'Marketplace', data: [20] },
    ]

    for (const overrides of [
      { direction: 'horizontal', grouping: 'stacked' },
      { direction: 'vertical', grouping: 'grouped' },
      { direction: 'horizontal', grouping: 'grouped' },
    ] as const) {
      const html = build({ series, ...overrides }).tooltip.formatter(
        hoveredParams
      )

      expect(html.indexOf('Website')).toBeLessThan(html.indexOf('Marketplace'))
    }
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
