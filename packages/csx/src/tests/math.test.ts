import { min, max, clamp, calc } from '../index'

test('min should parse a list of values', () => {
  expect(min('1rem', '50%', '4rem')).toBe('min(1rem, 50%, 4rem)')
})

test('max should parse a list of values', () => {
  expect(max('1rem', '50%', '4rem')).toBe('max(1rem, 50%, 4rem)')
})

test('clamp should clamp its parameters', () => {
  expect(clamp('1rem', '50%', '4rem')).toBe('clamp(1rem, 50%, 4rem)')
})

test('calc adds values', () => {
  expect(calc.add('1rem', '1rem')).toBe('calc(1rem + 1rem)')
})

test('calc subtracts values', () => {
  expect(calc.subtract('1rem', '1rem')).toBe('calc(1rem - 1rem)')
})

test('calc multiply values', () => {
  expect(calc.multiply('1rem', '1rem')).toBe('calc(1rem * 1rem)')
})

test('calc divides values', () => {
  expect(calc.divide('1rem', '1rem')).toBe('calc(1rem / 1rem)')
})

test('calc negates a value', () => {
  expect(calc.negate('1rem')).toBe('calc(-1rem)')
})
