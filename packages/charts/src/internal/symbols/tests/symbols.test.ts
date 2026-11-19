import { describe, expect, test } from 'vitest'

import { isolatedPoints, lineSymbolSize, pointMarkersFit } from '../symbols'

describe('pointMarkersFit', () => {
  test('keeps markers while neighbours have room for three diameters', () => {
    // Six months on a desktop chart: one point per 100px.
    expect(pointMarkersFit({ count: 6, width: 600 })).toBe(true)
    // Exactly at the threshold still fits.
    expect(
      pointMarkersFit({
        count: 2,
        width: lineSymbolSize * 3,
      })
    ).toBe(true)
  })

  test('hides markers once neighbours crowd the width', () => {
    // 90 daily points on a phone: neighbours 3px apart.
    expect(pointMarkersFit({ count: 90, width: 320 })).toBe(false)
    // 30 daily points squeezed: ~10px apart, under three diameters.
    expect(pointMarkersFit({ count: 30, width: 300 })).toBe(false)
    // The same 30 points on a desktop chart still fit.
    expect(pointMarkersFit({ count: 30, width: 600 })).toBe(true)
  })

  test('measures distance, not point count', () => {
    const many = Array.from({ length: 90 }, (_, index) => index)

    expect(pointMarkersFit({ count: many.length, width: 1200 })).toBe(true)
  })

  test('keeps markers when there is nothing to measure', () => {
    expect(pointMarkersFit({ count: 1, width: 300 })).toBe(true)
    expect(pointMarkersFit({ count: 30 })).toBe(true)
    expect(pointMarkersFit({ count: 30, width: 0 })).toBe(true)
    expect(pointMarkersFit({ count: 30, width: Number.NaN })).toBe(true)
  })
})

describe('isolatedPoints', () => {
  test('finds values whose neighbours are both gaps', () => {
    expect(isolatedPoints([1, null, 2, null, null, 3, null])).toEqual([
      { index: 0, value: 1 },
      { index: 2, value: 2 },
      { index: 5, value: 3 },
    ])
    expect(isolatedPoints([null, 5, null])).toEqual([{ index: 1, value: 5 }])
  })

  test('counts a leading or trailing value whose only neighbour is a gap', () => {
    expect(isolatedPoints([5, null, 1])).toEqual([
      { index: 0, value: 5 },
      { index: 2, value: 1 },
    ])
  })

  test('leaves connected values alone, gaps included', () => {
    expect(isolatedPoints([1, 2, null, 3, 4])).toEqual([])
    expect(isolatedPoints([null, null, null])).toEqual([])
    expect(isolatedPoints([])).toEqual([])
  })

  test('treats missing slots and non-finite values as gaps', () => {
    // A short array's absent slot is a gap, like an explicit null.
    expect(
      isolatedPoints([1, undefined, 2] as unknown as Array<number | null>)
    ).toEqual([
      { index: 0, value: 1 },
      { index: 2, value: 2 },
    ])
    expect(isolatedPoints([1, Number.NaN, 2])).toEqual([
      { index: 0, value: 1 },
      { index: 2, value: 2 },
    ])
  })
})
