import { merge } from '@vtex/admin-ui-util'
import {
  getCustomConfig,
  createTheme,
  generateVars,
  parseToCss,
  resolveGlobal,
  generateCssObject,
} from '../createTheme'

import { theme as mockCustomTheme } from './mock/admin-ui.config'

describe('createTheme', () => {
  it('should return a array of objects', () => {
    expect(createTheme({})).toEqual({
      theme: {},
      cssVariables: {},
      rootStyleObject: {},
      rootStyleString: '',
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
    })
  })

  it('should be able to parse the whole theme', () => {
    const { cssVariables } = createTheme(
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

    expect(cssVariables).toEqual({
      main: {
        '--admin-ui-colors-primary-default': 'red',
        '--admin-ui-colors-primary-hover': 'blue',
        '--admin-ui-colors-primary-pressed': 'green',
        '--admin-ui-space-0': 0,
        '--admin-ui-space-1': 1,
        '--admin-ui-space-2': 2,
        '--admin-ui-space-3': 3,
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

  it('should be able to generate the theme css vars', () => {
    const result = generateCssObject({
      global: {
        body: {
          display: 'block',
          color: '$primary',
        },
        html: {
          text: '$body',
        },
        button: {
          bg: '$action.main.primary',
          color: '$action.main.primary',
          width: '$10/12',
        },
      },
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
      root: {
        '--admin-ui-colors-red': 'red',
        '--admin-ui-colors-blue': 'blue',
        '--admin-ui-bg-action-main-primary': 'var(--admin-ui-colors-red)',
        '--admin-ui-bg-action-main-primaryHover': 'var(--admin-ui-colors-blue)',
        '--admin-ui-bg-action-main-primaryPressed': 'yellow',
      },
      body: {
        display: 'block',
        color: 'var(--admin-ui-fg-primary)',
      },
      button: {
        background: 'var(--admin-ui-bg-action-main-primary)',
        color: 'var(--admin-ui-fg-action-main-primary)',
        width: 'var(--admin-ui-sizes-10_12)',
      },
      html: {
        fontFamily: 'var(--admin-ui-fonts-body)',
        fontSize: 'var(--admin-ui-fontSizes-body)',
        fontVariationSettings: 'var(--admin-ui-fontWeights-body)',
        letterSpacing: 'var(--admin-ui-letterSpacings-body)',
        lineHeight: 'var(--admin-ui-lineHeights-body)',
      },
    })
  })

  it('should be able to generate the global css file content', () => {
    const result = generateCssObject({
      global: {
        body: {
          display: 'block',
          color: '$primary',
        },
        html: {
          text: '$body',
        },
        button: {
          bg: '$action.main.primary',
          color: '$action.main.primary',
          width: '$10/12',
        },
      },
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

    const cssText = parseToCss(result)

    expect(cssText).toEqual(`:root {
\t--admin-ui-colors-red: red;
\t--admin-ui-colors-blue: blue;
\t--admin-ui-bg-action-main-primary: var(--admin-ui-colors-red);
\t--admin-ui-bg-action-main-primary-hover: var(--admin-ui-colors-blue);
\t--admin-ui-bg-action-main-primary-pressed: yellow;
}

body {
\tdisplay: block;
\tcolor: var(--admin-ui-fg-primary);
}

html {
\tfont-family: var(--admin-ui-fonts-body);
\tfont-variation-settings: var(--admin-ui-fontWeights-body);
\tfont-size: var(--admin-ui-fontSizes-body);
\tline-height: var(--admin-ui-lineHeights-body);
\tletter-spacing: var(--admin-ui-letterSpacings-body);
}

button {
\tbackground: var(--admin-ui-bg-action-main-primary);
\tcolor: var(--admin-ui-fg-action-main-primary);
\twidth: var(--admin-ui-sizes-10_12);
}

`)
  })
})
