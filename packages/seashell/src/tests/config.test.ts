import { defineConfig } from '../config'

test('emppy configs are valid', () => {
  const result = defineConfig({})
  const expectation = {}

  expect(result).toStrictEqual(expectation)
})

test('filled configs are valid', () => {
  const result = defineConfig({
    prefix: 'sl',
    tokens: {
      radii: '8px',
    },
  })

  const expectation = {
    prefix: 'sl',
    tokens: {
      radii: '8px',
    },
  }

  expect(result).toStrictEqual(expectation)
})
