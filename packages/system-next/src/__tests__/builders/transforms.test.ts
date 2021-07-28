import { get } from '@vtex/onda-util'

import { buildTransforms } from '../../builders'
import { createPlugin } from '../../plugin'

describe('transforms builder', () => {
  const theme = {
    space: [0, 1, 2, 4],
    colors: {
      primary: 'blue',
    },
  }

  const plugin = createPlugin({
    name: 'onda-plugin-tst',
    namespaces: [],
    transforms: {
      margin: (rule, value) => Number(get(rule, value)) * 2,
    },
  })

  const instance = buildTransforms(theme, [plugin])

  it('should not produce side effects on the theme', () => {
    expect(theme).toStrictEqual({
      space: [0, 1, 2, 4],
      colors: {
        primary: 'blue',
      },
    })
  })

  it('should be able to change its own namespace', () => {
    const transform = instance('margin')

    expect(typeof transform.exec).toBe('function')
    expect(transform.exec([0, 1, 2, 4], 3)).toEqual(8)
  })
})
