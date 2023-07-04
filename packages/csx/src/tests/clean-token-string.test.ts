import { cleanTokenString } from '../clean-token-string'

test('it should not clean a string that is not a token', () => {
  expect(cleanTokenString('')).toEqual('')
  expect(cleanTokenString('&')).toEqual('&')
  expect(cleanTokenString('1')).toEqual('1')
  expect(cleanTokenString('token')).toEqual('token')
  expect(cleanTokenString('&token')).toEqual('&token')
  expect(cleanTokenString('t$oken$')).toEqual('t$oken$')
})

test('it should clean a string that is a token', () => {
  expect(cleanTokenString('$')).toEqual('')
  expect(cleanTokenString('$token')).toEqual('token')
  expect(cleanTokenString('$1')).toEqual('1')
  expect(cleanTokenString('$token$')).toEqual('token$')
})
