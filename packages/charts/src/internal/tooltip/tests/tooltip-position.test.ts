import { describe, expect, test } from 'vitest'

import { getTooltipPosition } from '../tooltip-position'

describe('getTooltipPosition', () => {
  test('places the tooltip to the right when the point is in the left half', () => {
    const [x] = getTooltipPosition({
      point: [100, 50],
      contentSize: [80, 40],
      viewSize: [400, 300],
      offset: 8,
    })

    expect(x).toBe(108)
  })

  test('places the tooltip to the left when the point is in the right half', () => {
    const [x] = getTooltipPosition({
      point: [300, 50],
      contentSize: [80, 40],
      viewSize: [400, 300],
      offset: 8,
    })

    expect(x).toBe(212)
  })

  test('centers the tooltip vertically on the point', () => {
    const [, y] = getTooltipPosition({
      point: [100, 150],
      contentSize: [80, 40],
      viewSize: [400, 300],
      offset: 8,
    })

    expect(y).toBe(130)
  })

  test('overflows the top of the chart rather than clamping to it', () => {
    const [, y] = getTooltipPosition({
      point: [100, 0],
      contentSize: [80, 40],
      viewSize: [400, 300],
      offset: 8,
    })

    expect(y).toBe(-20)
  })

  test('overflows the bottom of the chart rather than clamping to it', () => {
    const [, y] = getTooltipPosition({
      point: [100, 300],
      contentSize: [80, 40],
      viewSize: [400, 300],
      offset: 8,
    })

    expect(y).toBe(280)
  })

  test('overflows the left of the chart rather than clamping to it', () => {
    const [x] = getTooltipPosition({
      point: [300, 50],
      contentSize: [500, 40],
      viewSize: [400, 300],
      offset: 8,
    })

    expect(x).toBe(-208)
  })

  test('overflows the right of the chart rather than clamping to it', () => {
    const [x] = getTooltipPosition({
      point: [199, 50],
      contentSize: [500, 40],
      viewSize: [400, 300],
      offset: 8,
    })

    expect(x).toBe(207)
  })
})
