import { merge } from '@vtex/admin-ui-util'
import {
  getCustomConfig,
  createTheme,
  generateVars,
  resolveGlobal,
} from '../createTheme'

import { theme as mockCustomTheme } from './mock/admin-ui.config'

describe('createTheme', () => {
  it('should return a array of objects', () => {
    expect(createTheme({})).toEqual({
      theme: {
        global: {},
      },
      cssVariables: {},
    })
  })

  it('should be able to load custom theme from admin-ui.config.js file', () => {
    const { theme: customTheme } = getCustomConfig(
      'packages/admin-ui-core/src/tests/mock/admin-ui.config.js'
    )

    expect(customTheme).toEqual(mockCustomTheme)
  })

  it('should be able to merge default and custom themes', () => {
    const { theme: customTheme } = getCustomConfig(
      'packages/admin-ui-core/src/tests/mock/admin-ui.config.js'
    )

    const initialTheme = {
      bg: {
        blue40: 'blue',
        blue10: 'blue',
        action: {
          main: {
            primary: 'blue',
            primaryPressed: 'blue',
          },
        },
        form: {
          controlChecked: 'blue',
        },
      },
    }

    const mergedTheme = merge(initialTheme, customTheme)

    expect(mergedTheme).toEqual({
      bg: {
        blue40: 'blue',
        blue10: 'red',
        action: {
          main: {
            primary: 'blue',
            primaryPressed: 'white',
          },
        },
        form: {
          controlChecked: 'blue',
        },
      },
      space: {
        1: '1rem',
        3: '3rem',
      },
    })
  })

  it('should be able to remove global styles from default theme', () => {
    const { theme: customTheme, disableGlobalStyles } = getCustomConfig(
      'packages/admin-ui-core/src/tests/mock/admin-ui.config.js'
    )

    const initialTheme = {
      global: {
        body: {
          display: 'block',
        },
      },
      bg: {
        blue40: 'blue',
        blue10: 'blue',
        action: {
          main: {
            primary: 'blue',
            primaryPressed: 'blue',
          },
        },
        form: {
          controlChecked: 'blue',
        },
      },
    }

    const updatedInitialTheme = resolveGlobal(initialTheme, disableGlobalStyles)

    const mergedTheme = merge(updatedInitialTheme, customTheme)

    expect(mergedTheme).toEqual({
      bg: {
        blue40: 'blue',
        blue10: 'red',
        action: {
          main: {
            primary: 'blue',
            primaryPressed: 'white',
          },
        },
        form: {
          controlChecked: 'blue',
        },
      },
      space: {
        1: '1rem',
        3: '3rem',
      },
    })
  })

  it('should be able to parse the whole theme', () => {
    const { theme, cssVariables } = createTheme({
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
          default: 'var(--admin-ui-colors-primary-default)',
          hover: 'var(--admin-ui-colors-primary-hover)',
          pressed: 'var(--admin-ui-colors-primary-pressed)',
        },
      },
      space: [0, 1, 2, 3],
    })

    expect(cssVariables).toEqual({
      '--admin-ui-colors-primary-default': 'red',
      '--admin-ui-colors-primary-hover': 'blue',
      '--admin-ui-colors-primary-pressed': 'green',
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
