import { describe, expect, test } from 'vitest'

import { createTooltipPositioner, formatAxisTooltip } from '../tooltip-echarts'

describe('formatAxisTooltip', () => {
  test('wraps a single item param in an array', () => {
    const html = formatAxisTooltip({
      name: 'Jan',
      seriesName: 'Revenue',
      value: 10,
      color: '#3993f4',
    })

    expect(html).toContain('Revenue')
  })

  test('renders one row per series in an axis-trigger array', () => {
    const html = formatAxisTooltip([
      { name: 'Jan', seriesName: 'Revenue', value: 10, color: '#3993f4' },
      { name: 'Jan', seriesName: 'Costs', value: 4, color: '#9c56f3' },
    ])

    expect(html).toContain('Revenue')
    expect(html).toContain('Costs')
  })

  test('ignores non-numeric values and non-string colors from the engine', () => {
    const html = formatAxisTooltip([
      { name: 'Jan', seriesName: 'Revenue', value: '-', color: {} },
    ])

    expect(html).toBe('')
  })
})

describe('createTooltipPositioner', () => {
  test('delegates to getTooltipPosition with the given offset', () => {
    const position = createTooltipPositioner(8)

    const result = position([100, 50], {}, null, null, {
      contentSize: [80, 40],
      viewSize: [400, 300],
    })

    expect(result).toEqual([108, 30])
  })
})
