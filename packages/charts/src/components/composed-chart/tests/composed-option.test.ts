import { describe, expect, test } from 'vitest'

import { chartSeriesTokens } from '../../../internal/theme'
import type { ChartTokens } from '../../../internal/theme'
import type { BuildComposedOptionArgs } from '../composed-option'
import { buildComposedOption, defaultMaxSeries } from '../composed-option'

const tokens: ChartTokens = {
  get: (token) => (token === '--sl-color-gray-8' ? '#858585' : undefined),
  px: () => 8,
}

// Palette slots resolve to known values so inherited forecast colors can be
// asserted against the token they are supposed to come from.
const paletteTokens: ChartTokens = {
  get: (token) => {
    const index = chartSeriesTokens.indexOf(token)

    return index === -1 ? undefined : `#00000${index}`
  },
  px: () => 8,
}

interface BuiltAxis {
  type: string
  data?: string[]
  axisLabel?: { formatter: (value: number) => string }
  splitLine?: { show: boolean }
}

interface BuiltSeries {
  name: string
  type: 'bar' | 'line'
  stack?: string
  yAxisIndex?: number
  smooth?: boolean
  lineStyle?: { type: string }
  showSymbol?: boolean
  itemStyle?: { color?: string }
  data: Array<
    | number
    | null
    | { value: number | null; itemStyle: { borderRadius: number[] } }
  >
}

interface BuiltOption {
  legend: {
    show: boolean
    data?: Array<{ name: string; icon: string }>
  }
  tooltip: {
    trigger: string
    axisPointer: { type: string }
    formatter: (params: unknown) => string
  }
  xAxis: BuiltAxis
  yAxis: BuiltAxis | BuiltAxis[]
  series: BuiltSeries[]
}

function build(overrides: Partial<BuildComposedOptionArgs> = {}) {
  return buildComposedOption({
    series: [
      { type: 'bar', name: 'Revenue', data: [10, 20] },
      { type: 'line', name: 'Conversion', data: [2, 3], unit: 'percentage' },
    ],
    categories: ['Jan', 'Feb'],
    grouping: 'grouped',
    othersLabel: 'Others',
    totalLabel: 'Total',
    locale: 'en-US',
    maxSeries: defaultMaxSeries,
    tokens,
    ...overrides,
  }) as BuiltOption
}

function axesOf(option: BuiltOption): BuiltAxis[] {
  return Array.isArray(option.yAxis) ? option.yAxis : [option.yAxis]
}

function valuesOf(series: BuiltSeries): Array<number | null> {
  return series.data.map((point) =>
    typeof point === 'object' && point !== null ? point.value : point
  )
}

function radiusAt(option: BuiltOption, seriesIndex: number, dataIndex: number) {
  const point = option.series[seriesIndex]?.data[dataIndex]

  return typeof point === 'object' && point !== null
    ? point.itemStyle.borderRadius
    : undefined
}

describe('buildComposedOption', () => {
  test('assigns a line to the right axis only when its unit differs from the bars', () => {
    const mixed = build()
    const axes = axesOf(mixed)

    expect(axes).toHaveLength(2)
    // Bars anchor the left axis: numbers there, no percentage sign.
    expect(axes[0]?.axisLabel?.formatter(25)).toBe('25')
    // The percentage line reads against the right axis.
    expect(axes[1]?.axisLabel?.formatter(25)).toBe('25%')
    expect(mixed.series[1]?.yAxisIndex).toBe(1)
    // Only the left axis draws the grid: the right axis' ticks follow its own
    // scale, so drawing them would overlap the left gridlines at other heights.
    expect(axes[0]?.splitLine).toBeUndefined()
    expect(axes[1]?.splitLine).toEqual({ show: false })
  })

  test('formats the left axis when the bars themselves are percentages', () => {
    const option = build({
      series: [
        { type: 'bar', name: 'Conversion', data: [2, 3], unit: 'percentage' },
        { type: 'line', name: 'Revenue', data: [10, 20] },
      ],
    })
    const axes = axesOf(option)

    expect(axes).toHaveLength(2)
    expect(axes[0]?.axisLabel?.formatter(25)).toBe('25%')
    expect(axes[1]?.axisLabel?.formatter(25)).toBe('25')
    expect(option.series[1]?.yAxisIndex).toBe(1)
    expect(axes[0]?.splitLine).toBeUndefined()
    expect(axes[1]?.splitLine).toEqual({ show: false })
  })

  test('renders a single axis when the units agree', () => {
    const option = build({
      series: [
        { type: 'bar', name: 'Revenue', data: [10, 20] },
        { type: 'line', name: 'Cost', data: [5, 6] },
      ],
    })

    expect(Array.isArray(option.yAxis)).toBe(false)
    expect((option.yAxis as BuiltAxis).axisLabel?.formatter(3100)).toBe('3,100')
    expect(option.series[1]?.yAxisIndex).toBe(0)
  })

  test('never renders a phantom second axis', () => {
    const barsOnly = build({
      series: [{ type: 'bar', name: 'Revenue', data: [10, 20] }],
    })
    const linesOnly = build({
      series: [
        { type: 'line', name: 'Revenue', data: [10, 20] },
        { type: 'line', name: 'Conversion', data: [2, 3], unit: 'percentage' },
      ],
    })

    for (const option of [barsOnly, linesOnly]) {
      expect(Array.isArray(option.yAxis)).toBe(false)
      expect(axesOf(option)).toHaveLength(1)
    }
  })

  test('renders bars below lines regardless of the input order', () => {
    const option = build({
      series: [
        { type: 'line', name: 'Conversion', data: [2, 3], unit: 'percentage' },
        { type: 'bar', name: 'Revenue', data: [10, 20] },
      ],
    })

    // Later series paint on top, so bars-first is bars-below.
    expect(option.series.map((item) => item.type)).toEqual(['bar', 'line'])
    expect(option.series.map((item) => item.name)).toEqual([
      'Revenue',
      'Conversion',
    ])
  })

  test('applies the curve to every line series and never to bars', () => {
    const option = build({
      curve: 'smooth',
      series: [
        { type: 'bar', name: 'Revenue', data: [10, 20] },
        { type: 'line', name: 'Cost', data: [5, 6] },
        {
          type: 'line',
          name: 'Cost forecast',
          data: [null, 7],
          variant: 'forecast',
        },
      ],
    })

    const lines = option.series.filter((item) => item.type === 'line')
    const bars = option.series.filter((item) => item.type === 'bar')

    expect(lines.map((item) => item.smooth)).toEqual([true, true])
    expect(bars.every((item) => item.smooth === undefined)).toBe(true)
  })

  test('draws straight segments when no curve is given', () => {
    const option = build()

    expect(option.series.find((item) => item.type === 'line')?.smooth).toBe(
      false
    )
  })

  test('aggregates only bar series, never lines and never counts them', () => {
    const bars = Array.from({ length: 5 }, (_, index) => ({
      type: 'bar' as const,
      name: `Bar ${index + 1}`,
      data: [index + 1],
    }))
    const lines = Array.from({ length: 5 }, (_, index) => ({
      type: 'line' as const,
      name: `Line ${index + 1}`,
      data: [index + 1],
    }))

    const option = build({ series: [...bars, ...lines] })

    // Default maxSeries keeps two named bars plus the aggregate; every line
    // survives untouched.
    expect(option.series.map((item) => item.name)).toEqual([
      'Bar 1',
      'Bar 2',
      'Others',
      'Line 1',
      'Line 2',
      'Line 3',
      'Line 4',
      'Line 5',
    ])
    // The aggregate sums the folded bars only: 3 + 4 + 5.
    expect(valuesOf(option.series[2] as BuiltSeries)).toEqual([12])
    expect(option.series.slice(3).every((item) => item.type === 'line')).toBe(
      true
    )
  })

  test('paints the aggregate bars in the neutral gray, keeping the named slots', () => {
    const bars = Array.from({ length: 5 }, (_, index) => ({
      type: 'bar' as const,
      name: `Bar ${index + 1}`,
      data: [index + 1],
    }))
    const option = build({
      series: [...bars, { type: 'line' as const, name: 'Trend', data: [1] }],
    })

    expect(option.series[0]?.itemStyle).toBeUndefined()
    expect(option.series[1]?.itemStyle).toBeUndefined()
    expect(option.series[2]?.itemStyle).toEqual({ color: '#858585' })
    // Lines never aggregate, so the line keeps its slot too.
    expect(option.series[3]?.itemStyle).toBeUndefined()
  })

  test('leaves lines untouched when only one bar exists', () => {
    const option = build({
      series: [
        { type: 'bar', name: 'Revenue', data: [10] },
        ...Array.from({ length: 5 }, (_, index) => ({
          type: 'line' as const,
          name: `Line ${index + 1}`,
          data: [index + 1],
        })),
      ],
    })

    expect(option.series.map((item) => item.name)).toEqual([
      'Revenue',
      'Line 1',
      'Line 2',
      'Line 3',
      'Line 4',
      'Line 5',
    ])
    expect(option.series.some((item) => item.name === 'Others')).toBe(false)
  })

  test('formats percentage axis labels and percentage tooltip rows', () => {
    const option = build()
    const axes = axesOf(option)

    expect(axes[1]?.axisLabel?.formatter(12.5)).toBe('12.5%')

    const html = option.tooltip.formatter([
      { name: 'Jan', seriesName: 'Revenue', value: 10, seriesIndex: 0 },
      { name: 'Jan', seriesName: 'Conversion', value: 2, seriesIndex: 1 },
    ])

    expect(html).toContain('>10<')
    expect(html).toContain('>2%<')
    expect(html).not.toContain('>10%<')
  })

  test('stacks bars with the bar chart treatment while the line overlays', () => {
    const option = build({
      grouping: 'stacked',
      series: [
        { type: 'bar', name: 'Website', data: [10] },
        { type: 'bar', name: 'Marketplace', data: [20] },
        { type: 'line', name: 'Conversion', data: [2], unit: 'percentage' },
      ],
    })

    expect(option.series.slice(0, 2).map((item) => item.stack)).toEqual([
      'total',
      'total',
    ])
    expect(option.series[2]?.stack).toBeUndefined()
    expect(option.series[2]?.type).toBe('line')

    // Only the outermost segment of the stack is rounded.
    expect(radiusAt(option, 0, 0)).toEqual([0, 0, 0, 0])
    expect(radiusAt(option, 1, 0)).toEqual([8, 8, 0, 0])
  })

  test('renders bars-only charts as a bar chart', () => {
    const option = build({
      series: [{ type: 'bar', name: 'Revenue', data: [10, 20] }],
    })

    expect(option.series.map((item) => item.type)).toEqual(['bar'])
    expect(option.tooltip.axisPointer.type).toBe('shadow')
    expect(option.legend.show).toBe(false)
  })

  test('renders lines-only charts as a line chart', () => {
    const option = build({
      series: [
        { type: 'line', name: 'Revenue', data: [10, 20] },
        { type: 'line', name: 'Cost', data: [5, 6] },
      ],
    })

    expect(option.series.map((item) => item.type)).toEqual(['line', 'line'])
    expect(option.tooltip.axisPointer.type).toBe('line')
    expect(option.legend.show).toBe(true)
  })

  test('gives a forecast the color of the line it continues, past the bars', () => {
    const option = build({
      tokens: paletteTokens,
      series: [
        { type: 'bar', name: 'Revenue', data: [10, 20] },
        { type: 'line', name: 'History', data: [1, 2] },
        {
          type: 'line',
          name: 'Forecast',
          data: [null, 3],
          variant: 'forecast',
        },
      ],
    })

    // The bar takes palette slot 0, so the continued line is slot 1.
    expect(option.series[2]?.itemStyle?.color).toBe('#000001')
    expect(option.series[2]?.lineStyle).toEqual({ type: 'dashed' })
    expect(option.series[2]?.showSymbol).toBe(false)
  })

  describe('stacked tooltip', () => {
    function stackedOption() {
      return build({
        grouping: 'stacked',
        series: [
          { type: 'bar', name: 'Website', data: [10] },
          { type: 'bar', name: 'Marketplace', data: [20] },
          { type: 'line', name: 'Trend', data: [7] },
        ],
      })
    }

    const params = [
      {
        name: 'Jan',
        seriesName: 'Website',
        value: 10,
        seriesIndex: 0,
        dataIndex: 0,
      },
      {
        name: 'Jan',
        seriesName: 'Marketplace',
        value: 20,
        seriesIndex: 1,
        dataIndex: 0,
      },
      {
        name: 'Jan',
        seriesName: 'Trend',
        value: 7,
        seriesIndex: 2,
        dataIndex: 0,
      },
    ]

    test('lists the bars top-down, totals them, then lists the lines', () => {
      const html = stackedOption().tooltip.formatter(params)

      expect(html.indexOf('Marketplace')).toBeLessThan(html.indexOf('Website'))
      expect(html.indexOf('Website')).toBeLessThan(html.indexOf('Total'))
      expect(html.indexOf('Total')).toBeLessThan(html.indexOf('Trend'))
      // Bars only: the line contributes no share to the stack.
      expect(html).toContain('30')
    })

    test('keeps series order and adds no total for grouped bars', () => {
      const option = build({
        grouping: 'grouped',
        series: [
          { type: 'bar', name: 'Website', data: [10] },
          { type: 'bar', name: 'Marketplace', data: [20] },
          { type: 'line', name: 'Trend', data: [7] },
        ],
      })

      const html = option.tooltip.formatter(params)

      expect(html.indexOf('Website')).toBeLessThan(html.indexOf('Marketplace'))
      expect(html).not.toContain('Total')
    })

    test('localizes the total row label', () => {
      const html = build({
        grouping: 'stacked',
        totalLabel: 'Gesamt',
        series: [
          { type: 'bar', name: 'Website', data: [10] },
          { type: 'bar', name: 'Marketplace', data: [20] },
        ],
      }).tooltip.formatter(params.slice(0, 2))

      expect(html).toContain('Gesamt')
    })
  })

  describe('forecast tooltip', () => {
    function forecastOption() {
      return build({
        categories: ['Jan', 'Feb', 'Mar'],
        series: [
          { type: 'bar', name: 'Revenue', data: [10, 20, null] },
          { type: 'line', name: 'History', data: [1, 2, null] },
          {
            type: 'line',
            name: 'Forecast',
            data: [null, null, 3],
            variant: 'forecast',
          },
        ],
      })
    }

    test('leaves the forecast out at the seam while bars still report', () => {
      const option = forecastOption()

      // Feb is the seam: the forecast's value there duplicates History's last
      // one. Series positions include the bar, so the forecast is index 2.
      const html = option.tooltip.formatter([
        {
          name: 'Feb',
          seriesName: 'Revenue',
          value: 20,
          seriesIndex: 0,
          dataIndex: 1,
        },
        {
          name: 'Feb',
          seriesName: 'History',
          value: 2,
          seriesIndex: 1,
          dataIndex: 1,
        },
        {
          name: 'Feb',
          seriesName: 'Forecast',
          value: 2,
          seriesIndex: 2,
          dataIndex: 1,
        },
      ])

      expect(html).toContain('Revenue')
      expect(html).toContain('History')
      expect(html).not.toContain('Forecast')
    })

    test('marks the forecast row dashed at projected categories', () => {
      const option = forecastOption()

      const html = option.tooltip.formatter([
        {
          name: 'Mar',
          seriesName: 'Forecast',
          value: 3,
          color: '#3993f4',
          seriesIndex: 2,
          dataIndex: 2,
        },
      ])

      expect(html).toContain('Forecast')
      expect(html).toContain('data-dashed')
    })

    test('keeps bar rows solid', () => {
      const option = forecastOption()

      const html = option.tooltip.formatter([
        {
          name: 'Mar',
          seriesName: 'Revenue',
          value: 10,
          color: '#3993f4',
          seriesIndex: 0,
          dataIndex: 0,
        },
      ])

      expect(html).toContain('Revenue')
      expect(html).not.toContain('data-dashed')
    })
  })

  test('writes both value axes in the reader’s locale', () => {
    const option = build({ locale: 'pt-BR' })
    const axes = axesOf(option)

    expect(axes[0]?.axisLabel?.formatter(3100)).toBe('3.100')
    // The percentage sign follows the localized number.
    expect(axes[1]?.axisLabel?.formatter(12.5)).toBe('12,5%')
  })

  test('writes tooltip values, percentages included, in the reader’s locale', () => {
    const option = build({ locale: 'pt-BR' })

    const html = option.tooltip.formatter([
      { name: 'Jan', seriesName: 'Revenue', value: 3100, seriesIndex: 0 },
      { name: 'Jan', seriesName: 'Conversion', value: 2.5, seriesIndex: 1 },
    ])

    expect(html).toContain('>3.100<')
    expect(html).toContain('>2,5%<')
  })

  test('gives bars a square icon and lines a stroke icon', () => {
    const option = build({
      series: [
        { type: 'bar', name: 'Revenue', data: [10, 20] },
        { type: 'line', name: 'Conversion', data: [2, 3], unit: 'percentage' },
      ],
    })

    const barEntry = option.legend.data?.find(
      (entry) => entry.name === 'Revenue'
    )

    expect(barEntry).toEqual({ name: 'Revenue', icon: 'rect' })

    const lineEntry = option.legend.data?.find(
      (entry) => entry.name === 'Conversion'
    )

    expect(lineEntry).toBeDefined()
    expect(lineEntry?.icon).toMatch(/^path:\/\//)
    expect(lineEntry?.icon).toContain('A') // arc = center dot
    expect(lineEntry?.icon).toContain('Z')
  })

  test('gives a forecast line a dashed icon without a dot', () => {
    const option = build({
      series: [
        { type: 'line', name: 'Revenue', data: [10, 20] },
        {
          type: 'line',
          name: 'Forecast',
          data: [null, 30],
          variant: 'forecast',
        },
      ],
    })

    const forecast = option.legend.data?.find(
      (entry) => entry.name === 'Forecast'
    )

    expect(forecast).toBeDefined()
    expect(forecast?.icon).not.toContain('A') // no arc = no dot
    expect(forecast?.icon.match(/Z/g)?.length).toBe(3)
  })
})
