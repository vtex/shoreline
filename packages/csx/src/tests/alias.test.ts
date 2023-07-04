import { alias } from '../alias'

test('keeps unalised properties intact', () => {
  const testAliases = {
    xpto: 'x',
  }

  const notFoundInDefault = alias('a')
  const notFound = alias('a', testAliases)
  const empty = alias('', testAliases)
  const space = alias(' ', testAliases)
  const specialSymbol = alias('$#.', testAliases)

  expect(notFoundInDefault).toBe('a')
  expect(notFound).toBe('a')
  expect(empty).toBe('')
  expect(space).toBe(' ')
  expect(specialSymbol).toBe('$#.')
})

test('it should alias properties', () => {
  const simpleAlias = alias('bg', { bg: 'background' })
  const specialSymbol = alias('#something', { '#something': 's' })

  expect(simpleAlias).toBe('background')
  expect(specialSymbol).toBe('s')
})

test('it should alias defaultProps', () => {
  const bg = alias('bg')

  expect(bg).toBe('background')
})
