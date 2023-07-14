import { findTokenType } from '../index'
import type { TokenTypeDictionary } from '../types'

test('it should not find the token type', () => {
  const tokenTypes: TokenTypeDictionary = {
    background: 'color',
  }

  const notFoundInDefault = findTokenType('animation')
  const notFound = findTokenType('animation', tokenTypes)
  const empty = findTokenType('', tokenTypes)
  const space = findTokenType(' ', tokenTypes)
  const specialSymbol = findTokenType('$#.', tokenTypes)

  expect(notFoundInDefault).toBe(undefined)
  expect(notFound).toBe(undefined)
  expect(empty).toBe(undefined)
  expect(space).toBe(undefined)
  expect(specialSymbol).toBe(undefined)
})

test('it should find token types', () => {
  const foundOnDefault = findTokenType('background')
  const found = findTokenType('background', { background: 'bg' })

  expect(foundOnDefault).toBe('bg')
  expect(found).toBe('bg')
})
