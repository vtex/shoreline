import { createTheme, objectToVars, toCustomProperties } from '../theme'

describe('theme', () => {
  it('should return a array of objects', () => {
    expect(createTheme({})).toEqual([
      {
        global: {},
      },
      {},
    ])
  })

  it('should be able to parse the whole theme', () => {
    const [theme, variables] = createTheme({
      colors: {
        primary: {
          default: 'red',
          hover: 'blue',
          pressed: 'green',
        },
      },
      space: [0, 1, 2, 3],
    })

    expect(theme).toEqual({
      global: {},
      colors: {
        primary: {
          default: 'var(--onda-colors-primary-default)',
          hover: 'var(--onda-colors-primary-hover)',
          pressed: 'var(--onda-colors-primary-pressed)',
        },
      },
      space: [
        'var(--onda-space-0)',
        'var(--onda-space-1)',
        'var(--onda-space-2)',
        'var(--onda-space-3)',
      ],
    })

    expect(variables).toEqual({
      '--onda-colors-primary-default': 'red',
      '--onda-colors-primary-hover': 'blue',
      '--onda-colors-primary-pressed': 'green',
      '--onda-space-0': 0,
      '--onda-space-1': 1,
      '--onda-space-2': 2,
      '--onda-space-3': 3,
    })
  })

  it('parses object keys to css variables', () => {
    const result = objectToVars({
      colors: {
        primary: {
          default: 'red',
          hover: 'blue',
          pressed: 'green',
        },
      },
      space: [0, 1, 2, 3],
    })

    expect(result).toEqual({
      '--onda-colors-primary-default': 'red',
      '--onda-colors-primary-hover': 'blue',
      '--onda-colors-primary-pressed': 'green',
      '--onda-space-0': 0,
      '--onda-space-1': 1,
      '--onda-space-2': 2,
      '--onda-space-3': 3,
    })
  })

  it('parses array values to css variables', () => {
    const result = objectToVars({
      colors: {
        primary: {
          default: ['red', 'pink', 'teal'],
          hover: 'blue',
          pressed: 'green',
        },
      },
    })

    expect(result).toEqual({
      '--onda-colors-primary-default-0': 'red',
      '--onda-colors-primary-default-1': 'pink',
      '--onda-colors-primary-default-2': 'teal',
      '--onda-colors-primary-hover': 'blue',
      '--onda-colors-primary-pressed': 'green',
    })
  })

  it('should be able to parse values', () => {
    const result = toCustomProperties({
      colors: {
        primary: {
          default: ['red', 'pink', 'teal'],
          hover: 'blue',
          pressed: 'green',
        },
      },
      space: [0, 1, 2, 3],
    })

    expect(result).toEqual({
      colors: {
        primary: {
          default: [
            'var(--onda-colors-primary-default-0)',
            'var(--onda-colors-primary-default-1)',
            'var(--onda-colors-primary-default-2)',
          ],
          hover: 'var(--onda-colors-primary-hover)',
          pressed: 'var(--onda-colors-primary-pressed)',
        },
      },
      space: [
        'var(--onda-space-0)',
        'var(--onda-space-1)',
        'var(--onda-space-2)',
        'var(--onda-space-3)',
      ],
    })
  })
})
