import { isString } from '../string'

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
