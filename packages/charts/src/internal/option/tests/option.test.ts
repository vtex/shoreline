import { describe, expect, test } from 'vitest'

import type { ChartTokens } from '../../theme'
import {
  buildAxisTooltip,
  buildCategoryAxis,
  buildGrid,
  buildLegend,
  buildValueAxis,
} from '../option'

const tokens: ChartTokens = {
  get: () => undefined,
  px: (token) => (token === '--sl-space-2' ? 8 : 40),
}

describe('buildLegend', () => {
  test('hides for a single series, shows bottom left for multiple', () => {
    expect(buildLegend(1)).toEqual({ show: false, left: 0, bottom: 0 })
    expect(buildLegend(2)).toEqual({ show: true, left: 0, bottom: 0 })
  })
})

describe('buildGrid', () => {
  test('contains labels and pads from tokens', () => {
    expect(buildGrid({ tokens, showLegend: false })).toEqual({
      containLabel: true,
      left: 8,
      right: 8,
      top: 8,
      bottom: 8,
    })
  })

  test('grows the bottom padding to fit the legend', () => {
    const grid = buildGrid({ tokens, showLegend: true })

    expect(grid.bottom).toBe(40)
    expect(grid.top).toBe(8)
  })
})

describe('buildCategoryAxis / buildValueAxis', () => {
  test('category axis carries the labels, value axis is plain', () => {
    expect(buildCategoryAxis(['Jan', 'Feb'])).toEqual({
      type: 'category',
      data: ['Jan', 'Feb'],
    })
    expect(buildValueAxis()).toEqual({ type: 'value' })
  })
})

describe('buildAxisTooltip', () => {
  test('builds an axis-trigger tooltip envelope around the given axis pointer', () => {
    const tooltip = buildAxisTooltip({
      tokens,
      axisPointer: { type: 'line', lineStyle: { color: '#ccc' } },
    })

    expect(tooltip.trigger).toBe('axis')
    expect(tooltip.axisPointer).toEqual({
      type: 'line',
      lineStyle: { color: '#ccc' },
    })
    expect(tooltip.confine).toBe(false)
    expect(tooltip.appendTo).toBe('body')
    expect(tooltip.backgroundColor).toBe('transparent')
    expect(typeof tooltip.formatter).toBe('function')
    expect(typeof tooltip.position).toBe('function')
  })

  test('passes the shadow axis pointer through unchanged', () => {
    const tooltip = buildAxisTooltip({
      tokens,
      axisPointer: { type: 'shadow', shadowStyle: { color: '#eee' } },
    })

    expect(tooltip.axisPointer).toEqual({
      type: 'shadow',
      shadowStyle: { color: '#eee' },
    })
  })
})
