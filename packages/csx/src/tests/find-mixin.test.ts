import { findMixin } from '../index'
import type { MixinDictionary } from '../types'

test('it should not find the mixin', () => {
  const testMixins: MixinDictionary = {
    mixin: (val) => ({
      prop: val,
    }),
  }

  const notFoundInDefault = findMixin('animation')
  const notFound = findMixin('animation', testMixins)
  const empty = findMixin('', testMixins)
  const space = findMixin(' ', testMixins)
  const specialSymbol = findMixin('$#.', testMixins)

  expect(notFoundInDefault).toBe(undefined)
  expect(notFound).toBe(undefined)
  expect(empty).toBe(undefined)
  expect(space).toBe(undefined)
  expect(specialSymbol).toBe(undefined)
})

test('it should find mixin', () => {
  const testMixins: MixinDictionary = {
    mixin: (val) => ({
      prop: val,
    }),
  }

  const foundOnDefault = findMixin('marginX')
  const found = findMixin('mixin', testMixins)

  expect(typeof foundOnDefault).toBe('function')
  expect(foundOnDefault?.('1rem')).toStrictEqual({
    marginLeft: '1rem',
    marginRight: '1rem',
  })
  expect(typeof found).toBe('function')
  expect(found?.('value')).toStrictEqual({
    prop: 'value',
  })
})
