import { dataAttr, ariaAttr } from '../index'

describe('attr', () => {
  it('should return data attribute value from boolean', () => {
    const isActive = true

    expect(dataAttr(isActive)).toBe('')
  })

  it('should return aria attribute value from boolean', () => {
    const isDisabled = false

    expect(ariaAttr(isDisabled)).toBeUndefined()
  })
})
