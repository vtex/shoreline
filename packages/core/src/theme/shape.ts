export const blue = {
  blue05: 'hsla(222, 62%, 96%, 1)',
  blue10: 'hsla(222, 62%, 92%, 1)',
  blue20: 'hsla(222, 64%, 84%, 1)',
  blue30: 'hsla(222, 63%, 72%, 1)',
  blue40: 'hsla(222, 63%, 43%, 1)',
  blue50: 'hsla(222, 63%, 34%, 1)',
  blue60: 'hsla(222, 63%, 25%, 1)',
}

export const lightBlue = {
  lightBlue05: 'hsla(203, 62%, 96%, 1)',
  lightBlue10: 'hsla(206, 61%, 92%, 1)',
  lightBlue20: 'hsla(205, 63%, 84%, 1)',
  lightBlue30: 'hsla(206, 63%, 72%, 1)',
  lightBlue40: 'hsla(206, 63%, 44%, 1)',
  lightBlue50: 'hsla(206, 63%, 35%, 1)',
  lightBlue60: 'hsla(207, 64%, 22%, 1)',
}

export const red = {
  red05: 'hsla(0, 56%, 96%, 1)',
  red10: 'hsla(0, 60%, 93%, 1)',
  red20: 'hsla(0, 59%, 83%, 1)',
  red30: 'hsla(0, 59%, 73%, 1)',
  red40: 'hsla(0, 58%, 52%, 1)',
  red50: 'hsla(0, 58%, 37%, 1)',
  red60: 'hsla(0, 58%, 30%, 1)',
}

export const green = {
  green05: 'hsla(120, 39%, 95%, 1)',
  green10: 'hsla(123, 39%, 91%, 1)',
  green20: 'hsla(123, 41%, 77%, 1)',
  green30: 'hsla(122, 41%, 64%, 1)',
  green40: 'hsla(123, 41%, 37%, 1)',
  green50: 'hsla(123, 41%, 26%, 1)',
  green60: 'hsla(123, 41%, 19%, 1)',
}

export const orange = {
  orange05: 'hsla(30, 100%, 96%, 1)',
  orange10: 'hsla(30, 100%, 92%, 1)',
  orange20: 'hsla(30, 100%, 80%, 1)',
  orange30: 'hsla(30, 100%, 69%, 1)',
  orange40: 'hsla(30, 100%, 45%, 1)',
  orange50: 'hsla(30, 100%, 35%, 1)',
  orange60: 'hsla(29, 100%, 18%, 1)',
}

export const cyan = {
  cyan05: 'hsla(188, 71%, 96%, 1)',
  cyan10: 'hsla(188, 72%, 92%, 1)',
  cyan20: 'hsla(186, 70%, 79%, 1)',
  cyan30: 'hsla(187, 71%, 66%, 1)',
  cyan40: 'hsla(187, 71%, 41%, 1)',
  cyan50: 'hsla(187, 71%, 32%, 1)',
  cyan60: 'hsla(188, 78%, 16%, 1)',
}

export const purple = {
  purple05: 'hsla(266, 41%, 97%, 1)',
  purple10: 'hsla(265, 35%, 93%, 1)',
  purple20: 'hsla(268, 37%, 83%, 1)',
  purple30: 'hsla(268, 37%, 73%, 1)',
  purple40: 'hsla(268, 37%, 53%, 1)',
  purple50: 'hsla(268, 37%, 42%, 1)',
  purple60: 'hsla(268, 38%, 28%, 1)',
}

export const pink = {
  pink05: 'hsla(340, 79%, 96%, 1)',
  pink10: 'hsla(340, 83%, 93%, 1)',
  pink20: 'hsla(340, 82%, 82%, 1)',
  pink30: 'hsla(340, 82%, 71%, 1)',
  pink40: 'hsla(340, 82%, 50%, 1)',
  pink50: 'hsla(340, 82%, 39%, 1)',
  pink60: 'hsla(340, 82%, 29%, 1)',
}

export const teal = {
  teal05: 'hsla(177, 41%, 91%, 1)',
  teal10: 'hsla(175, 41%, 79%, 1)',
  teal20: 'hsla(174, 42%, 65%, 1)',
  teal30: 'hsla(174, 42%, 51%, 1)',
  teal40: 'hsla(173, 100%, 24%, 1)',
  teal50: 'hsla(173, 100%, 19%, 1)',
  teal60: 'hsla(173, 100%, 14%, 1)',
}

export const grey = {
  grey10: 'hsla(0, 0%, 98%, 1)',
  grey20: 'hsla(0, 0%, 93%, 1)',
  grey30: 'hsla(0, 0%, 87%, 1)',
  grey40: 'hsla(0, 0%, 73%, 1)',
  grey50: 'hsla(0, 0%, 45%, 1)',
  grey60: 'hsla(0, 0%, 29%, 1)',
  grey70: 'hsla(0, 0%, 20%, 1)',
  grey80: 'hsla(0, 0%, 7%, 1)',
}

/**
 * admin-ui solid colors
 */
export const colors = {
  white: '#FFFFFF',
  black: '#000000',
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
}

export const background = {
  base: colors.white,
  muted: colors.grey10,
  backdrop: 'hsla(0, 0%, 0%, 0.5)',
  popup: colors.black,

  // buttons
  action: {
    // Need to be checked
    disabled: colors.grey30,
    primary: colors.blue40,
    primaryHover: colors.blue50,
    primaryPressed: colors.blue60,
    secondary: colors.blue10,
    secondaryHover: colors.blue20,
    secondaryPressed: colors.blue30,
    tertiary: 'transparent',
    tertiaryHover: colors.blue05,
    tertiaryPressed: colors.blue10,
    danger: colors.red40,
    dangerHover: colors.red50,
    dangerPressed: colors.red60,
    dangerSecondary: colors.red10,
    dangerSecondaryHover: colors.red20,
    dangerSecondaryPressed: colors.red30,
    dangerTertiary: 'transparent',
    dangerTertiaryHover: colors.red05,
    dangerTertiaryPressed: colors.red10,
  },

  // should turn to notifications
  feedback: {
    warning: colors.orange10,
    success: colors.green10,
    info: colors.lightBlue10,
    danger: colors.red10,
  },

  // text-fields
  field: {
    disabled: colors.grey30,
    primary: 'inherit',
    primaryHover: 'inherit',
    primaryFocus: 'inherit',
    critical: 'inherit',
    criticalHover: 'inherit',
    criticalFocus: 'inherit',
  },

  // form-controls
  control: {
    // disabled state
    disabled: colors.grey30,

    // default stat
    primary: colors.white,
    primaryHover: colors.white,
    primaryPressed: colors.white,

    // checked state
    primaryChecked: colors.blue40,
    primaryCheckedHover: colors.blue50,
    primaryCheckedPressed: colors.blue60,

    // indeterminate state
    primaryIndeterminate: colors.blue10,
    primaryIndeterminateHover: colors.blue20,
    primaryIndeterminatePressed: colors.blue30,
  },
}

export const foreground = {
  base: colors.black,
  muted: colors.grey50,
  highlight: colors.lightBlue40,
  popup: colors.white,

  action: {
    primary: colors.white,
    secondary: colors.blue40,
    tertiary: colors.blue40,
    disabled: colors.grey50,
    danger: colors.white,
    dangerSecondary: colors.red40,
    dangerTertiary: colors.red40,
  },

  link: colors.blue40,
  linkHover: colors.blue50,
  linkVisited: colors.blue60,

  // Need to be checked
  feedback: {
    success: colors.green40,
    info: colors.lightBlue40,
    danger: colors.red40,
    warning: colors.orange40,
  },

  // form controls
  control: {
    disabled: colors.grey50,
    primary: colors.white,
    primaryChecked: colors.white,
    primaryIndeterminate: colors.blue50,
  },
}

export const borderColor = {
  base: colors.grey30,
  focus: colors.lightBlue20,

  // text-fields
  field: {
    primary: colors.grey40,
    primaryHover: colors.grey50,
    primaryFocus: colors.blue40,
    critical: colors.red40,
    criticalHover: colors.red50,
    criticalFocus: colors.red60,
  },

  // form-controls
  control: {
    disabled: colors.grey30,

    primary: colors.grey50,
    primaryHover: colors.grey60,
    primaryPressed: colors.grey70,

    primaryChecked: colors.blue40,
    primaryCheckedHover: colors.blue50,
    primaryCheckedPressed: colors.blue60,

    primaryIndeterminate: colors.blue40,
    primaryIndeterminateHover: colors.blue50,
    primaryIndeterminatePressed: colors.blue60,
  },

  // Need to be checked
  input: colors.grey50, // TODO Align w/ design
  inputHover: colors.grey70,
  inputFocus: colors.blue40,
  inputError: colors.red40, // TODO Align w/ design

  feedback: {
    success: colors.green30,
    info: colors.blue30,
    danger: colors.red30,
    warning: colors.orange30,
  },
}

export const themeShape = {
  colors,
  background,
  foreground,
  borderColor,
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
  shadows: {
    menu: '0rem 0rem 1rem 0rem rgba(0,0,0,0.10)',
    subtle: '0rem 0rem 1.5rem 0rem rgba(0,0,0,0.05)',
    focus: `0rem 0rem 0rem 0.125rem ${borderColor.focus}`,
    inputFocus: `0 0 0 1px  ${borderColor.inputFocus}`,
    inputFocusError: `0 0 0 1px  ${borderColor.feedback.danger}`,
  },
  borderRadius: {
    default: '4px',
    flat: '0px',
    pill: '100px',
    circle: '100%',
  },
}
