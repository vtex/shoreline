import {
  solid,
  blue,
  red,
  lightBlue,
  orange,
  cyan,
  pink,
  grey,
  green,
  teal,
  purple,
  greyTransparent,
} from './palettes'
import { ring } from './styleKit'

/**
 * admin-ui solid colors
 */
export const colors = {
  ...solid,
  ...blue,
  ...red,
  ...lightBlue,
  ...orange,
  ...cyan,
  ...pink,
  ...grey,
  ...green,
  ...teal,
  ...purple,
  ...greyTransparent,
}

export const background = {
  base: colors.white,
  muted: colors.grey10,
  popup: colors.black,
  popover: colors.white,
  modal: colors.white,
  overlay: colors.greyTransparent80,
  container: colors.white,
  header: colors.white,
  sidebar: colors.grey10,
  topbar: colors.white,

  action: {
    neutral: {
      ghost: 'transparent',
      ghostHover: colors.greyTransparent05,
      ghostPressed: colors.greyTransparent10,
      ghostDisabled: 'transparent',
    },

    main: {
      solid: colors.blue40,
      solidHover: colors.blue50,
      solidPressed: colors.blue60,
      solidDisabled: colors.grey30,

      soft: colors.blue10,
      softHover: colors.blue20,
      softPressed: colors.blue30,
      softDisabled: colors.grey30,

      text: 'transparent',
      textHover: colors.blue05,
      textPressed: colors.blue10,
      textDisabled: colors.grey30,
    },

    critical: {
      solid: colors.red40,
      solidHover: colors.red50,
      solidPressed: colors.red60,
      solidDisabled: colors.grey30,

      soft: colors.red10,
      softHover: colors.red20,
      softPressed: colors.red30,
      softDisabled: colors.grey30,

      text: 'transparent',
      textHover: colors.red05,
      textPressed: colors.red10,
      textDisabled: colors.grey30,
    },
  },

  listBoxItem: {
    main: colors.white,
    mainHover: colors.blue05,
    mainPressed: colors.blue05,
    mainSelected: colors.blue05,

    critical: colors.white,
    criticalHover: colors.red05,
    criticalPressed: colors.red05,
    criticalSelected: colors.red05,
  },

  notification: {
    warning: colors.orange10,
    positive: colors.green10,
    info: colors.lightBlue10,
    critical: colors.red10,
  },

  field: {
    neutral: 'inherit',
    neutralHover: 'inherit',
    neutralFocus: 'inherit',
    neutralDisabled: colors.grey30,

    critical: 'inherit',
    criticalHover: 'inherit',
    criticalFocus: 'inherit',
    criticalDisabled: colors.grey30,
  },

  control: {
    neutral: colors.white,
    neutralHover: colors.white,
    neutralPressed: colors.white,
    neutralDisabled: colors.grey30,

    neutralChecked: colors.grey80,
    neutralCheckedHover: colors.grey70,
    neutralCheckedPressed: colors.grey60,
    neutralCheckedDisabled: colors.grey30,

    neutralIndeterminate: colors.grey20,
    neutralIndeterminateHover: colors.grey30,
    neutralIndeterminatePressed: colors.grey40,
    neutralIndeterminateDisabled: colors.grey30,
  },
}

export const foreground = {
  base: colors.black,
  muted: colors.grey50,
  highlight: colors.lightBlue40,
  popup: colors.white,
  popover: colors.black,
  modal: colors.black,
  container: colors.black,
  header: colors.black,
  sidebar: colors.black,
  topbar: colors.black,

  action: {
    neutral: {
      ghost: colors.black,
      ghostDisabled: colors.grey50,
    },
    main: {
      solid: colors.white,
      solidDisabled: colors.grey50,
      soft: colors.blue40,
      softDisabled: colors.grey50,
      text: colors.blue40,
      textDisabled: colors.grey50,
    },
    critical: {
      solid: colors.white,
      solidDisabled: colors.grey50,
      soft: colors.red40,
      softDisabled: colors.grey50,
      text: colors.red40,
      textDisabled: colors.grey50,
    },
  },

  listBoxItem: {
    main: colors.black,
    mainHover: colors.blue40,
    mainPressed: colors.blue40,
    mainSelected: colors.blue40,

    critical: colors.black,
    criticalHover: colors.red40,
    criticalPressed: colors.red40,
    criticalSelected: colors.red40,
  },

  link: colors.blue40,
  linkHover: colors.blue50,
  linkVisited: colors.blue60,

  notification: {
    positive: colors.green40,
    info: colors.lightBlue40,
    critical: colors.red40,
    warning: colors.orange40,
  },

  control: {
    neutral: colors.white,
    neutralDisabled: colors.grey50,

    neutralChecked: colors.white,
    neutralCheckedDisabled: colors.grey50,

    neutralIndeterminate: colors.grey80,
    neutralIndeterminateDisabled: colors.grey50,
  },
}

export const borderColor = {
  base: colors.grey30,
  popover: colors.grey30,
  modal: colors.grey30,
  container: colors.grey30,
  header: colors.grey30,
  sidebar: colors.grey30,
  topbar: colors.grey30,

  field: {
    neutral: colors.grey40,
    neutralHover: colors.grey50,
    neutralFocus: colors.grey70,
    neutralDisabled: colors.grey30,

    critical: colors.red40,
    criticalHover: colors.red50,
    criticalFocus: colors.red60,
    criticalDisabled: colors.grey30,
  },

  control: {
    neutral: colors.grey50,
    neutralHover: colors.grey60,
    neutralPressed: colors.grey70,
    neutralDisabled: colors.grey30,

    neutralChecked: colors.grey80,
    neutralCheckedHover: colors.grey70,
    neutralCheckedPressed: colors.grey60,
    neutralCheckedDisabled: colors.grey30,

    neutralIndeterminate: colors.grey40,
    neutralIndeterminateHover: colors.grey50,
    neutralIndeterminatePressed: colors.grey60,
    neutralIndeterminateDisabled: colors.grey30,
  },

  notification: {
    positive: colors.green30,
    info: colors.blue30,
    critical: colors.red30,
    warning: colors.orange30,
  },
}

const shadows = {
  ring: {
    critical: ring('critical'),
    warning: ring('warning'),
    positive: ring('positive'),
    neutral: ring('neutral'),
    info: ring('info'),
    main: ring('main'),
  },

  menu: '0rem 0rem 1rem 0rem rgba(0,0,0,0.10)',
  subtle: '0rem 0rem 1.5rem 0rem rgba(0,0,0,0.05)',
}

export const themeShape = {
  colors,
  background,
  foreground,
  borderColor,
  shadows,
  global: {
    '@font-face': {
      fontFamily: 'VTEX Trust',
      fontDisplay: 'swap',
      fontStyle: 'normal',
      src: "url('https://io.vtex.com.br/fonts/vtex-trust/VTEXTrust-VF.woff2')",
      unicodeRange: `U+0020-007E, U+00A0-0107, U+010A-0113, U+0116-011B,
              U+011E-0123, U+0126-0127, U+012A-012B, U+012E-0131, U+0136-0137,
              U+0139-0148, U+014A-014D, U+0150-015B, U+015E-0167, U+016A-016B,
              U+016E-017E, U+0192, U+01EA-01EB, U+0218-021B, U+0237, U+02C6-02C7,
              U+02D8-02DD, U+0300-0304, U+0306-0308, U+030A-030C, U+0312,
              U+0326-0328, U+0335, U+0337-0338, U+0394, U+03A9, U+03BC, U+03C0,
              U+0E3F, U+1E80-1E85, U+1E9E, U+1EF2-1EF3, U+2000-200B, U+2013-2014,
              U+2018-201A, U+201C-201E, U+2020-2022, U+2026, U+202F-2030,
              U+2032-2033, U+2039-203A, U+2044, U+205F, U+2070, U+2074-2079,
              U+2080-2089, U+20A1, U+20A4, U+20A9-20AE, U+20B1, U+20B4, U+20B8-20BA,
              U+20BF, U+2117, U+2122, U+215D, U+2202, U+220F, U+2211-2212, U+221A,
              U+221E, U+222B, U+2248, U+2260, U+2264-2265, U+25CA, U+FB01-FB02`,
    },
    body: {
      margin: 0,
      bg: 'base',
      color: 'base',
      lineHeight: 1,
    },
    'html, body': {
      fontFamily: 'sans',
      fontSettings: 'regular',
    },
    'strong, b': {
      fontFamily: 'sans',
      fontSettings: 'bold',
    },
    'pre, code': { fontFamily: 'mono' },
    '*': {
      fontFamily: 'sans',
      fontSettings: 'regular',
      fontWeight: 'normal',
    },
    '*, ::before, ::after': {
      boxSizing: 'border-box',
      borderWidth: 0,
      borderStyle: 'solid',
    },
    'html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, a, abbr, acronym, address, big, cite, del, dfn, em, img, ins, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video':
      {
        margin: 0,
        padding: 0,
        border: 0,
        verticalAlign: 'baseline',
      },
    'article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section':
      {
        display: 'block',
      },
    'blockquote, q': { quotes: 'none' },
    'blockquote:before, blockquote:after, q:before, q:after': {
      content: ["''", 'none'],
    },
    table: { borderCollapse: 'collapse', borderSpacing: 0 },
  },
  sizes: {
    sm: '20rem',
    md: '48rem',
    lg: '56rem',
    xl: '64rem',
    '1/2': '50%',
    '1/4': '25%',
    '2/4': '50%',
    '3/4': '75%',
    '1/8': '12.5%',
    '2/8': '25%',
    '3/8': '37.5%',
    '4/8': '50%',
    '5/8': '62.5%',
    '6/8': '75%',
    '7/8': '87.5%',
    '1/12': '8.333333%',
    '2/12': '16.666667%',
    '3/12': '25%',
    '4/12': '33.333333%',
    '5/12': '41.666667%',
    '6/12': '50%',
    '7/12': '58.333333%',
    '8/12': '66.666667%',
    '9/12': '75%',
    '10/12': '83.333333%',
    '11/12': '91.666667%',
    full: '100%',
    screenHeight: '100vh',
    screenWidth: '100vw',
  },
  space: {
    0: '0rem',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    px: '0.0625rem',
    '2px': '0.125rem',
  },
  breakpoints: ['40em', '48em', '64em', '75em'],
  transitions: {
    snap: 'all 70ms cubic-bezier(0.2, 0.2, 0.38, 0.9)',
    fade: 'all 110ms cubic-bezier(0.2, 0.2, 0.38, 0.9)',
    pop: 'all 150ms cubic-bezier(0.4, 0.14, 0.3, 1)',
    callout: 'all 240ms cubic-bezier(0.4, 0.14, 0.3, 1)',
  },
  fonts: {
    sans: '"VTEX Trust", -apple-system, system-ui, BlinkMacSystemFont, sans-serif',
    mono: '"MonoLisa", "Operator Mono", "Fira Code Retina", "Fira Code", "FiraCode-Retina", "Dank Mono", "Consolas", "Monaco", "Menlo", monospace',
  },
  fontSizes: {
    '0': '0.75rem',
    '1': '0.875rem',
    '2': '1rem',
    '3': '1.125rem',
    '4': '1.25rem',
  },
  text: {
    code: {
      fontFamily: 'mono',
      lineHeight: 'code',
      fontSize: 1,
      fontFeatureSettings: "'clig' 0, 'calt' 0",
      fontVariantLigatures: 'normal',
    },
    small: {
      fontFamily: 'sans',
      lineHeight: 'small',
      fontSettings: 'regular',
      fontSize: 0,
    },
    body: {
      fontFamily: 'sans',
      lineHeight: 'body',
      fontSettings: 'regular',
      fontSize: 1,
    },
    highlight: {
      fontFamily: 'sans',
      lineHeight: 'highlight',
      fontSettings: 'regular',
      fontSize: 1,
    },
    action: {
      fontFamily: 'sans',
      lineHeight: 'action',
      fontSettings: 'regular',
      fontSize: 1,
      textTransform: 'uppercase',
    },
    subtitle: {
      fontFamily: 'sans',
      lineHeight: 'subtitle',
      fontSettings: 'regular',
      fontSize: 2,
    },
    headline: {
      fontFamily: 'sans',
      lineHeight: 'headline',
      fontSettings: 'regular',
      fontSize: 4,
    },
  },
  border: {
    default: {
      borderWidth: '1px',
      borderStyle: 'solid',
      borderRadius: 'default',
      borderColor: 'base',
    },
    'divider-bottom': {
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderColor: 'base',
    },
    'divider-top': {
      borderTopWidth: '1px',
      borderTopStyle: 'solid',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderColor: 'base',
    },
  },
  zIndices: {
    under: -1,
    plain: 0,
    over: 999,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    topbar: 9999,
    sidebarDisclosure: 999,
    sidebarOverlay: 99,
    sidebarUl: -999,
  },
  fontSettings: {
    hairline: "'WGHT' 100",
    thin: "'WGHT' 250",
    light: "'WGHT' 375",
    regular: "'WGHT' 500",
    medium: "'WGHT' 650",
    bold: "'WGHT' 875",
    black: "'WGHT' 1000",
  },
  lineHeights: {
    code: 1,
    small: 1.125,
    body: 1.25,
    highlight: 1.25,
    action: 1.5,
    subtitle: 1.5,
    headline: 1.5,
  },
  borderRadius: {
    default: '4px',
    flat: '0px',
    pill: '100px',
    circle: '100%',
  },
}
