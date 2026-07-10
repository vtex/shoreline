import { describe, expect, test } from 'vitest'

import type { ChartTokens } from '../chart-theme'
import { chartSeriesTokens, createChartTheme } from '../chart-theme'

function fakeTokens(values: Record<string, string | number>): ChartTokens {
  return {
    get: (token) => {
      const value = values[token]

      return value === undefined ? undefined : String(value)
    },
    px: (token) => {
      const value = values[token]

      return typeof value === 'number' ? value : undefined
    },
  }
}

describe('createChartTheme', () => {
  test('builds the series palette from tokens in fixed order', () => {
    const theme = createChartTheme(
      fakeTokens(
        Object.fromEntries(
          chartSeriesTokens.map((token, i) => [token, `#00000${i}`])
        )
      )
    )

    expect(theme.color).toEqual(chartSeriesTokens.map((_, i) => `#00000${i}`))
  })

  test('drops unresolvable palette entries without reordering', () => {
    const [first, , third] = chartSeriesTokens

    const theme = createChartTheme(
      fakeTokens({ [first]: '#111111', [third]: '#333333' })
    )

    expect(theme.color).toEqual(['#111111', '#333333'])
  })

  test('omits the palette entirely when no token resolves', () => {
    const theme = createChartTheme(fakeTokens({}))

    expect(theme.color).toBeUndefined()
  })

  test('maps typography and foreground tokens', () => {
    const theme = createChartTheme(
      fakeTokens({
        '--sl-font-family-sans': 'VTEX Trust',
        '--sl-font-size-1': 12,
        '--sl-fg-base': '#07080a',
        '--sl-fg-muted': '#3d3d3d',
      })
    )

    expect(theme.textStyle).toEqual({
      color: '#07080a',
      fontFamily: 'VTEX Trust',
    })
    expect(theme.categoryAxis.axisLabel).toEqual({
      color: '#3d3d3d',
      fontFamily: 'VTEX Trust',
      fontSize: 12,
    })
    expect(theme.legend.textStyle).toEqual({
      color: '#07080a',
      fontFamily: 'VTEX Trust',
      fontSize: 12,
    })
  })

  test('maps axis line colors on both axis types', () => {
    const theme = createChartTheme(fakeTokens({ '--sl-color-gray-3': '#ddd' }))

    for (const axis of [theme.categoryAxis, theme.valueAxis]) {
      expect(axis.axisLine.lineStyle.color).toBe('#ddd')
      expect(axis.axisTick.lineStyle.color).toBe('#ddd')
      expect(axis.splitLine.lineStyle.color).toBe('#ddd')
    }
  })

  test('keeps the chart background transparent so surfaces show through', () => {
    expect(createChartTheme(fakeTokens({})).backgroundColor).toBe('transparent')
  })
})
