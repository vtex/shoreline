import { darken, lighten } from 'polished'

const semanticColors = {
  blue: '#2953B2',
  blueSecondary: '#DAE3F5',
  red: '#CB4242',
  redSecondary: '#FEDADA',
  yellow: '#FFBA52',
  yellowSecondary: '#F6E0BA',
  green: '#368369',
  greenSecondary: '#CEE8DE',
  black: '#323845',
  white: '#FFFFFF',
}

export default {
  global: {
    '@font-face': {
      fontFamily: 'VTEXTrustVF',
      fontStyle: 'normal',
      src:
        "url('https://io.vtex.com.br/fonts/vtex-trust/VTEXTrust-Variable.woff2')",
      fontDisplay: 'swap',
    },
    body: {
      margin: 0,
      bg: 'light.primary',
      color: 'dark.primary',
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
    'html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, a, abbr, acronym, address, big, cite, del, dfn, em, img, ins, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video': {
      margin: 0,
      padding: 0,
      border: 0,
      verticalAlign: 'baseline',
    },
    'article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section': {
      display: 'block',
    },
    'blockquote, q': { quotes: 'none' },
    'blockquote:before, blockquote:after, q:before, q:after': {
      content: ["''", 'none'],
    },
    table: { borderCollapse: 'collapse', borderSpacing: 0 },
  },
  colors: {
    dark: {
      primary: semanticColors.black,
      secondary: '#707685',
    },
    light: {
      primary: semanticColors.white,
      secondary: '#F4F6FB',
    },
    mid: {
      primary: '#898F9E',
      secondary: '#C4C5CA',
      tertiary: '#E0E2E7',
    },
    focus: '#8DB6FA',
    blue: {
      default: semanticColors.blue,
      hover: darken(0.08, semanticColors.blue),
      pressed: darken(0.16, semanticColors.blue),
      secondary: {
        default: semanticColors.blueSecondary,
        hover: darken(0.04, semanticColors.blueSecondary),
        pressed: darken(0.08, semanticColors.blueSecondary),
      },
    },
    red: {
      default: semanticColors.red,
      hover: darken(0.08, semanticColors.red),
      pressed: darken(0.16, semanticColors.red),
      secondary: {
        default: semanticColors.redSecondary,
        hover: darken(0.04, semanticColors.redSecondary),
        pressed: darken(0.08, semanticColors.redSecondary),
      },
    },
    yellow: {
      default: semanticColors.yellow,
      hover: darken(0.08, semanticColors.yellow),
      pressed: darken(0.16, semanticColors.yellow),
      secondary: {
        default: semanticColors.yellowSecondary,
        hover: darken(0.04, semanticColors.yellowSecondary),
        pressed: darken(0.08, semanticColors.yellowSecondary),
      },
    },
    green: {
      default: semanticColors.green,
      hover: darken(0.08, semanticColors.green),
      pressed: darken(0.16, semanticColors.green),
      secondary: {
        default: semanticColors.greenSecondary,
        hover: darken(0.04, semanticColors.greenSecondary),
        pressed: darken(0.08, semanticColors.greenSecondary),
      },
    },
    sidebar: {
      light: '#F8F9FA',
      dark: lighten(0.16, semanticColors.black),
      hover: '#EAF0FD',
    },
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
    sans:
      'VTEXTrustVF, -apple-system, system-ui, BlinkMacSystemFont, sans-serif',
    mono:
      '"Dank Mono", "Operator Mono", "Fira Code Retina", "Fira Code", "FiraCode-Retina", "Consolas", "Monaco", "Menlo", monospace',
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
      borderColor: 'mid.tertiary',
    },
    'divider-bottom': {
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderColor: 'mid.tertiary',
    },
    'divider-top': {
      borderTopWidth: '1px',
      borderTopStyle: 'solid',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderColor: 'mid.tertiary',
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
    hairline: "'wght' 30",
    thin: "'wght' 50",
    light: "'wght' 65",
    regular: "'wght' 92",
    medium: "'wght' 120",
    bold: "'wght' 170",
    black: "'wght' 200",
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
    focus: `0rem 0rem 0rem 2px #8DB6FA`,
  },
  borderRadius: {
    default: '4px',
    flat: '0px',
    pill: '100px',
    circle: '100%',
  },
}
