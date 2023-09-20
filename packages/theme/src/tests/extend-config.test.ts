import { extendConfig } from '../extend-config'

const presetBase = {
  preset: {
    outdir: './cwd',
  },
}

test('an empty config remains empty', () => {
  const result = extendConfig({})

  const expectation = {}

  expect(result).toStrictEqual(expectation)
})

test('loads a preset', () => {
  const result = extendConfig({
    preset: presetBase,
    tokens: {},
  })

  const expectation = {
    ...presetBase,
    tokens: {},
  }

  expect(result).toStrictEqual(expectation)
})

test('overrrides a preset', () => {
  const result = extendConfig({
    preset: presetBase,
    outdir: 'test',
  })

  const expectation = { ...presetBase, outdir: 'test' }

  expect(result).not.toStrictEqual(presetBase)
  expect(result).toStrictEqual(expectation)
})
