import { cleanTokenString, isToken } from '../index'

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
