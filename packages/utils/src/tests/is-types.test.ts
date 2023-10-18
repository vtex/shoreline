import { isString, isFunction } from '../is-types'

describe('isString', () => {
  it('should not be a string', () => {
    expect(isString(1)).toBeFalsy()
    expect(isString(undefined)).toBeFalsy()
    expect(isString(null)).toBeFalsy()
    expect(isString({})).toBeFalsy()
    expect(isString(true)).toBeFalsy()
  })

  it('should be a string', () => {
    expect(isString('')).toBeTruthy()
    expect(isString('  ')).toBeTruthy()
    expect(isString('1')).toBeTruthy()
    expect(isString('undefined')).toBeTruthy()
    expect(isString('null')).toBeTruthy()
    expect(isString('{}')).toBeTruthy()
    expect(isString('true')).toBeTruthy()
  })
})

describe('isFunction', () => {
  it('should be true if is function', () => {
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(() => () => {})).toBe(true)
    expect(isFunction(function () {})).toBe(true)
    expect(
      isFunction(function () {
        return null
      })
    ).toBe(true)
    expect(
      isFunction(function () {
        return () => {}
      })
    ).toBe(true)
    expect(
      isFunction(function (a: number) {
        return a
      })
    ).toBe(true)
  })
  it('should be false if is not a function', () => {
    expect(isFunction(null)).toBe(false)
    expect(isFunction(undefined)).toBe(false)
    expect(isFunction(1)).toBe(false)
    expect(isFunction({})).toBe(false)
    expect(isFunction([])).toBe(false)
    expect(isFunction([() => {}])).toBe(false)
    expect(isFunction({ dog: 'woof' })).toBe(false)
  })
})