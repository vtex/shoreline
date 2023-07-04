import { tokenize } from '../tokenize'

test('tokenize should handle custom values', () => {
  const result = tokenize('space', '2rem')

  expect(result).toStrictEqual('2rem')
})

test('tokenize should handle token values', () => {
  const result = tokenize('space', '$1')

  expect(result).toStrictEqual('var(--bf-space-1)')
})

test('tokenize should handle compound tokens', () => {
  const cases = [
    '$1 $1 $1 $1',
    '$1 $1 2rem $1',
    '$1 $1 $1',
    '$1 2rem $1',
    '$1 2rem',
    '2rem $1',
    '2rem 2rem',
  ]

  const result = cases.map((testCase) => tokenize('space', testCase))

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
