import { jsx } from '../jsx'
import { getStylesheet, getOptions } from '../util'

describe('utils', () => {
  it('getStylesheet', () => {
    const stylesheet = {
      size: 10,
      variants: {
        theme: {
          primary: {
            bg: 'blue',
          },
          secondary: {
            bg: 'purple',
          },
        },
      },
    }

    const Div = jsx('div')(stylesheet)
    const Compound = jsx(Div)({
      padding: 2,
    })

    expect(getStylesheet(Div)).toEqual(stylesheet)
    expect(getStylesheet(Compound)).toEqual({
      ...stylesheet,
      padding: 2,
    })
  })

  it('getOptions', () => {
    const Div = jsx('div')({}, { options: ['a', 'b'] })
    const Compound = jsx(Div)({}, { options: ['c'] })

    expect(getOptions(Div)).toEqual(['a', 'b'])
    expect(getOptions(Compound)).toEqual(['a', 'b', 'c'])
  })
})
