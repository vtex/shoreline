import { colors } from './colors'
import { typography } from './typography'
import { ring, border } from './styleKit'

const lightTheme = {
  bg: {
    primary: colors.white,
    secondary: colors.gray05,
    disabled: colors.gray20,
    positive: colors.green10,
    critical: colors.red10,
    warning: colors.orange10,
    info: colors.lightBlue10,
    inverted: colors.black,
    overlay: colors.grayTransparent50,
    skeleton: `linear-gradient(90deg, ${colors.gray20}, ${colors.gray10}), ${colors.gray20}`,
    action: {
      neutral: {
        tertiary: 'transparent',
        tertiaryHover: colors.grayTransparent05,
        tertiaryPressed: colors.grayTransparent10,
      },
      main: {
        primary: colors.blue40,
        primaryHover: colors.blue50,
        primaryPressed: colors.blue60,

        secondary: colors.blue10,
        secondaryHover: colors.blue20,
        secondaryPressed: colors.blue30,

        tertiary: 'transparent',
        tertiaryHover: colors.blue05,
        tertiaryPressed: colors.blue10,
        tertiarySelected: colors.blue05,
      },
      critical: {
        primary: colors.red40,
        primaryHover: colors.red50,
        primaryPressed: colors.red60,

        secondary: colors.red10,
        secondaryHover: colors.red20,
        secondaryPressed: colors.red30,

        tertiary: 'transparent',
        tertiaryHover: colors.red05,
        tertiaryPressed: colors.red10,
        tertiarySelected: colors.red05,
      },
    },

    form: {
      neutral: 'transparent',
      neutralHover: colors.gray10,
      neutralPressed: colors.gray30,
      neutralChecked: colors.black,
      neutralCheckedHover: colors.gray60,
      neutralCheckedPressed: colors.gray50,
      neutralInactive: colors.gray30,
      neutralInactiveHover: colors.gray40,
      neutralInactivePressed: colors.gray50,
      neutralActive: colors.black,
      neutralActiveHover: colors.gray60,
      neutralActivePressed: colors.gray50,
    },
  },
  fg: {
    primary: colors.black,
    secondary: colors.gray40,
    disabled: colors.gray40,
    inverted: colors.white,
    positive: colors.green40,
    info: colors.lightBlue40,
    critical: colors.red40,
    warning: colors.orange40,

    action: {
      neutral: {
        tertiary: colors.black,
        tertiaryHover: colors.black,
        tertiaryPressed: colors.black,
      },
      main: {
        primary: colors.white,
        primaryHover: colors.white,
        primaryPressed: colors.white,

        secondary: colors.blue50,
        secondaryHover: colors.blue50,
        secondaryPressed: colors.blue50,

        tertiary: colors.blue40,
        tertiaryHover: colors.blue40,
        tertiaryPressed: colors.blue40,
        tertiarySelected: colors.blue40,
      },
      critical: {
        primary: colors.white,
        primaryHover: colors.white,
        primaryPressed: colors.white,

        secondary: colors.red50,
        secondaryHover: colors.red50,
        secondaryPressed: colors.red50,

        tertiary: colors.red40,
        tertiaryHover: colors.red40,
        tertiaryPressed: colors.red40,
        tertiarySelected: colors.red40,
      },
    },

    form: {
      neutral: colors.black,
      neutralChecked: colors.white,
    },
  },
  border: {
    neutral: border('gray20'),
    mainSelected: border('blue40', 2),
    positive: border('green30'),
    info: border('lightBlue30'),
    critical: border('red30'),
    warning: border('orange30'),
    disabled: border('gray40'),

    form: {
      neutral: border('gray30'),
      neutralHover: border('gray40'),
      neutralFocus: border('gray50'),
      neutralPressed: border('gray50'),
      neutralChecked: border('black'),
      neutralCheckedHover: border('gray60'),
      neutralCheckedPressed: border('gray50'),

      critical: border('red40'),
      criticalHover: border('red50'),
      criticalFocus: border('red60'),
    },
  },
  shadow: {
    ring: {
      critical: ring('critical'),
      neutral: ring('neutral'),
      main: ring('main'),
    },
    overlay: {
      center: '0rem 0rem 1rem 0rem rgba(0,0,0,0.10)',
      bottom: '0rem 0rem 1.5rem 0rem rgba(0,0,0,0.05)',
    },
  },
  text: {
    pageTitle: {
      fontFamily: typography.fontStack.sans,
      fontVariationSettings: typography.fontWeight.regular,
      fontSize: typography.fontSize.xl,
      lineHeight: typography.lineHeight.sm,
    },
    title1: {
      fontFamily: typography.fontStack.sans,
      fontVariationSettings: typography.fontWeight.medium,
      fontSize: typography.fontSize.lg,
      lineHeight: typography.lineHeight.xl,
    },
    title2: {
      fontFamily: typography.fontStack.sans,
      fontVariationSettings: typography.fontWeight.regular,
      fontSize: typography.fontSize.lg,
      lineHeight: typography.lineHeight.xl,
    },
    action1: {
      fontFamily: typography.fontStack.sans,
      fontVariationSettings: typography.fontWeight.medium,
      fontSize: typography.fontSize.md,
      lineHeight: typography.lineHeight.lg,
    },
    action2: {
      fontFamily: typography.fontStack.sans,
      fontVariationSettings: typography.fontWeight.regular,
      fontSize: typography.fontSize.md,
      lineHeight: typography.lineHeight.lg,
    },
    display: {
      fontFamily: typography.fontStack.sans,
      fontVariationSettings: typography.fontWeight.medium,
      fontSize: typography.fontSize.xxl,
      lineHeight: typography.lineHeight.md,
    },
    body: {
      fontFamily: typography.fontStack.sans,
      fontVariationSettings: typography.fontWeight.regular,
      fontSize: typography.fontSize.md,
      lineHeight: typography.lineHeight.lg,
    },
    detail: {
      fontFamily: typography.fontStack.sans,
      fontVariationSettings: typography.fontWeight.regular,
      fontSize: typography.fontSize.sm,
      lineHeight: typography.lineHeight.md,
    },
  },
}

export const defaultTheme = {
  modes: {
    darkMatter: lightTheme,
  },
  ...lightTheme,
  global: {
    ...typography.fontFace.vtexTrust,
    body: {
      margin: 0,
      bg: 'base',
      color: 'base',
    },
    'html, body': {
      ...lightTheme.text.body,
    },
    'pre, code': { fontFamily: typography.fontStack.mono },
    '*': {
      ...lightTheme.text.body,
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
  borderRadius: {
    default: '4px',
    flat: '0px',
    pill: '100px',
    circle: '100%',
  },
}
