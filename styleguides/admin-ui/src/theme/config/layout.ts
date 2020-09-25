import skeleton from './skeleton'
import colors from './colors'
import space from './space'

export default {
  layout: {
    ...skeleton,
  },
  breakpoints: ['20em', '48em', '56em', '64em'],
  fontSizes: {
    '0': '0.75rem',
    '1': '0.875rem',
    '2': '1rem',
    '3': '1.125rem',
    '4': '1.25rem',
  },
  zIndexes: {
    under: -1,
    plain: 0,
    over: 999,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
  },
  fontVariation: {
    light: "'wght' 80",
    regular: "'wght' 92",
    bold: "'wght' 100",
  },
  lineHeights: {
    small: 1.125,
    body: 1.25,
    highlight: 1.25,
    action: 1.5,
    subtitle: 1.5,
    headline: 1.5,
  },
  borderWidths: {
    '0': '0rem',
    '1': '0.0625rem',
    '2': '0.125rem',
    '3': '0.250rem',
  },
  borderRadius: {
    '0': '0rem',
    '1': '0.0625rem',
    '2': '0.125rem',
    '3': '0.250rem',
    full: '100%',
  },
  shadows: {
    menu: '0rem 0rem 1rem 0rem rgba(0,0,0,0.10)',
    focus: `0rem 0rem 0rem ${space[2]} ${colors.focus}`,
  },
}
