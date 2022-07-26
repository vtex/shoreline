const stackValues = {
  sans: '"VTEX Trust", -apple-system, system-ui, BlinkMacSystemFont, sans-serif',
  mono: '"MonoLisa", "Operator Mono", "Fira Code Retina", "Fira Code", "FiraCode-Retina", "Dank Mono", "Consolas", "Monaco", "Menlo", monospace',
}

const weightValues = {
  hairline: "'WGHT' 100",
  thin: "'WGHT' 200",
  light: "'WGHT' 300",
  regular: "'WGHT' 400",
  medium: "'WGHT' 500",
  bold: "'WGHT' 700",
  black: "'WGHT' 900",
}

const sizeValues = {
  detail: '0.75rem',
  action: '0.875rem',
  body: '0.875rem',
  title: '1rem',
  pageTitle: '1.25rem',
  display: '1.5rem',
}

export const fonts = {
  pageTitle: stackValues.sans,
  title1: stackValues.sans,
  title2: stackValues.sans,
  action1: stackValues.sans,
  action2: stackValues.sans,
  display: stackValues.sans,
  body: stackValues.sans,
  detail: stackValues.sans,
  code: stackValues.mono,
}

export const fontSizes = {
  pageTitle: sizeValues.pageTitle,
  title1: sizeValues.title,
  title2: sizeValues.title,
  action1: sizeValues.action,
  action2: sizeValues.action,
  display: sizeValues.display,
  body: sizeValues.body,
  detail: sizeValues.detail,
  code: 'inherit',
}

export const fontWeights = {
  pageTitle: weightValues.regular,
  title1: weightValues.medium,
  title2: weightValues.regular,
  action1: weightValues.medium,
  action2: weightValues.regular,
  display: weightValues.medium,
  body: weightValues.regular,
  detail: weightValues.regular,
  code: 'inherit',
}

export const letterSpacings = {
  pageTitle: '-0.004em',
  title1: '0em',
  title2: '0em',
  action1: '0.01em',
  action2: '0.01em',
  display: '-0.004em',
  body: '0.002em',
  detail: '0.004em',
  code: 'inherit',
}

export const lineHeights = {
  pageTitle: 1.2,
  title1: 1.5,
  title2: 1.5,
  action1: 1.1428571429,
  action2: 1.1428571429,
  display: 1.3333333333,
  body: 1.4285714286,
  detail: 1.3333333333,
  code: 'normal',
}

export const typography = {
  lineHeights,
  letterSpacings,
  fontWeights,
  fontSizes,
  fonts,
}
