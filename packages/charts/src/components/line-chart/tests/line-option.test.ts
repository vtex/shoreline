import { describe, expect, test } from 'vitest'

import type { ChartTokens } from '../../../internal/theme'
import type { BuildLineOptionArgs } from '../line-option'
import { buildLineOption, defaultMaxSeries } from '../line-option'

const tokens: ChartTokens = {
  get: () => undefined,
  px: () => 8,
}

function build(overrides: Partial<BuildLineOptionArgs> = {}) {
  return buildLineOption({
    series: [{ name: 'Revenue', data: [10, 20] }],
    categories: ['Jan', 'Feb'],
    othersLabel: 'Others',
    maxSeries: defaultMaxSeries,
    tokens,
    ...overrides,
  }) as {
    legend: { show: boolean }
    tooltip: {
      trigger: string
      axisPointer: { type: string; lineStyle?: { color?: string } }
      confine: boolean
      appendTo: string
      formatter: (params: unknown) => string
      position: unknown
    }
    xAxis: { type: string; data?: string[] }
    yAxis: { type: string }
    series: Array<{
      name: string
      type: string
      stack?: string
      connectNulls?: boolean
      data: Array<number | null>
    }>
  }
}

// What the engine passes the tooltip formatter on hover: one item per series
// at the hovered category, always in series order.
const hoveredParams = [
  { name: 'Jan', seriesName: 'Revenue', value: 10, color: '#3993f4' },
  { name: 'Jan', seriesName: 'Cost', value: 20, color: '#9c56f3' },
]

describe('buildLineOption', () => {
  test('puts categories on the x axis and values on the y axis', () => {
    const option = build()

    expect(option.xAxis).toEqual({ type: 'category', data: ['Jan', 'Feb'] })
    expect(option.yAxis).toEqual({ type: 'value' })
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

  test('renders every series as a line, never stacked', () => {
    const option = build({
      series: [
        { name: 'A', data: [1] },
        { name: 'B', data: [2] },
      ],
    })

    expect(option.series.map((s) => s.type)).toEqual(['line', 'line'])
    expect(option.series.every((s) => s.stack === undefined)).toBe(true)
  })

  test('leaves null values in place so the line gaps instead of interpolating', () => {
    const option = build({
      series: [{ name: 'A', data: [10, null, 30] }],
    })

    expect(option.series[0]?.data).toEqual([10, null, 30])
    // connectNulls is left unset so the engine default (false) applies.
    expect(option.series[0]?.connectNulls).toBeUndefined()
  })

  test('configures a line axis pointer for the hover guide', () => {
    const option = build()

    expect(option.tooltip.trigger).toBe('axis')
    expect(option.tooltip.axisPointer.type).toBe('line')
    expect(option.tooltip.confine).toBe(false)
    expect(option.tooltip.appendTo).toBe('body')
    expect(typeof option.tooltip.formatter).toBe('function')
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

    expect(option.series.map((s) => s.name)).toEqual(['A', 'B', 'Others'])
    expect(option.series[2]?.data).toEqual([115, 226])
  })

  test('keeps series order in the tooltip (no vertical-stack reversal)', () => {
    const option = build({
      series: [
        { name: 'Revenue', data: [10] },
        { name: 'Cost', data: [20] },
      ],
    })

    const html = option.tooltip.formatter(hoveredParams)

    expect(html.indexOf('Revenue')).toBeLessThan(html.indexOf('Cost'))
  })

  test('shows a series delta at the hovered category', () => {
    const option = build({
      series: [
        {
          name: 'Revenue',
          data: [10, 20],
          deltas: [
            { value: '12%', direction: 'up', tone: 'success' },
            { value: '4%', direction: 'down', tone: 'critical' },
          ],
        },
      ],
    })

    const first = option.tooltip.formatter([
      {
        name: 'Jan',
        seriesName: 'Revenue',
        value: 10,
        seriesIndex: 0,
        dataIndex: 0,
      },
    ])

    expect(first).toContain('12%')
    expect(first).toContain('data-tone="success"')
  })
})
