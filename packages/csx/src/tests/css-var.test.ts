import { SPACE } from '../constants'
import { cssVar } from '../index'

test('not parses empty strings', () => {
  expect(
    cssVar({
      tokenType: 'bg',
      token: '',
    })
  ).toStrictEqual('')

  expect(
    cssVar({
      tokenType: 'bg',
      token: SPACE,
    })
  ).toStrictEqual('')

  expect(
    cssVar({
      tokenType: 'bg',
      token: '',
      deepSearch: true,
    })
  ).toStrictEqual('')

  expect(
    cssVar({
      tokenType: 'bg',
      token: SPACE,
      deepSearch: true,
    })
  ).toStrictEqual('')
})

test('ignores custom values', () => {
  const flat = cssVar({
    tokenType: 'space',
    token: '2rem',
  })

  const deep = cssVar({
    tokenType: 'space',
    token: '2rem',
    deepSearch: true,
  })

  expect(flat).toStrictEqual('2rem')
  expect(deep).toStrictEqual('2rem')
})

test('parses a single token', () => {
  const flat = cssVar({ tokenType: 'space', token: '$1' })
  const deep = cssVar({ tokenType: 'space', token: '$1', deepSearch: true })

  expect(flat).toStrictEqual('var(--bf-space-1)')
  expect(deep).toStrictEqual('var(--bf-space-1)')
})

test('deeply parse multiple tokens', () => {
  const cases = [
    '$1 $1 $1 $1',
    '$1 $1 2rem $1',
    '$1 $1 $1',
    '$1 2rem $1',
    '$1 2rem',
    '2rem $1',
    '2rem 2rem',
  ]

  const result = cases.map((testCase) =>
    cssVar({ tokenType: 'space', token: testCase, deepSearch: true })
  )

  const expected = [
    'var(--bf-space-1) var(--bf-space-1) var(--bf-space-1) var(--bf-space-1)',
    'var(--bf-space-1) var(--bf-space-1) 2rem var(--bf-space-1)',
    'var(--bf-space-1) var(--bf-space-1) var(--bf-space-1)',
    'var(--bf-space-1) 2rem var(--bf-space-1)',
    'var(--bf-space-1) 2rem',
    '2rem var(--bf-space-1)',
    '2rem 2rem',
  ]

  expect(result).toStrictEqual(expected)
})
