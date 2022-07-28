import { createTheme, generateVars } from '../createTheme'

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

  it('parses both theme keys and values to css variables', () => {
    const result = generateVars({
      colors: {
        red: 'red',
        blue: 'blue',
        green: 'green',
      },
      bg: {
        action: {
          main: {
            primary: 'red',
            primaryHover: 'blue',
            primaryPressed: 'green',
          },
        },
      },
      border: {
        primary: '1px solid blue',
      },
    })

    expect(result).toEqual({
      '--admin-ui-colors-red': 'red',
      '--admin-ui-colors-blue': 'blue',
      '--admin-ui-colors-green': 'green',
      '--admin-ui-border-primary': '1px solid var(--admin-ui-colors-blue)',
      '--admin-ui-bg-action-main-primary': 'var(--admin-ui-colors-red)',
      '--admin-ui-bg-action-main-primaryHover': 'var(--admin-ui-colors-blue)',
      '--admin-ui-bg-action-main-primaryPressed':
        'var(--admin-ui-colors-green)',
    })
  })

  it('parses to CSS Variables while maintaining arbitrary values', () => {
    const result = generateVars({
      colors: {
        red: 'red',
        blue: 'blue',
      },
      bg: {
        action: {
          main: {
            primary: 'red',
            primaryHover: 'blue',
            primaryPressed: 'yellow',
          },
        },
      },
    })

    expect(result).toEqual({
      '--admin-ui-colors-red': 'red',
      '--admin-ui-colors-blue': 'blue',
      '--admin-ui-bg-action-main-primary': 'var(--admin-ui-colors-red)',
      '--admin-ui-bg-action-main-primaryHover': 'var(--admin-ui-colors-blue)',
      '--admin-ui-bg-action-main-primaryPressed': 'yellow',
    })
  })
})
