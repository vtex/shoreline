import { describe, expect, test, vi } from 'vitest'

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

  test('reverses row order on request, keeping the title', () => {
    const data = buildAxisTooltipData(
      [
        { name: 'Jan', seriesName: 'Revenue', value: 10 },
        { name: 'Jan', seriesName: 'Costs', value: 4 },
      ],
      { reverse: true }
    )

    expect(data.rows.map((row) => row.label)).toEqual(['Costs', 'Revenue'])
    expect(data.title).toBe('Jan')
  })

  test('reverses only the rows that survive filtering', () => {
    const data = buildAxisTooltipData(
      [
        { name: 'Jan', seriesName: 'Revenue', value: 10 },
        { name: 'Jan', seriesName: 'Costs', value: null },
        { name: 'Jan', seriesName: 'Other', value: 7 },
      ],
      { reverse: true }
    )

    expect(data.rows.map((row) => row.label)).toEqual(['Other', 'Revenue'])
  })

  test('attaches a delta resolved from the series and category positions', () => {
    const data = buildAxisTooltipData(
      [
        {
          name: 'Feb',
          seriesName: 'Revenue',
          value: 10,
          seriesIndex: 2,
          dataIndex: 1,
        },
      ],
      {
        getDelta: (seriesIndex, dataIndex) =>
          seriesIndex === 2 && dataIndex === 1
            ? { value: '12%', direction: 'up' }
            : undefined,
      }
    )

    expect(data.rows[0]?.delta).toEqual({ value: '12%', direction: 'up' })
  })

  test('leaves rows without a delta when the resolver has none', () => {
    const data = buildAxisTooltipData(
      [
        {
          name: 'Jan',
          seriesName: 'Revenue',
          value: 10,
          seriesIndex: 0,
          dataIndex: 0,
        },
      ],
      { getDelta: () => undefined }
    )

    expect(data.rows[0]).not.toHaveProperty('delta')
  })

  test('skips the lookup for items missing either position', () => {
    const getDelta = vi.fn()

    buildAxisTooltipData(
      [
        { name: 'Jan', seriesName: 'A', value: 10 },
        { name: 'Jan', seriesName: 'B', value: 10, seriesIndex: 1 },
        { name: 'Jan', seriesName: 'C', value: 10, dataIndex: 0 },
      ],
      { getDelta }
    )

    expect(getDelta).not.toHaveBeenCalled()
  })

  test('resolves same-named series to their own deltas', () => {
    const data = buildAxisTooltipData(
      [
        {
          name: 'Jan',
          seriesName: 'Sales',
          value: 10,
          seriesIndex: 0,
          dataIndex: 0,
        },
        {
          name: 'Jan',
          seriesName: 'Sales',
          value: 20,
          seriesIndex: 1,
          dataIndex: 0,
        },
      ],
      {
        getDelta: (seriesIndex) => ({
          value: `s${seriesIndex}`,
          direction: 'up',
        }),
      }
    )

    expect(data.rows.map((row) => row.delta?.value)).toEqual(['s0', 's1'])
  })

  test('keeps each delta with its own row when reversing', () => {
    const data = buildAxisTooltipData(
      [
        {
          name: 'Jan',
          seriesName: 'Revenue',
          value: 10,
          seriesIndex: 0,
          dataIndex: 0,
        },
        {
          name: 'Jan',
          seriesName: 'Costs',
          value: 4,
          seriesIndex: 1,
          dataIndex: 0,
        },
      ],
      {
        reverse: true,
        getDelta: (seriesIndex) => ({
          value: seriesIndex === 0 ? '12%' : '3%',
          direction: 'up',
        }),
      }
    )

    expect(data.rows.map((row) => [row.label, row.delta?.value])).toEqual([
      ['Costs', '3%'],
      ['Revenue', '12%'],
    ])
  })
})
