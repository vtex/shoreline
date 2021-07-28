import { capitalize } from '../index'

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
