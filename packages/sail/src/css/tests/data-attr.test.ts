import { dataAttr } from '../data-attr'

describe('dataAttr', () => {
  it('should return a single data-attr', () => {
    expect(dataAttr('size', 'normal')).toBe('[data-size="normal"]')
    expect(dataAttr('has-icon', true)).toBe('[data-has-icon="true"]')
  })

  it('should multiple dataAttrs', () => {
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
})
