import { isKebab } from '../isKebab'

describe('isKebab', () => {
  it('should be true if is kebab case', () => {
    expect(isKebab('kebab')).toBe(true)
    expect(isKebab('kebab-case')).toBe(true)
  })
  it('should be false if is not kebab case', () => {
    expect(isKebab('kebabCase')).toBe(false)
    expect(isKebab('-kebab-case')).toBe(false)
    expect(isKebab('kebab--case')).toBe(false)
    expect(isKebab('kebaB-cASE')).toBe(false)
  })
})
