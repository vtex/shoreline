import { genTokens } from '../gen-tokens'

test('should retrun an empty object if tokens are empty', () => {
  const result = genTokens({})

  const expected = {}

  expect(result).toStrictEqual(expected)
})

test('should transform a single token without nesting', () => {
  const result = genTokens({
    blue: 'blue',
  })

  const expected = {
    '--sl-blue': 'blue',
  }

  expect(result).toStrictEqual(expected)
})

test('should transform multiple tokens without nesting', () => {
  const result = genTokens({
    blue: 'blue',
    radii: '0.5rem',
  })

  const expected = {
    '--sl-blue': 'blue',
    '--sl-radii': '0.5rem',
  }

  expect(result).toStrictEqual(expected)
})

test('should transform a single nested token', () => {
  const result = genTokens({
    color: {
      blue: {
        100: 'blue',
      },
    },
  })

  const expected = {
    '--sl-color-blue-100': 'blue',
  }

  expect(result).toStrictEqual(expected)
})

test('should transform multiple nested tokens', () => {
  const result = genTokens({
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
  })

  const expected = {
    '--sl-color-blue-100': 'blue',
    '--sl-color-blue-200': 'blue',
    '--sl-color-black-100': 'black',
    '--sl-bg-primary': 'black',
    '--sl-bg-action-tertiary-hover': 'pink',
  }

  expect(result).toStrictEqual(expected)
})

test('should transform default values', () => {
  const result = genTokens({
    bg: {
      secondary: {
        '*': 'blue',
        hover: 'black',
      },
    },
  })

  const expected = {
    '--sl-bg-secondary': 'blue',
    '--sl-bg-secondary-hover': 'black',
  }

  expect(result).toStrictEqual(expected)
})

test('should transform aliases', () => {
  const result = genTokens({
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
  })

  const expected = {
    '--sl-color-blue-100': 'blue',
    '--sl-color-blue-200': 'blue',
    '--sl-color-black-100': 'black',
    '--sl-bg-primary': 'var(--sl-color-black-100)',
    '--sl-bg-action-tertiary-hover': 'var(--sl-color-blue-200)',
  }

  expect(result).toStrictEqual(expected)
})

test('should transform aliases deeply', () => {
  const result = genTokens({
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
  })

  const expected = {
    '--sl-color-black-100': 'black',
    '--sl-bw-1': '1px',
    '--sl-border-1': 'var(--sl-bw-1) solid var(--sl-color-black-100)',
  }

  expect(result).toStrictEqual(expected)
})
