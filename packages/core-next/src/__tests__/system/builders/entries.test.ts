import { createPlugin, buildEntries } from '../../../system'

describe('entries builder', () => {
  const theme = {
    colors: {
      primary: 'blue',
    },
    test: [0, 1, 2, 3, 4],
  }

  const plugin = createPlugin({
    name: 'onda-plugin-tst',
    namespaces: ['test'],
    entries: (theme) => {
      const { test } = theme

      return {
        test: test.map((t: number) => t * 2),
      }
    },
  })

  const instance = buildEntries(theme, [plugin])

  it('should not produce side effects on the theme', () => {
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
