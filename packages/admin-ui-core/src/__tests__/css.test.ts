import { variant } from '../style/css'

describe('variant', () => {
  it('should merge two variants', () => {
    const button = variant({
      size: {
        regular: {
          padding: 2,
        },
        small: {
          padding: 3,
        },
      },
      variant: {
        primary: {
          color: 'blue',
        },
        secondary: {
          color: 'grey',
        },
      },
    })

    expect(button({ size: 'regular', variant: 'primary' })).toEqual({
      padding: 2,
      color: 'blue',
    })
  })
})
