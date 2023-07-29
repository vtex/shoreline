import { declareConfig } from '../css-engine'

test('emppy configs are valid', () => {
  const result = declareConfig({})
  const expectation = {}

  expect(result).toStrictEqual(expectation)
})

test('filled configs are valid', () => {
  const result = declareConfig({
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
