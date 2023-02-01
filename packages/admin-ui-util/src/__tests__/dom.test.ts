import { htmlDataAttr, ariaAttr } from '../dom'

describe('attr', () => {
  it('should return data attribute value from boolean', () => {
    const isActive = true

    expect(htmlDataAttr(isActive)).toBe('')
  })

  it('should return aria attribute value from boolean', () => {
    const isDisabled = false

    expect(ariaAttr(isDisabled)).toBeUndefined()
  })
})
