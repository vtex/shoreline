import { describe, expect, test } from 'vitest'

import {
  createAxisTooltipFormatter,
  createTooltipPositioner,
} from '../tooltip-echarts'

describe('createAxisTooltipFormatter', () => {
  test('wraps a single item param in an array', () => {
    const html = createAxisTooltipFormatter()({
      name: 'Jan',
      seriesName: 'Revenue',
      value: 10,
      color: '#3993f4',
    })

    expect(html).toContain('Revenue')
  })

  test('renders one row per series in an axis-trigger array', () => {
    const html = createAxisTooltipFormatter()([
      { name: 'Jan', seriesName: 'Revenue', value: 10, color: '#3993f4' },
      { name: 'Jan', seriesName: 'Costs', value: 4, color: '#9c56f3' },
    ])

    expect(html).toContain('Revenue')
    expect(html).toContain('Costs')
  })

  test('keeps the engine series order by default', () => {
    const html = createAxisTooltipFormatter()([
      { name: 'Jan', seriesName: 'Revenue', value: 10, color: '#3993f4' },
      { name: 'Jan', seriesName: 'Costs', value: 4, color: '#9c56f3' },
    ])

    expect(html.indexOf('Revenue')).toBeLessThan(html.indexOf('Costs'))
  })

  test('reverses the rows when bound to reverse order', () => {
    const html = createAxisTooltipFormatter({ reverse: true })([
      { name: 'Jan', seriesName: 'Revenue', value: 10, color: '#3993f4' },
      { name: 'Jan', seriesName: 'Costs', value: 4, color: '#9c56f3' },
    ])

    expect(html.indexOf('Costs')).toBeLessThan(html.indexOf('Revenue'))
  })

  test('passes the engine series and data indexes to the delta resolver', () => {
    const html = createAxisTooltipFormatter({
      getDelta: (seriesIndex, dataIndex) => ({
        value: `${seriesIndex}:${dataIndex}`,
        direction: 'up',
      }),
    })([
      {
        name: 'Feb',
        seriesName: 'Revenue',
        value: 10,
        color: '#3993f4',
        seriesIndex: 3,
        dataIndex: 1,
      },
    ])

    expect(html).toContain('3:1')
  })

  test('resolves no delta when the engine reports no positions', () => {
    const html = createAxisTooltipFormatter({
      getDelta: () => ({ value: '12%', direction: 'up' as const }),
    })([{ name: 'Jan', seriesName: 'Revenue', value: 10, color: '#3993f4' }])

    expect(html).not.toContain('12%')
  })

  test('ignores non-numeric values and non-string colors from the engine', () => {
    const html = createAxisTooltipFormatter()([
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
