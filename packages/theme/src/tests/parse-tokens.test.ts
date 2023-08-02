import { parseTokens } from '../parse-tokens'

test('should return an empty object if tokens are empty', () => {
  const result = parseTokens({
    tokens: {},
  })

  const expectation = {}

  expect(result).toStrictEqual(expectation)
})

test('should transform a single token without nesting', () => {
  const result = parseTokens({
    tokens: { blue: 'blue' },
  })

  const expectation = {
    '--sl-blue': 'blue',
  }

  expect(result).toStrictEqual(expectation)
})

test('should transform multiple tokens without nesting', () => {
  const result = parseTokens({
    tokens: {
      blue: 'blue',
      radii: '0.5rem',
    },
  })

  const expectation = {
    '--sl-blue': 'blue',
    '--sl-radii': '0.5rem',
  }

  expect(result).toStrictEqual(expectation)
})

test('should transform a single nested token', () => {
  const result = parseTokens({
    tokens: {
      color: {
        blue: {
          100: 'blue',
        },
      },
    },
  })

  const expectation = {
    '--sl-color-blue-100': 'blue',
  }

  expect(result).toStrictEqual(expectation)
})

test('should transform multiple nested tokens', () => {
  const result = parseTokens({
    tokens: {
      color: {
        blue: {
          100: 'blue',
          200: 'blue',
        },
        black: {
          100: 'black',
        },
      },
      bg: {
        primary: 'black',
        action: {
          tertiary: {
            hover: 'pink',
          },
        },
      },
    },
  })

  const expectation = {
    '--sl-color-blue-100': 'blue',
    '--sl-color-blue-200': 'blue',
    '--sl-color-black-100': 'black',
    '--sl-bg-primary': 'black',
    '--sl-bg-action-tertiary-hover': 'pink',
  }

  expect(result).toStrictEqual(expectation)
})

test('should transform default values', () => {
  const result = parseTokens({
    tokens: {
      bg: {
        secondary: {
          '*': 'blue',
          hover: 'black',
        },
      },
    },
  })

  const expectation = {
    '--sl-bg-secondary': 'blue',
    '--sl-bg-secondary-hover': 'black',
  }

  expect(result).toStrictEqual(expectation)
})

test('should transform aliases', () => {
  const result = parseTokens({
    tokens: {
      color: {
        blue: {
          100: 'blue',
          200: 'blue',
        },
        black: {
          100: 'black',
        },
      },
      bg: {
        primary: '$color-black-100',
        action: {
          tertiary: {
            hover: '$color-blue-200',
          },
        },
      },
    },
  })

  const expectation = {
    '--sl-color-blue-100': 'blue',
    '--sl-color-blue-200': 'blue',
    '--sl-color-black-100': 'black',
    '--sl-bg-primary': 'var(--sl-color-black-100)',
    '--sl-bg-action-tertiary-hover': 'var(--sl-color-blue-200)',
  }

  expect(result).toStrictEqual(expectation)
})

test('should transform aliases deeply', () => {
  const result = parseTokens({
    tokens: {
      color: {
        black: {
          100: 'black',
        },
      },
      bw: {
        1: '1px',
      },
      border: {
        1: '$bw-1 solid $color-black-100',
      },
    },
  })

  const expectation = {
    '--sl-color-black-100': 'black',
    '--sl-bw-1': '1px',
    '--sl-border-1': 'var(--sl-bw-1) solid var(--sl-color-black-100)',
  }

  expect(result).toStrictEqual(expectation)
})

test('should allow other prefixes', () => {
  const result = parseTokens({
    prefix: 'vtex',
    tokens: {
      color: {
        blue: 'blue',
      },
      bg: {
        primary: '$color-blue',
      },
    },
  })

  const expectation = {
    '--vtex-color-blue': 'blue',
    '--vtex-bg-primary': 'var(--vtex-color-blue)',
  }

  expect(result).toStrictEqual(expectation)
})

test('should allow unprefixed keys', () => {
  const result = parseTokens({
    prefix: 'vtex',
    unprefixed: true,
    tokens: {
      color: {
        blue: 'blue',
      },
      bg: {
        primary: '$color-blue',
      },
    },
  })

  const expectation = {
    'color-blue': 'blue',
    'bg-primary': 'var(--vtex-color-blue)',
  }

  expect(result).toStrictEqual(expectation)
})
