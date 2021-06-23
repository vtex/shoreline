import { callOrReturn } from '../index'

describe('callOrReturn', () => {
  it('should work with null and undefined', () => {
    expect(callOrReturn(null, null)).toBe(null)
    expect(callOrReturn(null, undefined)).toBe(null)
    expect(callOrReturn(undefined, null)).toBe(undefined)
    expect(callOrReturn(undefined, undefined)).toBe(undefined)
  })

  it('should call if function', () => {
    expect(callOrReturn((v: number) => v, 5)).toBe(5)
    expect(callOrReturn((a: number) => (b: number) => a + b, 5)(10)).toBe(15)
  })

  it('should return otherwise', () => {
    expect(callOrReturn(true, 10)).toBe(true)
    expect(callOrReturn({ value: 10 }, 10)).toEqual({ value: 10 })
  })
})
