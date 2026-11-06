import { describe, expect, test } from 'vitest'

import { chartSeriesTokens } from '../../../internal/theme'
import type { ChartTokens } from '../../../internal/theme'
import type { BuildLineOptionArgs } from '../line-option'
import { buildLineOption, defaultMaxSeries } from '../line-option'

const tokens: ChartTokens = {
  get: () => undefined,
  px: () => 8,
}

// Palette slots resolve to known values so the forecast color can be asserted
// against the token it is supposed to inherit.
const paletteTokens: ChartTokens = {
  get: (token) => {
    const index = chartSeriesTokens.indexOf(token)

    return index === -1 ? undefined : `#00000${index}`
  },
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
      smooth?: boolean
      lineStyle?: { type: string }
      showSymbol?: boolean
      itemStyle?: { color?: string }
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

  test('draws straight segments by default and smooth curves when smooth is set', () => {
    expect(build().series[0]?.smooth).toBe(false)

    const smooth = build({ smooth: true })

    expect(smooth.series[0]?.smooth).toBe(true)
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

  describe('forecast variant', () => {
    test('renders dashed and without point symbols', () => {
      const option = build({
        series: [
          { name: 'Revenue', data: [10, 20] },
          { name: 'Forecast', data: [null, 30], variant: 'forecast' },
        ],
      })

      expect(option.series[1]?.lineStyle).toEqual({ type: 'dashed' })
      expect(option.series[1]?.showSymbol).toBe(false)
    })

    test('inherits the resolved color of the series it continues', () => {
      const option = build({
        tokens: paletteTokens,
        series: [
          { name: 'Revenue', data: [10, 20] },
          { name: 'Forecast', data: [null, 30], variant: 'forecast' },
        ],
      })

      expect(option.series[1]?.itemStyle?.color).toBe('#000000')
    })

    test('inherits the color of the collapsed slot it continues', () => {
      const option = build({
        tokens: paletteTokens,
        series: [
          { name: 'Revenue', data: [10, 20] },
          { name: 'Cost', data: [5, 6] },
          { name: 'Forecast', data: [null, 7], variant: 'forecast' },
        ],
      })

      expect(option.series[2]?.itemStyle?.color).toBe('#000001')
    })

    test('duplicates the last known historical value into the seam', () => {
      const history = [10, 20, 30, 40, 50, null]
      const forecast = [null, null, null, null, null, 60]

      const option = build({
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        series: [
          { name: 'Revenue', data: history },
          { name: 'Forecast', data: forecast, variant: 'forecast' },
        ],
      })

      // The dashed segment begins at May, where the solid one ends.
      expect(option.series[1]?.data).toEqual([null, null, null, null, 50, 60])
    })

    test('seams to the last non-null value when the boundary point is null', () => {
      const option = build({
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        series: [
          { name: 'Revenue', data: [10, 20, 30, null, null] },
          {
            name: 'Forecast',
            data: [null, null, null, null, 40],
            variant: 'forecast',
          },
        ],
      })

      // Not the boundary category (Apr): the last value the line actually
      // reaches is March.
      expect(option.series[1]?.data).toEqual([null, null, 30, null, 40])
    })

    test('renders dashed throughout with no seam when nothing precedes it', () => {
      const forecast = [null, null, 10, 20]

      const option = build({
        series: [{ name: 'Forecast', data: forecast, variant: 'forecast' }],
      })

      expect(option.series[0]?.data).toEqual(forecast)
      expect(option.series[0]?.lineStyle).toEqual({ type: 'dashed' })
      expect(option.series[0]?.showSymbol).toBe(false)
      // Nothing to inherit a color from, so the engine's palette applies.
      expect(option.series[0]?.itemStyle).toBeUndefined()
    })

    test('renders dashed throughout with no seam when the predecessor has no values', () => {
      const forecast = [null, null, 10, 20]

      const option = build({
        series: [
          { name: 'Revenue', data: [null, null, null, null] },
          { name: 'Forecast', data: forecast, variant: 'forecast' },
        ],
      })

      expect(option.series[1]?.data).toEqual(forecast)
    })

    test('leaves standard series untouched by default', () => {
      const option = build()

      expect(option.series[0]).toEqual({
        name: 'Revenue',
        type: 'line',
        data: [10, 20],
        smooth: false,
      })
      expect(option.series[0]?.lineStyle).toBeUndefined()
      expect(option.series[0]?.showSymbol).toBeUndefined()
      expect(option.series[0]?.itemStyle).toBeUndefined()
    })

    test('never mutates the consumer data', () => {
      const history = [10, 20, null]
      const forecast = [null, null, 30]

      const option = build({
        series: [
          { name: 'Revenue', data: history },
          { name: 'Forecast', data: forecast, variant: 'forecast' },
        ],
      })

      expect(history).toEqual([10, 20, null])
      expect(forecast).toEqual([null, null, 30])
      // The seam is written to a copy, not to the consumer's array.
      expect(option.series[1]?.data).toEqual([null, 20, 30])
      expect(option.series[1]?.data).not.toBe(forecast)
    })
  })
})
