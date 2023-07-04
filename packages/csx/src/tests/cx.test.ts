import { cx } from '../cx'

test('cx should handle null values', () => {
  expect(cx(null)).toEqual('')
  expect(cx(null, 'class')).toEqual('class')
  expect(cx('class', null)).toEqual('class')
  expect(cx('class1', 'class2', null)).toEqual('class1 class2')
  expect(cx('class1', 'null', null, 'class2')).toEqual('class1 null class2')
})

test('cx should handle undefined values', () => {
  expect(cx(undefined)).toEqual('')
  expect(cx(undefined, 'class')).toEqual('class')
  expect(cx('class', undefined)).toEqual('class')
  expect(cx('class1', 'class2', undefined)).toEqual('class1 class2')
  expect(cx('class1', 'undefined', undefined, 'class2')).toEqual(
    'class1 undefined class2'
  )
})

test('cx spaces classNames correctly', () => {
  expect(cx('a', 'b', 'c')).toEqual('a b c')
})

test('cx trims unnecessary spacing', () => {
  expect(cx('  a', '  b  ', 'c  ')).toEqual('a b c')
})
