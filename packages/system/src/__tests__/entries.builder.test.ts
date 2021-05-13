import { buildEntries } from '../builders'
import { createPlugin } from '../plugin'

const theme = {
  colors: {
    primary: 'blue',
  },
  test: [0, 1, 2, 3, 4],
}

const plugin = createPlugin({
  name: 'onda-plugin-test',
  namespaces: ['test'],
  entries: (theme) => {
    const { test } = theme
    return {
      test: test.map((t: number) => t * 2),
    }
  },
})

const instance = buildEntries(theme, [plugin])

describe('entries.builder', () => {
  it('do not produce side effects to the theme entries', () => {
    instance.exec(theme)
    expect(theme).toStrictEqual({
      colors: {
        primary: 'blue',
      },
      test: [0, 1, 2, 3, 4],
    })
  })

  it('should be able to change its own namespace', () => {
    expect(instance.exec(theme)).toEqual({
      colors: {
        primary: 'blue',
      },
      test: [0, 2, 4, 6, 8],
    })
  })
})
