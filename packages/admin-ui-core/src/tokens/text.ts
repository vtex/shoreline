const fontStack = {
  sans: '"VTEX Trust", -apple-system, system-ui, BlinkMacSystemFont, sans-serif',
  mono: '"MonoLisa", "Operator Mono", "Fira Code Retina", "Fira Code", "FiraCode-Retina", "Dank Mono", "Consolas", "Monaco", "Menlo", monospace',
}

const fontWeight = {
  hairline: "'WGHT' 100",
  thin: "'WGHT' 200",
  light: "'WGHT' 300",
  regular: "'WGHT' 400",
  medium: "'WGHT' 500",
  bold: "'WGHT' 700",
  black: "'WGHT' 900",
}

const fontSize = {
  detail: '0.75rem',
  action: '0.875rem',
  body: '0.875rem',
  title: '1rem',
  pageTitle: '1.25rem',
  display: '1.5rem',
}

export const text = {
  pageTitle: {
    fontFamily: fontStack.sans,
    fontVariationSettings: fontWeight.regular,
    fontSize: fontSize.pageTitle,
    lineHeight: 1.2,
    letterSpacing: '-0.004em',
  },
  title1: {
    fontFamily: fontStack.sans,
    fontVariationSettings: fontWeight.medium,
    fontSize: fontSize.title,
    lineHeight: 1.5,
    letterSpacing: '0em',
  },
  title2: {
    fontFamily: fontStack.sans,
    fontVariationSettings: fontWeight.regular,
    fontSize: fontSize.title,
    lineHeight: 1.5,
    letterSpacing: '0em',
  },
  action1: {
    fontFamily: fontStack.sans,
    fontVariationSettings: fontWeight.medium,
    fontSize: fontSize.action,
    lineHeight: 1.1428571429,
    letterSpacing: '0.01em',
  },
  action2: {
    fontFamily: fontStack.sans,
    fontVariationSettings: fontWeight.regular,
    fontSize: fontSize.action,
    lineHeight: 1.1428571429,
    letterSpacing: '0.01em',
  },
  display: {
    fontFamily: fontStack.sans,
    fontVariationSettings: fontWeight.medium,
    fontSize: fontSize.display,
    lineHeight: 1.3333333333,
    letterSpacing: '-0.004em',
  },
  body: {
    fontFamily: fontStack.sans,
    fontVariationSettings: fontWeight.regular,
    fontSize: fontSize.body,
    lineHeight: 1.4285714286,
    letterSpacing: '0.002em',
  },
  detail: {
    fontFamily: fontStack.sans,
    fontVariationSettings: fontWeight.regular,
    fontSize: fontSize.detail,
    lineHeight: 1.3333333333,
    letterSpacing: '0.004em',
  },
  code: {
    fontFamily: fontStack.mono,
  },
}
