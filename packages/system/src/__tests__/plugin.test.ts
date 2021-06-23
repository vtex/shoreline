import {
  createPlugin,
  getEntries,
  getSplits,
  getTransforms,
  getRules,
  getAliases,
  isValidPlugin,
} from '../plugin'

describe('plugin tests', () => {
  it('should be able to create a minimal plugin', () => {
    const plugin = createPlugin({
      name: 'onda-plugin-test',
      namespaces: [],
    })

    expect(isValidPlugin(plugin)).toBe(true)
  })

  it('should not be able to create a plugin with invalid name', () => {
    expect(() =>
      createPlugin({
        name: 'test',
        namespaces: [],
      })
    ).toThrowError()
    expect(() =>
      createPlugin({
        name: 'onda-plugin-test',
        namespaces: [],
      })
    ).toBeTruthy()
    expect(
      isValidPlugin(
        createPlugin({
          name: 'onda-plugin-test',
          namespaces: [],
        })
      )
    ).toBe(true)
  })

  it('should not be able to create a plugin with invalid namespaces/rules', () => {
    expect(() =>
      createPlugin({
        name: 'onda-plugin-test',
        namespaces: [],
        rules: {
          color: 'colors',
        },
      })
    ).toThrowError()
    expect(() =>
      createPlugin({
        name: 'onda-plugin-test',
        namespaces: ['colors'],
        rules: {
          color: 'colors',
        },
      })
    ).toBeTruthy()
    expect(
      isValidPlugin(
        createPlugin({
          name: 'onda-plugin-test',
          namespaces: ['colors'],
          rules: {
            color: 'colors',
          },
        })
      )
    ).toBe(true)
  })

  it('should be able to create a plugin to manage theme entries', () => {
    const plugin = createPlugin({
      name: 'onda-plugin-test',
      namespaces: ['test'],
      entries: ({ test }) => {
        return {
          test: test * 2,
        }
      },
    })

    expect(isValidPlugin(plugin)).toBe(true)
    expect(typeof getEntries(plugin)).toBe('function')
    expect(
      (getEntries(plugin) as Function)({
        test: 2,
        otherProp: null,
      })
    ).toEqual({
      test: 4,
    })
  })

  it('should be able to create a plugin to manage aliases', () => {
    const plugin = createPlugin({
      name: 'onda-plugin-test',
      namespaces: [],
      aliases: {
        c: 'color',
        bg: 'backgroundColor',
        fvs: 'fontVariationSettings',
      },
    })

    expect(isValidPlugin(plugin)).toBe(true)
    expect(typeof getAliases(plugin)).toBe('object')
    expect(getAliases(plugin)).toEqual({
      c: 'color',
      bg: 'backgroundColor',
      fvs: 'fontVariationSettings',
    })
  })

  it('should be able to create a plugin to manage theme rules', () => {
    const plugin = createPlugin({
      name: 'onda-plugin-test',
      namespaces: ['colors', 'fonts'],
      rules: {
        color: 'colors',
        fontFamily: 'fonts',
      },
    })

    expect(isValidPlugin(plugin)).toBe(true)
    expect(typeof getRules(plugin)).toBe('object')
    expect(getRules(plugin)).toEqual({
      color: 'colors',
      fontFamily: 'fonts',
    })
  })

  it('should be able to create a plugin to transform styles', () => {
    const plugin = createPlugin({
      name: 'onda-plugin-test',
      namespaces: [],
      transforms: {
        margin: (_, value) => value * 2,
      },
    })

    expect(isValidPlugin(plugin)).toBe(true)
    expect(typeof getTransforms(plugin)).toBe('object')
    expect((getTransforms(plugin) as any)['margin']({}, 2)).toEqual(4)
  })

  it('should be able to create a plugin to split rules', () => {
    const plugin = createPlugin({
      name: 'onda-plugin-test',
      namespaces: ['colors', 'fonts'],
      splits: {
        marginX: ['marginLeft', 'marginRight'],
      },
    })

    expect(isValidPlugin(plugin)).toBe(true)
    expect(typeof getSplits(plugin)).toBe('object')
    expect(getSplits(plugin)).toEqual({
      marginX: ['marginLeft', 'marginRight'],
    })
  })
})
