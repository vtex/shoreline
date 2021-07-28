import { buildCompiler, buildInstance, createRuntime } from '../../index'

describe('compiler builder', () => {
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

  it('should be able to build compiler', () => {
    const instance = buildInstance(
      {
        name: 'test-instance',
      },
      runtime
    )
    const result = buildCompiler(instance, runtime)

    expect(
      result.exec({
        backgroundColor: 'blue',
        color: 'white',
      })
    ).toEqual('blue-white')
    expect(
      result.exec({
        backgroundColor: 'pink',
        color: 'black',
      })
    ).toEqual('pink-black')
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
