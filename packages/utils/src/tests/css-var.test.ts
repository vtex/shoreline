import { test, expect } from '@vtex/shoreline-test-utils'
import { constants } from '../constants'
import { cssVar } from '../index'

test('not parses empty strings', () => {
  expect(
    cssVar({
      token: '',
    })
  ).toStrictEqual('')

  expect(
    cssVar({
      token: constants.whiteSpace,
    })
  ).toStrictEqual('')

  expect(
    cssVar({
      token: '',
      deepSearch: true,
    })
  ).toStrictEqual('')

  expect(
    cssVar({
      token: constants.whiteSpace,
      deepSearch: true,
    })
  ).toStrictEqual('')
})

test('ignores custom values', () => {
  const flat = cssVar({
    token: '2rem',
  })

  const deep = cssVar({
    token: '2rem',
    deepSearch: true,
  })

  expect(flat).toStrictEqual('2rem')
  expect(deep).toStrictEqual('2rem')
})

test('parses a single token', () => {
  const flat = cssVar({ token: '$space-1' })
  const deep = cssVar({ token: '$space-1', deepSearch: true })

  expect(flat).toStrictEqual('var(--sl-space-1)')
  expect(deep).toStrictEqual('var(--sl-space-1)')
})

test('deeply parse multiple tokens', () => {
  const cases = [
    '$space-1 $space-1 $space-1 $space-1',
    '$space-1 $space-1 2rem $space-1',
    '$space-1 $space-1 $space-1',
    '$space-1 2rem $space-1',
    '$space-1 2rem',
    '2rem $space-1',
    '2rem 2rem',
  ]

  const result = cases.map((testCase) =>
    cssVar({ token: testCase, deepSearch: true })
  )

  const expected = [
    'var(--sl-space-1) var(--sl-space-1) var(--sl-space-1) var(--sl-space-1)',
    'var(--sl-space-1) var(--sl-space-1) 2rem var(--sl-space-1)',
    'var(--sl-space-1) var(--sl-space-1) var(--sl-space-1)',
    'var(--sl-space-1) 2rem var(--sl-space-1)',
    'var(--sl-space-1) 2rem',
    '2rem var(--sl-space-1)',
    '2rem 2rem',
  ]

  expect(result).toStrictEqual(expected)
})

test('accepts other prefixes', () => {
  const result = cssVar({
    token: '$color-brand',
    prefix: 'vtex',
  })

  const expectation = 'var(--vtex-color-brand)'

  expect(result).toStrictEqual(expectation)
})
