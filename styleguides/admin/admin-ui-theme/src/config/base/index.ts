import colors from './colors'
import space from './space'
import sizes from './sizes'

export { colors, space, sizes }

export default {
  sizes,
  colors,
  space,
  breakpoints: ['640px', '768px', '1024px', '1280px'],
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
  text: {
    small: {
      lineHeight: 'small',
      fontVariant: 'regular',
      fontSize: 0,
    },
    body: {
      lineHeight: 'body',
      fontVariant: 'regular',
      fontSize: 1,
    },
    highlight: {
      lineHeight: 'highlight',
      fontVariant: 'regular',
      fontSize: 1,
    },
    action: {
      lineHeight: 'action',
      fontVariant: 'regular',
      fontSize: 1,
      textTransform: 'uppercase',
    },
    subtitle: {
      lineHeight: 'subtitle',
      fontVariant: 'regular',
      fontSize: 2,
    },
    headline: {
      lineHeight: 'headline',
      fontVariant: 'regular',
      fontSize: 4,
    },
  },
  border: {
    default: {
      borderWidth: '1px',
      borderStyle: 'solid',
      borderRadius: 'default',
      borderColor: 'muted.2',
    },
    'divider-bottom': {
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderColor: 'muted.2',
    },
    'divider-top': {
      borderTopWidth: '1px',
      borderTopStyle: 'solid',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderColor: 'muted.2',
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
  },
  fontVariant: {
    hairline: "'wght' 30",
    thin: "'wght' 50",
    light: "'wght' 65",
    regular: "'wght' 92",
    medium: "'wght' 120",
    bold: "'wght' 170",
    black: "'wght' 200",
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
