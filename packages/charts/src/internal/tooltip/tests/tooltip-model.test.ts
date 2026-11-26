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

  test('reverses only the first N rows on request', () => {
    const data = buildAxisTooltipData(
      [
        { name: 'Jan', seriesName: 'A', value: 1, seriesIndex: 0 },
        { name: 'Jan', seriesName: 'B', value: 2, seriesIndex: 1 },
        { name: 'Jan', seriesName: 'Line', value: 3, seriesIndex: 2 },
      ],
      { reverseUpTo: 2 }
    )

    // The bars are painted bottom-up, the line that follows keeps its order.
    expect(data.rows.map((row) => row.label)).toEqual(['B', 'A', 'Line'])
  })

  test('closes the summed rows with the total', () => {
    const data = buildAxisTooltipData(
      [
        { name: 'Jan', seriesName: 'A', value: 10, seriesIndex: 0 },
        { name: 'Jan', seriesName: 'B', value: 20, seriesIndex: 1 },
        { name: 'Jan', seriesName: 'Line', value: 7, seriesIndex: 2 },
      ],
      { total: { label: 'Total', seriesCount: 2 } }
    )

    expect(data.rows.map((row) => row.label)).toEqual([
      'A',
      'B',
      'Total',
      'Line',
    ])
    expect(data.rows[2]?.value).toBe('30')
  })

  test('places the total after the reversed group it sums', () => {
    const data = buildAxisTooltipData(
      [
        { name: 'Jan', seriesName: 'A', value: 10, seriesIndex: 0 },
        { name: 'Jan', seriesName: 'B', value: 20, seriesIndex: 1 },
        { name: 'Jan', seriesName: 'Line', value: 7, seriesIndex: 2 },
      ],
      { reverseUpTo: 2, total: { label: 'Total', seriesCount: 2 } }
    )

    expect(data.rows.map((row) => row.label)).toEqual([
      'B',
      'A',
      'Total',
      'Line',
    ])
  })

  test('sums only the rows the total covers', () => {
    const data = buildAxisTooltipData(
      [
        { name: 'Jan', seriesName: 'A', value: 10, seriesIndex: 0 },
        { name: 'Jan', seriesName: 'B', value: null, seriesIndex: 1 },
        { name: 'Jan', seriesName: 'Line', value: 7, seriesIndex: 2 },
      ],
      { total: { label: 'Total', seriesCount: 2 } }
    )

    // Null contributes nothing rather than zero-ing the sum.
    expect(data.rows.map((row) => [row.label, row.value])).toEqual([
      ['A', '10'],
      ['Total', '10'],
      ['Line', '7'],
    ])
  })

  test('adds no total when every summed series is empty', () => {
    const data = buildAxisTooltipData(
      [
        { name: 'Jan', seriesName: 'A', value: null, seriesIndex: 0 },
        { name: 'Jan', seriesName: 'Line', value: 7, seriesIndex: 1 },
      ],
      { total: { label: 'Total', seriesCount: 1 } }
    )

    expect(data.rows.map((row) => row.label)).toEqual(['Line'])
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

  test('writes values through the caller’s formatter', () => {
    const data = buildAxisTooltipData(
      [
        { name: 'Jan', seriesName: 'A', value: 3100, seriesIndex: 0 },
        { name: 'Jan', seriesName: 'B', value: 1500, seriesIndex: 1 },
      ],
      {
        total: { label: 'Total', seriesCount: 2 },
        formatValue: (value) => `#${value}`,
      }
    )

    expect(data.rows.map((row) => row.value)).toEqual([
      '#3100',
      '#1500',
      '#4600',
    ])
  })

  test('prints values as the engine writes them without a formatter', () => {
    const data = buildAxisTooltipData([
      { name: 'Jan', seriesName: 'A', value: 3100 },
    ])

    expect(data.rows[0]?.value).toBe('3100')
  })

  test('drops the one row a series is skipped at', () => {
    const data = buildAxisTooltipData(
      [
        {
          name: 'Jun',
          seriesName: 'Revenue',
          value: 50,
          seriesIndex: 0,
          dataIndex: 4,
        },
        {
          name: 'Jun',
          seriesName: 'Forecast',
          value: 50,
          seriesIndex: 1,
          dataIndex: 4,
        },
      ],
      {
        skipRow: (seriesIndex, dataIndex) =>
          seriesIndex === 1 && dataIndex === 4,
      }
    )

    expect(data.rows.map((row) => row.label)).toEqual(['Revenue'])
  })

  test('keeps rows at the other categories of a skipped series', () => {
    const data = buildAxisTooltipData(
      [
        {
          name: 'Jul',
          seriesName: 'Forecast',
          value: 60,
          seriesIndex: 1,
          dataIndex: 5,
        },
      ],
      {
        skipRow: (seriesIndex, dataIndex) =>
          seriesIndex === 1 && dataIndex === 4,
      }
    )

    expect(data.rows.map((row) => row.label)).toEqual(['Forecast'])
  })

  test('skips the lookup for items missing either position', () => {
    const skipRow = vi.fn()

    buildAxisTooltipData(
      [
        { name: 'Jan', seriesName: 'A', value: 10 },
        { name: 'Jan', seriesName: 'B', value: 10, seriesIndex: 1 },
        { name: 'Jan', seriesName: 'C', value: 10, dataIndex: 0 },
      ],
      { skipRow }
    )

    expect(skipRow).not.toHaveBeenCalled()
  })

  test('marks a row dashed when its series renders dashed', () => {
    const data = buildAxisTooltipData(
      [
        { name: 'Jul', seriesName: 'Revenue', value: 10, seriesIndex: 0 },
        { name: 'Jul', seriesName: 'Forecast', value: 60, seriesIndex: 1 },
      ],
      { getDashed: (seriesIndex) => seriesIndex === 1 }
    )

    expect(data.rows[0]).not.toHaveProperty('dashed')
    expect(data.rows[1]?.dashed).toBe(true)
  })

  test('leaves rows solid when no dashed resolver is given', () => {
    const data = buildAxisTooltipData([
      { name: 'Jul', seriesName: 'Revenue', value: 10, seriesIndex: 0 },
    ])

    expect(data.rows[0]).not.toHaveProperty('dashed')
  })
})
