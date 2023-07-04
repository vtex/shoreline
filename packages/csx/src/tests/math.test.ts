import { min, max, clamp } from '../math'

test('min should parse a list of values', () => {
  expect(min('1rem', '50%', '4rem')).toBe('min(1rem, 50%, 4rem)')
})

test('max should parse a list of values', () => {
  expect(max('1rem', '50%', '4rem')).toBe('max(1rem, 50%, 4rem)')
})

test('clamp should clamp its parameters', () => {
  expect(clamp('1rem', '50%', '4rem')).toBe('clamp(1rem, 50%, 4rem)')
})
