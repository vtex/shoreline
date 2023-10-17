import { flattenObject } from '../flatten-object'

describe('flattenObject', () => {
  it('should flat an object', () => {
    const result = flattenObject({
      a: {
        b: {
          c: {
            d: 'value',
          },
        },
      },
    })

    const expectation = {
      'a-b-c-d': 'value',
    }

    expect(result).toStrictEqual(expectation)
  })

  it('should handle default values', () => {
    const result = flattenObject({
      a: {
        b: {
          '*': 'value-1',
          c: {
            d: 'value-2',
          },
        },
      },
    })

    const expectation = {
      'a-b': 'value-1',
      'a-b-c-d': 'value-2',
    }

    expect(result).toStrictEqual(expectation)
  })

  it('should be able to change the default value key and join string', () => {
    const result = flattenObject(
      {
        a: {
          b: {
            default: 'value-1',
            c: {
              d: 'value-2',
            },
          },
        },
      },
      '&',
      'default'
    )

    const expectation = {
      'a&b': 'value-1',
      'a&b&c&d': 'value-2',
    }

    expect(result).toStrictEqual(expectation)
  })
})
