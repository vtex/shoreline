import { createPlugin, buildRules } from '../../system'

describe('rules builder', () => {
  const theme = {
    colors: {
      primary: 'blue',
    },
    fonts: {
      sans: 'sans-serif',
      mono: 'monospace',
    },
  }

  const plugin = createPlugin({
    name: 'onda-plugin-tst',
    namespaces: ['colors', 'fonts'],
    rules: {
      color: 'colors',
      fontFamily: 'fonts',
    },
  })

  const instance = buildRules(theme, [plugin])

  it('should not produce side effects on the theme', () => {
    expect(theme).toStrictEqual({
      colors: {
        primary: 'blue',
      },
      fonts: {
        sans: 'sans-serif',
        mono: 'monospace',
      },
    })
  })

  it('should be able to choose rules', () => {
    expect(instance.exec('color')).toEqual({
      primary: 'blue',
    })
    expect(instance.exec('fontFamily')).toEqual({
      sans: 'sans-serif',
      mono: 'monospace',
    })
    expect(instance.exec('xpto')).toEqual({})
  })
})
