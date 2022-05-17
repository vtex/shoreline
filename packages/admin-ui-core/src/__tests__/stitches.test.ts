import { generateStitchesTokens } from '../stitches'

describe('stitches', () => {
  describe('generate stitches theme tokens', () => {
    it('object without nesting', () => {
      const tokens = { primary: '', secondary: '', tertiary: '' }

      const expectedResult = {
        primary: '',
        secondary: '',
        tertiary: '',
      }

      expect(generateStitchesTokens(tokens)).toStrictEqual(expectedResult)
    })

    it('object with nesting', () => {
      const tokens = { form: { neutral: '', neutralHover: '' } }

      const expectedResult = {
        'form-neutral': '',
        'form-neutralHover': '',
      }

      expect(generateStitchesTokens(tokens)).toStrictEqual(expectedResult)
    })
  })

  it('object with many levels of nesting', () => {
    const tokens = {
      primary: '',
      form: {
        neutral: '',
      },
      action: {
        neutral: {
          tertiary: '',
        },
        main: {
          primary: '',
        },
      },
    }

    const expectedResult = {
      primary: '',
      'form-neutral': '',
      'action-neutral-tertiary': '',
      'action-main-primary': '',
    }

    expect(generateStitchesTokens(tokens)).toStrictEqual(expectedResult)
  })
})
