import { omit, pick, get, isObjectEmpty, renameKeys } from '../object'

const obj = { a: 1, b: 2, c: { d: 3 } }

test('should return object with omitted property', () => {
  expect(omit(obj, ['a'])).toStrictEqual({ b: 2, c: { d: 3 } })
})

test('should return property in object with specified key', () => {
  expect(pick(obj, ['a'])).toStrictEqual({ a: 1 })
})

test('should get value of specified path in object', () => {
  expect(get(undefined, 'a.b', 2)).toStrictEqual(2)
  expect(get(null, 'a.b', 2)).toStrictEqual(2)
  expect(get(obj, 'c.d')).toStrictEqual(3)
})

describe('isObjectEmpty', () => {
  it('should return true if objects are empty', () => {
    expect(isObjectEmpty({})).toBe(true)
  })
  it('should return false if objects are not empty', () => {
    expect(isObjectEmpty({ foo: null })).toBe(false)
  })
})

describe('renameKeys', () => {
  it('should return the same object', () => {
    const obj = {
      style: 'a',
    }

    expect(renameKeys({ style: 'style' }, obj)).toStrictEqual(obj)
    expect(renameKeys({}, obj)).toStrictEqual(obj)
  })

  it('should rename keys', () => {
    const obj = {
      style: 'a',
    }

    expect(renameKeys({ style: 'styleOverrides' }, obj)).toStrictEqual({
      styleOverrides: 'a',
    })
  })
})
