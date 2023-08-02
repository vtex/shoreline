import { extendConfig } from '../extend-config'
import { presetBase } from '../presets/base'

test('an empty config remains empty', () => {
  const result = extendConfig({})

  const expectation = {}

  expect(result).toStrictEqual(expectation)
})

test('loads a preset', () => {
  const result = extendConfig({
    preset: 'base',
  })

  const expectation = presetBase

  expect(result).toStrictEqual(expectation)
})

test('overrrides a preset', () => {
  const result = extendConfig({
    preset: 'base',
    outdir: 'test',
  })

  const expectation = { ...presetBase, outdir: 'test' }

  expect(result).not.toStrictEqual(presetBase)
  expect(result).toStrictEqual(expectation)
})
