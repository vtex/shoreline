import { hasDuplicates } from '../index'

describe('hasDuplicates', () => {
  it('should work with empty lists', () => {
    expect(hasDuplicates([])).toBe(false)
    expect(hasDuplicates([[]])).toBe(false)
    expect(hasDuplicates([[], []])).toBe(false)
  })
  it('should work if null and undefined', () => {
    expect(hasDuplicates([null])).toBe(false)
    expect(hasDuplicates([undefined])).toBe(false)
    expect(hasDuplicates([null, undefined])).toBe(false)
    expect(hasDuplicates([null, undefined, null])).toBeTruthy()
  })
  it('should return false on unique lists', () => {
    expect(hasDuplicates([1])).toBe(false)
    expect(hasDuplicates([1, 2])).toBe(false)
    expect(hasDuplicates([1, 2, 3])).toBe(false)
    expect(hasDuplicates(['foo', 'bar', 'pib'])).toBe(false)
  })
  it('should return true on lists with duplicates', () => {
    expect(hasDuplicates([1, 1])).toBe(true)
    expect(hasDuplicates(['foo', 'bar', 'foo'])).toBe(true)
    expect(hasDuplicates(['pib', 'bar', 'foo', 'bar'])).toBe(true)
    expect(hasDuplicates([true, 'bar', true])).toBe(true)
  })
})
