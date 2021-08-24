import { createPlugin, buildSplits } from '../../../system'

describe('splits builder', () => {
  const theme = {
    space: [0, 1, 2, 4],
    colors: {
      primary: 'blue',
    },
  }

  const plugin = createPlugin({
    name: 'onda-plugin-tst',
    namespaces: ['test'],
    splits: {
      size: ['height', 'width'],
    },
  })

  const instance = buildSplits(theme, [plugin])

  it('should not produce side effects on the theme', () => {
    expect(theme).toStrictEqual({
      space: [0, 1, 2, 4],
      colors: {
        primary: 'blue',
      },
    })
  })

  it('should be able to split rules', () => {
    expect(instance.exec('size', 100)).toEqual({
      height: 100,
      width: 100,
    })
  })
})
