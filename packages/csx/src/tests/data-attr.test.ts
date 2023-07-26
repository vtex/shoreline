import { dataAttr } from '../index'

test('it should return a single data-attr', () => {
  expect(dataAttr('size', 'normal')).toBe('[data-size="normal"]')
  expect(dataAttr('has-icon', true)).toBe('[data-has-icon="true"]')
  expect(dataAttr('has-icon')).toBe('[data-has-icon]')
})

test('it should multiple dataAttrs', () => {
  expect(
    dataAttr({
      size: 'normal',
      variant: 'primary',
    })
  ).toBe('[data-size="normal"][data-variant="primary"]')
  expect(
    dataAttr({
      size: 'normal',
      'has-icon': true,
    })
  ).toBe('[data-size="normal"][data-has-icon="true"]')
})
