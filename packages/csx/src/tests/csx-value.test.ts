import { CsxValue } from '../csx-value'
import { test, expect } from 'vitest'

test('should be able to tell if csx-value is a token', () => {
  const token = new CsxValue('bg', '$bg-primary')
  const notAToken = new CsxValue('bg', 'bg-primary')
  const number = new CsxValue('zIndex', 100)
  const emptyObject = new CsxValue('> button', {})
  const object = new CsxValue('> button', { padding: '$space-0' })

  expect(token.isToken()).toBeTruthy()
  expect(notAToken.isToken()).toBeFalsy()
  expect(number.isToken()).toBeFalsy()
  expect(emptyObject.isToken()).toBeFalsy()
  expect(object.isToken()).toBeFalsy()
})

test('should be able to tell if csx-value is an object', () => {
  const token = new CsxValue('bg', '$bg-primary')
  const notAToken = new CsxValue('bg', 'bg-primary')
  const number = new CsxValue('zIndex', 100)
  const emptyObject = new CsxValue('> button', {})
  const object = new CsxValue('> button', { padding: '$space-0' })

  expect(token.isObject()).toBeFalsy()
  expect(notAToken.isObject()).toBeFalsy()
  expect(number.isObject()).toBeFalsy()
  expect(emptyObject.isObject()).toBeTruthy()
  expect(object.isObject()).toBeTruthy()
})
