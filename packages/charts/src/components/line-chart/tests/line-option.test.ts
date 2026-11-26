import { describe, expect, test } from 'vitest'

import { chartSeriesTokens } from '../../../internal/theme'
import type { ChartTokens } from '../../../internal/theme'
import type { BuildLineOptionArgs } from '../line-option'
import { buildLineOption, defaultMaxSeries } from '../line-option'

const tokens: ChartTokens = {
  get: (token) => (token === '--sl-color-gray-8' ? '#858585' : undefined),
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

// Resolves only the zero-line token, so the assertion fails if the builder
// reaches for any other color.
const zeroLineTokens: ChartTokens = {
  get: (token) => (token === '--sl-color-gray-6' ? '#adadad' : undefined),
  px: () => 8,
}

function build(overrides: Partial<BuildLineOptionArgs> = {}) {
  return buildLineOption({
    series: [{ name: 'Revenue', data: [10, 20] }],
    categories: ['Jan', 'Feb'],
    othersLabel: 'Others',
    locale: 'en-US',
    maxSeries: defaultMaxSeries,
    tokens,
    ...overrides,
  }) as {
    legend: {
      show: boolean
      data?: Array<{
        name: string
        icon: string
      }>
    }
    tooltip: {
      trigger: string
      axisPointer: { type: string; lineStyle?: { color?: string } }
      confine: boolean
      appendTo: string
      formatter: (params: unknown) => string
      position: unknown
    }
    xAxis: {
      type: string
      data?: string[]
      axisLine?: { lineStyle: { color?: string } }
    }
    yAxis: {
      type: string
      axisLabel?: { formatter?: (value: number) => string }
    }
    series: Array<{
      name: string
      type: string
      stack?: string
      connectNulls?: boolean
      smooth?: boolean
      symbolSize?: number
      lineStyle?: { type: string }
      showSymbol?: boolean
      itemStyle?: { color?: string }
      markPoint?: {
        silent: boolean
        symbol: string
        symbolSize: number
        label: { show: boolean }
        data: Array<{ coord: [number, number] }>
      }
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
    expect(option.yAxis.type).toBe('value')
  })

  test('shows the legend only for multiple series, bottom left', () => {
    expect(build().legend.show).toBe(false)

    const multi = build({
      series: [
        { name: 'A', data: [1] },
        { name: 'B', data: [2] },
      ],
    })

    expect(multi.legend).toMatchObject({ show: true, left: 0, bottom: 0 })
  })

  test('draws a standard line icon with a center dot for each line series', () => {
    const option = build({
      series: [
        { name: 'A', data: [1] },
        { name: 'B', data: [2] },
      ],
    })

    expect(option.legend.data).toHaveLength(2)

    for (const entry of option.legend.data ?? []) {
      expect(entry.icon).toMatch(/^path:\/\//)
      // The path draws a horizontal stroke plus a ring at its center, both as
      // filled subpaths so the legend paints them in the series' color.
      expect(entry.icon).toContain('A')
      expect(entry.icon).toContain('Z')
    }
  })

  test('sizes the point markers as the design draws them', () => {
    const option = build()

    // 6 symbol units: the engine's ring is a third of the size, so the drawn
    // marker is 8px across.
    expect(option.series[0]?.symbolSize).toBe(6)
  })

  test('draws a dashed icon without a dot for a forecast series', () => {
    const option = build({
      series: [
        { name: 'Revenue', data: [10, 20] },
        { name: 'Forecast', data: [null, 30], variant: 'forecast' },
      ],
    })

    const forecast = option.legend.data?.find(
      (entry) => entry.name === 'Forecast'
    )

    expect(forecast).toBeDefined()
    // Dashes drawn into the path as filled segments, no arc (no marker).
    expect(forecast?.icon).not.toContain('A')
    expect(forecast?.icon.match(/Z/g)?.length).toBe(4)
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

  test('recolors the zero line only when a value goes negative', () => {
    const positive = build({ tokens: zeroLineTokens })

    expect(positive.xAxis).toEqual({ type: 'category', data: ['Jan', 'Feb'] })

    const negative = build({
      tokens: zeroLineTokens,
      series: [{ name: 'Net result', data: [10, -20] }],
    })

    // The engine already puts the category axis line at zero; the chart only
    // strengthens it so the sign split stays legible.
    expect(negative.xAxis.axisLine).toEqual({
      lineStyle: { color: '#adadad' },
    })
  })

  test('treats zero and null as non-negative for the zero line', () => {
    const option = build({
      tokens: zeroLineTokens,
      series: [{ name: 'Net result', data: [0, null] }],
    })

    expect(option.xAxis.axisLine).toBeUndefined()
  })

  test('draws straight segments for the default curve and a spline for smooth', () => {
    expect(build().series[0]?.smooth).toBe(false)
    expect(build({ curve: 'linear' }).series[0]?.smooth).toBe(false)

    const smooth = build({ curve: 'smooth' })

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

  test('paints the aggregate in the neutral gray, keeping the named slots', () => {
    const option = build({
      series: Array.from({ length: 5 }, (_, i) => ({
        name: `S${i}`,
        data: [1],
      })),
    })

    expect(option.series[0]?.itemStyle).toBeUndefined()
    expect(option.series[1]?.itemStyle).toBeUndefined()
    expect(option.series[2]?.itemStyle).toEqual({ color: '#858585' })
  })

  test('leaves every line to the palette when nothing aggregates', () => {
    const option = build({
      series: [
        { name: 'A', data: [1] },
        { name: 'B', data: [2] },
      ],
    })

    expect(option.series.every((s) => s.itemStyle === undefined)).toBe(true)
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

  test('writes the value-axis ticks in the reader’s locale', () => {
    expect(build().yAxis.axisLabel?.formatter?.(3100)).toBe('3,100')
    expect(build({ locale: 'pt-BR' }).yAxis.axisLabel?.formatter?.(3100)).toBe(
      '3.100'
    )
  })

  test('writes tooltip values in the reader’s locale', () => {
    const option = build({ locale: 'pt-BR' })

    const html = option.tooltip.formatter([
      {
        name: 'Jan',
        seriesName: 'Revenue',
        value: 3100,
        seriesIndex: 0,
        dataIndex: 0,
      },
    ])

    expect(html).toContain('3.100')
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
        symbolSize: 6,
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

    test('leaves the forecast out of the tooltip at the seam', () => {
      const option = build({
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        series: [
          { name: 'Revenue', data: [10, 20, 30, 40, 50, null] },
          {
            name: 'Forecast',
            data: [null, null, null, null, null, 60],
            variant: 'forecast',
          },
        ],
      })

      // May is the seam: the forecast's value there duplicates Revenue's last
      // one, so only the real series reports at that category.
      const html = option.tooltip.formatter([
        {
          name: 'May',
          seriesName: 'Revenue',
          value: 50,
          seriesIndex: 0,
          dataIndex: 4,
        },
        {
          name: 'May',
          seriesName: 'Forecast',
          value: 50,
          seriesIndex: 1,
          dataIndex: 4,
        },
      ])

      expect(html).toContain('Revenue')
      expect(html).not.toContain('Forecast')
    })

    test('marks the forecast row dashed at projected categories', () => {
      const option = build({
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        series: [
          { name: 'Revenue', data: [10, 20, 30, 40, 50, null] },
          {
            name: 'Forecast',
            data: [null, null, null, null, null, 60],
            variant: 'forecast',
          },
        ],
      })

      const html = option.tooltip.formatter([
        {
          name: 'Jun',
          seriesName: 'Forecast',
          value: 60,
          color: '#3993f4',
          seriesIndex: 1,
          dataIndex: 5,
        },
      ])

      expect(html).toContain('Forecast')
      expect(html).toContain('data-dashed')
    })

    test('keeps standard rows solid in the tooltip', () => {
      const option = build({
        series: [
          { name: 'Revenue', data: [10, 20] },
          { name: 'Cost', data: [5, 6] },
        ],
      })

      const html = option.tooltip.formatter(
        hoveredParams.map((param, seriesIndex) => ({
          ...param,
          seriesIndex,
          dataIndex: 0,
        }))
      )

      expect(html).not.toContain('data-dashed')
    })
  })

  describe('point markers', () => {
    const denseCategories = Array.from(
      { length: 90 },
      (_, index) => `Day ${index + 1}`
    )
    const denseData = denseCategories.map((_, index) => 100 + (index % 7))

    test('keeps a marker at every point while the points have room', () => {
      const option = build({ width: 600 })

      expect(option.series[0]?.showSymbol).toBeUndefined()
      expect(option.series[0]?.markPoint).toBeUndefined()
    })

    test('hides every marker when the points crowd the width', () => {
      const option = build({
        width: 600,
        categories: denseCategories,
        series: [{ name: 'Revenue', data: denseData }],
      })

      expect(option.series[0]?.showSymbol).toBe(false)
      // Nothing is isolated, so no point needs a marker of its own.
      expect(option.series[0]?.markPoint).toBeUndefined()
    })

    test('keeps an isolated value visible with a marker of its own', () => {
      const data = denseData.map(() => null)
      data[10] = 42
      data[70] = 7

      const option = build({
        width: 600,
        categories: denseCategories,
        series: [{ name: 'Revenue', data }],
      })

      expect(option.series[0]?.showSymbol).toBe(false)
      // The marker is styled like the line's own, and silent so the axis
      // tooltip behaves as it does on any other point.
      expect(option.series[0]?.markPoint).toEqual({
        silent: true,
        symbol: 'emptyCircle',
        symbolSize: 6,
        label: { show: false },
        data: [{ coord: [10, 42] }, { coord: [70, 7] }],
      })
    })

    test('marks only the values with no neighbouring value', () => {
      const data = denseData.map(() => 10)
      data[5] = null
      data[6] = null
      data[7] = 30
      data[8] = null

      const option = build({
        width: 600,
        categories: denseCategories,
        series: [{ name: 'Revenue', data }],
      })

      expect(option.series[0]?.markPoint?.data).toEqual([{ coord: [7, 30] }])
    })

    test('never marks a forecast series', () => {
      const forecast = denseCategories.map(() => null)
      forecast[40] = 90

      const option = build({
        width: 600,
        categories: denseCategories,
        series: [
          { name: 'Revenue', data: denseData },
          { name: 'Forecast', data: forecast, variant: 'forecast' },
        ],
      })

      expect(option.series[1]?.markPoint).toBeUndefined()
    })
  })
})
