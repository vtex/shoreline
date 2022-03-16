import { isKebab, capitalize } from '../string'

describe('capitalize', () => {
  it('should capitalize a string', () => {
    expect(capitalize('')).toBe('')
    expect(capitalize('text')).toBe('Text')
  })

  it('should not cause side effects', () => {
    const value = 'text'
    const capitalized = capitalize(value)

    expect(value).toBe('text')
    expect(capitalized).toBe('Text')
  })
})

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
