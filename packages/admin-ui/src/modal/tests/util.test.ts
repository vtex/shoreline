import { variant } from '../util'

describe('modal util - variant', () => {
  it('should return the correct object', () => {
    const result = variant('variant', 'value', {
      padding: '1px',
    })

    expect(result).toStrictEqual({
      '[data-variant="value"]': {
        padding: '1px',
      },
    })
  })
})
