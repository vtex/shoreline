import colors from './colors'
import space from './space'
import sizes from './sizes'

export { colors, space }

export default {
  sizes,
  colors,
  space,
  breakpoints: ['480px', '640px', '768px', '1024px', '1280px'],
  transition: {
    snap: 'all 70ms cubic-bezier(0.2, 0.2, 0.38, 0.9)',
    fade: 'all 110ms cubic-bezier(0.2, 0.2, 0.38, 0.9)',
    pop: 'all 150ms cubic-bezier(0.4, 0.14, 0.3, 1)',
    callout: 'all 240ms cubic-bezier(0.4, 0.14, 0.3, 1)',
  },
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
  fontWeights: {
    light: {
      fontVariationSettings: "'wght' 80",
      fontWeight: 300,
    },
    regular: {
      fontVariationSettings: "'wght' 92",
      fontWeight: 400,
    },
    medium: {
      fontVariationSettings: "'wght' 100",
      fontWeight: 500,
    },
    bold: {
      fontVariationSettings: "'wght' 108",
      fontWeight: 600,
    },
  },
  lineHeights: {
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
    focus: `0rem 0rem 0rem ${space['2px']} ${colors.focus}`,
  },
  borderRadius: {
    default: '4px',
    flat: '0px',
    pill: '100px',
    circle: '100%',
  },
}
