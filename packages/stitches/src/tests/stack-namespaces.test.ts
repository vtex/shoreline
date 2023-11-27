import { stackNamespaces } from '../stack-namespaces'
import { test, expect } from 'vitest'

test('should return an empty object', () => {
  const result = stackNamespaces({})
  const expectation = {}

  expect(result).toStrictEqual(expectation)
})

test('should stack namespaces', () => {
  const result = stackNamespaces({
    background: 'white',
    '@layer': {
      'sl-tokens': {
        '--sl-color-blue-100': 'blue',
      },
      'sl-base': {
        body: {
          margin: 0,
        },
      },
    },
    '@media': {
      '(prefers-color-scheme: dark)': {
        background: 'black',
      },
    },
  })

  const expectation = {
    background: 'white',
    '@layer sl-tokens': {
      '--sl-color-blue-100': 'blue',
    },
    '@layer sl-base': {
      body: {
        margin: 0,
      },
    },
    '@media (prefers-color-scheme: dark)': {
      background: 'black',
    },
  }

  expect(result).toStrictEqual(expectation)
})
