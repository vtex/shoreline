import { cleanTokenString, isToken } from '../index'
import { isString } from '../token'

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

describe('cleanTokenString', () => {
  it('should not clean a string that is not a token', () => {
    expect(cleanTokenString('')).toEqual('')
    expect(cleanTokenString('&')).toEqual('&')
    expect(cleanTokenString('1')).toEqual('1')
    expect(cleanTokenString('token')).toEqual('token')
    expect(cleanTokenString('&token')).toEqual('&token')
    expect(cleanTokenString('t$oken$')).toEqual('t$oken$')
  })

  it('should clean a string that is a token', () => {
    expect(cleanTokenString('$')).toEqual('')
    expect(cleanTokenString('$token')).toEqual('token')
    expect(cleanTokenString('$1')).toEqual('1')
    expect(cleanTokenString('$token$')).toEqual('token$')
  })
})

describe('isToken', () => {
  it('should not be a token', () => {
    expect(isToken('')).toBeFalsy()
    expect(isToken('&')).toBeFalsy()
    expect(isToken('1')).toBeFalsy()
    expect(isToken('token')).toBeFalsy()
    expect(isToken('&token')).toBeFalsy()
    expect(isToken('t$oken$')).toBeFalsy()
  })

  it('should be a token', () => {
    expect(isToken('$')).toBeTruthy()
    expect(isToken('$token')).toBeTruthy()
    expect(isToken('$1')).toBeTruthy()
    expect(isToken('$token$')).toBeTruthy()
  })
})
