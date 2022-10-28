import { negative } from '../style-resolvers'

describe('negative style-resolver', () => {
  it('should resolve arbitrary values', () => {
    const theme = {}
    const property = 'marginLeft'

    expect(negative('1px')(theme, property)).toBe('-1px')
    expect(negative('1rem')(theme, property)).toBe('-1rem')
    expect(negative('1ch')(theme, property)).toBe('-1ch')
  })

  it('should resolve tokens', () => {
    const theme = {
      space: {
        test: '1rem',
      },
    }

    const property = 'marginLeft'

    expect(negative('test')(theme, property)).toBe('-1rem')
    expect(negative('$test')(theme, property)).toBe('-1rem')
  })
})
