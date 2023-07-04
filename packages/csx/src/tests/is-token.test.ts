import { isToken } from '../is-token'

test('should not be a token', () => {
  expect(isToken('')).toBeFalsy()
  expect(isToken('&')).toBeFalsy()
  expect(isToken('1')).toBeFalsy()
  expect(isToken('token')).toBeFalsy()
  expect(isToken('&token')).toBeFalsy()
  expect(isToken('t$oken$')).toBeFalsy()
})

test('should be a token', () => {
  expect(isToken('$')).toBeTruthy()
  expect(isToken('$token')).toBeTruthy()
  expect(isToken('$1')).toBeTruthy()
  expect(isToken('$token$')).toBeTruthy()
})
