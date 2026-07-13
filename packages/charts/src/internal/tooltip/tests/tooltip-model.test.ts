import { describe, expect, test } from 'vitest'

import { buildAxisTooltipData } from '../tooltip-model'

describe('buildAxisTooltipData', () => {
  test('uses the first item name as the title', () => {
    const data = buildAxisTooltipData([
      { name: 'Jan', seriesName: 'Revenue', value: 10 },
    ])

    expect(data.title).toBe('Jan')
  })

  test('maps each item to a row, keeping series color', () => {
    const data = buildAxisTooltipData([
      { name: 'Jan', seriesName: 'Revenue', value: 10, color: '#3993f4' },
      { name: 'Jan', seriesName: 'Costs', value: 4, color: '#9c56f3' },
    ])

    expect(data.rows).toEqual([
      { label: 'Revenue', value: '10', color: '#3993f4' },
      { label: 'Costs', value: '4', color: '#9c56f3' },
    ])
  })

  test('drops rows for series with no bar at this category', () => {
    const data = buildAxisTooltipData([
      { name: 'Jan', seriesName: 'Revenue', value: 10 },
      { name: 'Jan', seriesName: 'Costs', value: null },
      { name: 'Jan', seriesName: 'Other', value: undefined },
    ])

    expect(data.rows).toHaveLength(1)
    expect(data.rows[0]?.label).toBe('Revenue')
  })

  test('falls back to an empty label when the series has none', () => {
    const data = buildAxisTooltipData([{ name: 'Jan', value: 10 }])

    expect(data.rows[0]?.label).toBe('')
  })

  test('has no title when there are no items', () => {
    expect(buildAxisTooltipData([]).title).toBeUndefined()
  })
})
