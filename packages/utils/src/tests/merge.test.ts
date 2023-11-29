import { merge } from '../merge'
import { describe, it, expect } from '@vtex/shoreline-test-utils'

describe('merge', () => {
  it('should merge objects', () => {
    const result = merge(
      {
        a: 'b',
      },
      {
        b: 'c',
      }
    )

    const expectation = {
      a: 'b',
      b: 'c',
    }

    expect(result).toStrictEqual(expectation)
  })

  it('should merge objects deeply', () => {
    const result = merge(
      {
        a: 'b',
        c: {
          f: 'g',
        },
      },
      {
        b: 'c',
        c: {
          a: 10,
        },
      }
    )

    const expectation = {
      a: 'b',
      c: {
        f: 'g',
        a: 10,
      },
      b: 'c',
    }

    expect(result).toStrictEqual(expectation)
  })
})
