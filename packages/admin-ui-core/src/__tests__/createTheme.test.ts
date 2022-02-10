import { createTheme, objectToVars, toCustomProperties } from '../createTheme'

describe('createTheme', () => {
  it('should return a array of objects', () => {
    expect(createTheme({})).toEqual({
      theme: {
        global: {},
      },
      cssVariables: {},
      rootStyleObject: {},
      rootStyleString: '',
    })
  })

  it('should be able to parse the whole theme', () => {
    const { theme, cssVariables } = createTheme(
      {
        colors: {
          primary: {
            default: 'red',
            hover: 'blue',
            pressed: 'green',
          },
        },
        space: [0, 1, 2, 3],
      },
      {
        enableModes: true,
      }
    )

    expect(theme).toEqual({
      global: {},
      colors: {
        primary: {
          default: 'var(--admin-ui-colors-primary-default)',
          hover: 'var(--admin-ui-colors-primary-hover)',
          pressed: 'var(--admin-ui-colors-primary-pressed)',
        },
      },
      space: [0, 1, 2, 3],
    })

    expect(cssVariables).toEqual({
      main: {
        '--admin-ui-colors-primary-default': 'red',
        '--admin-ui-colors-primary-hover': 'blue',
        '--admin-ui-colors-primary-pressed': 'green',
      },
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
      '--admin-ui-colors-primary-default': 'red',
      '--admin-ui-colors-primary-hover': 'blue',
      '--admin-ui-colors-primary-pressed': 'green',
      '--admin-ui-space-0': 0,
      '--admin-ui-space-1': 1,
      '--admin-ui-space-2': 2,
      '--admin-ui-space-3': 3,
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
      '--admin-ui-colors-primary-default-0': 'red',
      '--admin-ui-colors-primary-default-1': 'pink',
      '--admin-ui-colors-primary-default-2': 'teal',
      '--admin-ui-colors-primary-hover': 'blue',
      '--admin-ui-colors-primary-pressed': 'green',
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
            'var(--admin-ui-colors-primary-default-0)',
            'var(--admin-ui-colors-primary-default-1)',
            'var(--admin-ui-colors-primary-default-2)',
          ],
          hover: 'var(--admin-ui-colors-primary-hover)',
          pressed: 'var(--admin-ui-colors-primary-pressed)',
        },
      },
      space: [
        'var(--admin-ui-space-0)',
        'var(--admin-ui-space-1)',
        'var(--admin-ui-space-2)',
        'var(--admin-ui-space-3)',
      ],
    })
  })
})
