import { styleVariants } from '../styleVariants'

describe('styleVariants', () => {
  it('should merge two variants', () => {
    const button = styleVariants({
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

  it('should allow boolean variants', () => {
    const button = styleVariants({
      bleedY: {
        true: {
          margin: '-1rem',
        },
      },
    })

    expect(button({ bleedY: true })).toEqual({
      margin: '-1rem',
    })
  })
})
