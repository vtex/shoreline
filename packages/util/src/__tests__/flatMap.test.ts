import { flatMap } from '../index'

describe('flatMap', () => {
  it('should work with arrays', () => {
    const entries = [
      [1, 2, 3],
      [4, 5, 6],
    ]
    const double = (n: number) => n * 2

    expect(flatMap(entries, (arr) => arr)).toEqual([1, 2, 3, 4, 5, 6])
    expect(flatMap(entries, (arr) => arr.map(double))).toEqual([
      2,
      4,
      6,
      8,
      10,
      12,
    ])
  })

  it('should work with objects', () => {
    const entries = [{ arr: [1, 2, 3] }, { arr: [4, 5, 6] }]
    const double = (n: number) => n * 2

    expect(flatMap(entries, (e) => e.arr)).toEqual([1, 2, 3, 4, 5, 6])
    expect(flatMap(entries, (e) => e.arr.map(double))).toEqual([
      2,
      4,
      6,
      8,
      10,
      12,
    ])
  })
})
