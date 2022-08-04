import { negative } from '../style-resolvers'

describe('negative style-resolver', () => {
  it('should resolve arbitrary values', () => {
    const property = 'marginLeft'

    expect(negative('1px')(property)).toBe('-1px')
    expect(negative('1rem')(property)).toBe('-1rem')
    expect(negative('1ch')(property)).toBe('-1ch')
  })

  it('should resolve tokens', () => {
    expect(negative('$sm')('marginLeft')).toBe(
      'calc(-1 * var(--admin-ui-hspace-sm))'
    )
    expect(negative('$sm')('marginTop')).toBe(
      'calc(-1 * var(--admin-ui-vspace-sm))'
    )
    expect(negative('$1/2')('height')).toBe(
      'calc(-1 * var(--admin-ui-sizes-1_2))'
    )
  })
})
