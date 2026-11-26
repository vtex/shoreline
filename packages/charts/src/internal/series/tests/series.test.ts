import { describe, expect, test } from 'vitest'

import type { ChartSeries } from '../series'
import {
  collapseSeries,
  createDeltaLookup,
  defaultMaxSeries,
  seriesLimit,
} from '../series'

describe('collapseSeries', () => {
  test('leaves the series untouched when they fit within maxSeries', () => {
    const series: ChartSeries[] = [
      { name: 'A', data: [1] },
      { name: 'B', data: [2] },
      { name: 'C', data: [3] },
    ]

    expect(collapseSeries(series, 'Others', 3)).toBe(series)
  })

  test('folds the tail into a single aggregate named from othersLabel', () => {
    const result = collapseSeries(
      [
        { name: 'A', data: [1, 2] },
        { name: 'B', data: [3, 4] },
        { name: 'C', data: [5, 6] },
        { name: 'D', data: [7, 8] },
      ],
      'Others',
      3
    )

    expect(result.map((s) => s.name)).toEqual(['A', 'B', 'Others'])
    expect(result[2]?.data).toEqual([12, 14])
  })

  test('clamps maxSeries to the palette limit', () => {
    expect(seriesLimit).toBe(6)

    const result = collapseSeries(
      Array.from({ length: 10 }, (_, i) => ({ name: `S${i}`, data: [1] })),
      'Others',
      99
    )

    expect(result).toHaveLength(seriesLimit)
    expect(result[seriesLimit - 1]?.name).toBe('Others')
  })

  test('keeps the aggregate null where every folded series is null', () => {
    const result = collapseSeries(
      [
        { name: 'A', data: [1, 1, 1] },
        { name: 'B', data: [1, 1, 1] },
        { name: 'C', data: [null, 5, null] },
        { name: 'D', data: [null, null, 7] },
      ],
      'Others',
      defaultMaxSeries
    )

    expect(result[2]?.data).toEqual([null, 5, 7])
  })
})

describe('createDeltaLookup', () => {
  test('returns undefined when no series carries deltas', () => {
    expect(
      createDeltaLookup([
        { name: 'A', data: [1] },
        { name: 'B', data: [2] },
      ])
    ).toBeUndefined()
  })

  test('resolves a delta by series and category position', () => {
    const lookup = createDeltaLookup([
      {
        name: 'A',
        data: [10, 20],
        deltas: [
          { value: '12%', direction: 'up' },
          { value: '4%', direction: 'down' },
        ],
      },
      { name: 'B', data: [30] },
    ])

    expect(lookup?.(0, 0)).toEqual({ value: '12%', direction: 'up' })
    expect(lookup?.(0, 1)).toEqual({ value: '4%', direction: 'down' })
    // B has no deltas.
    expect(lookup?.(1, 0)).toBeUndefined()
    // Out-of-range positions resolve to undefined, not a thrown lookup.
    expect(lookup?.(5, 5)).toBeUndefined()
  })

  test('keeps deltas apart for two series sharing a name', () => {
    const lookup = createDeltaLookup([
      {
        name: 'Sales',
        data: [10],
        deltas: [{ value: 'first', direction: 'up' }],
      },
      {
        name: 'Sales',
        data: [20],
        deltas: [{ value: 'second', direction: 'up' }],
      },
    ])

    expect(lookup?.(0, 0)?.value).toBe('first')
    expect(lookup?.(1, 0)?.value).toBe('second')
  })
})
