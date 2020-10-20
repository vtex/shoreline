const borderStyles = {
  borderWidth: '1px',
  borderStyle: 'solid',
}

const patterns = {
  surface: {
    default: {
      bg: 'background',
      color: 'text',
    },
    inverted: {
      bg: 'text',
      color: 'background',
    },
    primary: {
      bg: 'primary.base',
      color: 'primary.contrast',
    },
  },
  text: {
    small: {
      lineHeight: 'small',
      fontVariationSettings: "'wght' 80",
      fontWeight: 400,
      fontSize: 0,
    },
    body: {
      lineHeight: 'body',
      fontVariationSettings: "'wght' 80",
      fontWeight: 400,
      fontSize: 1,
    },
    highlight: {
      lineHeight: 'highlight',
      fontVariationSettings: "'wght' 92",
      fontWeight: 500,
      fontSize: 1,
    },
    action: {
      lineHeight: 'action',
      fontVariationSettings: "'wght' 92",
      fontWeight: 500,
      fontSize: 1,
      textTransform: 'uppercase',
    },
    subtitle: {
      lineHeight: 'subtitle',
      fontVariationSettings: "'wght' 92",
      fontWeight: 500,
      fontSize: 2,
    },
    headline: {
      lineHeight: 'headline',
      fontVariationSettings: "'wght' 92",
      fontWeight: 500,
      fontSize: 4,
    },
  },
  border: {
    default: {
      ...borderStyles,
      borderColor: 'muted.3',
    },
    strong: {
      ...borderStyles,
      borderColor: 'text',
    },
    disabled: {
      ...borderStyles,
      borderColor: 'muted.2',
    },
    primary: {
      ...borderStyles,
      borderColor: 'primary.base',
    },
    danger: {
      ...borderStyles,
      borderColor: 'danger.base',
    },
  },
}

export const patternKeys = Object.keys(patterns)
export type SurfacePattern = keyof typeof patterns.surface
export type TextPattern = keyof typeof patterns.text
export type BorderPattern = keyof typeof patterns.border

export type LayoutPatterns = {
  border?: BorderPattern
  surface?: SurfacePattern
  text?: TextPattern
}

export default patterns
