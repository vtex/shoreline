import { buildParser, buildPlugins } from '../../builders'
import { createPlugin } from '../../plugin'
import { createRuntime } from '../../runtime'

describe('parser builder', () => {
  const plugins = buildPlugins(
    {
      colors: {
        primary: 'blue',
        onPrimary: 'white',
        secondary: 'pink',
        onSecondary: 'black',
      },
    },
    [
      createPlugin({
        name: 'onda-plugin-colors',
        namespaces: ['colors'],
        rules: {
          color: 'colors',
          backgroundColor: 'colors',
        },
        aliases: {
          c: 'color',
          bg: 'backgroundColor',
        },
      }),
    ]
  )

  const runtime = createRuntime({
    name: 'onda-runtime-tst',
    instance: (params: InstanceParams) => {
      return params
    },
    parser: (steps) => (csx: Csx = {}) => {
      const style: Style = {}

      for (const key in csx) {
        const cssProperty = steps.aliases.exec(key)
        const token = csx[key as keyof typeof csx]

        const rule = steps.rules.exec(cssProperty)
        const transform = steps.transforms(cssProperty)
        const value = transform.exec(rule, token)

        style[cssProperty] = value
      }

      return style
    },
    compiler: () => (style: Style) =>
      `${style?.backgroundColor}-${style?.color}`,
  })

  it('should be able to build parser', () => {
    const result = buildParser(plugins, runtime)

    expect(
      result.exec({
        bg: 'primary',
        c: 'onPrimary',
      })
    ).toEqual({
      backgroundColor: 'blue',
      color: 'white',
    })
    expect(
      result.exec({
        bg: 'secondary',
        c: 'onSecondary',
      })
    ).toEqual({
      backgroundColor: 'pink',
      color: 'black',
    })
  })
})

interface Csx {
  bg?: string
  c?: string
}

interface Style {
  backgroundColor?: string
  color?: string
  [key: string]: any
}

interface InstanceParams {
  name: string
}
