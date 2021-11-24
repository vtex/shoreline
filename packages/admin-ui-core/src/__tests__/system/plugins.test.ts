import { buildPlugins, createPlugin } from '../../system'

describe('plugins builder', () => {
  const theme = {
    colors: {
      primary: 'blue',
      secondary: 'pink',
    },
  }

  const colors = createPlugin({
    name: 'onda-plugin-colors',
    namespaces: ['colors'],
    rules: {
      color: 'colors',
      backgroundColor: 'colors',
    },
  })

  const space = createPlugin({
    name: 'onda-plugin-space',
    namespaces: ['space'],
    rules: {
      margin: 'space',
      padding: 'space',
    },
  })

  it('should be able to build a single plugin', () => {
    const pluginInstance = buildPlugins(theme, [colors])

    expect(typeof pluginInstance).toBe('object')
    expect(pluginInstance.rules.value).toEqual({
      color: 'colors',
      backgroundColor: 'colors',
    })
  })

  it('should be able to build multiple plugins', () => {
    const pluginInstance = buildPlugins(theme, [colors, space])

    expect(typeof pluginInstance).toBe('object')
    expect(pluginInstance.rules.value).toEqual({
      color: 'colors',
      backgroundColor: 'colors',
      margin: 'space',
      padding: 'space',
    })
  })

  it('should not build if plugins have conflicting namespaces', () => {
    const conflitantPlugin = createPlugin({
      name: 'onda-plugin-conflict',
      namespaces: ['space'],
      rules: {
        margin: 'space',
        padding: 'space',
      },
    })

    expect(() =>
      buildPlugins(theme, [space, colors, conflitantPlugin])
    ).toThrowError()
  })
})
