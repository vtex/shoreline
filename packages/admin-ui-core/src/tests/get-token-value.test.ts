import { getTokenValue } from '../styles'

import { theme as mockTheme } from './mock/admin-ui.config'

describe('getTokenValue', () => {
  it('should handle custom values', () => {
    let result = getTokenValue(mockTheme, 'padding', '2rem')

    expect(result).toStrictEqual('2rem')

    result = getTokenValue(mockTheme, 'gap', '2rem')
    expect(result).toStrictEqual('2rem')
  })
  it('should handle token values', () => {
    const result = getTokenValue(mockTheme, 'padding', '$1')

    expect(result).toStrictEqual('1rem')
  })
  it('should handle compound tokens', () => {
    const cases = [
      '$1 $1 $1 $1',
      '$1 $1 2rem $1',
      '$1 $1 $1',
      '$1 2rem $1',
      '$1 2rem',
      '2rem $1',
      '2rem 2rem',
    ]

    const result = cases.map((testCase) =>
      getTokenValue(mockTheme, 'padding', testCase)
    )

    const expected = [
      '1rem 1rem 1rem 1rem',
      '1rem 1rem 2rem 1rem',
      '1rem 1rem 1rem',
      '1rem 2rem 1rem',
      '1rem 2rem',
      '2rem 1rem',
      '2rem 2rem',
    ]

    expect(result).toStrictEqual(expected)
  })
})
