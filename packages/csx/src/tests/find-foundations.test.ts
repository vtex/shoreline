import { findFoundation } from '../index'
import type { FoundationDictionary } from '../types'

test('it should not find the foundation', () => {
  const testFoundations: FoundationDictionary = {
    background: 'color',
  }

  const notFoundInDefault = findFoundation('animation')
  const notFound = findFoundation('animation', testFoundations)
  const empty = findFoundation('', testFoundations)
  const space = findFoundation(' ', testFoundations)
  const specialSymbol = findFoundation('$#.', testFoundations)

  expect(notFoundInDefault).toBe(undefined)
  expect(notFound).toBe(undefined)
  expect(empty).toBe(undefined)
  expect(space).toBe(undefined)
  expect(specialSymbol).toBe(undefined)
})

test('it should find foundations', () => {
  const foundOnDefault = findFoundation('background')
  const found = findFoundation('background', { background: 'bg' })

  expect(foundOnDefault).toBe('bg')
  expect(found).toBe('bg')
})
