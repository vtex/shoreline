import { fontFamily } from './font-family'

export const fonts = {
  pageTitle: fontFamily.sans,
  title1: fontFamily.sans,
  title2: fontFamily.sans,
  action1: fontFamily.sans,
  action2: fontFamily.sans,
  display: fontFamily.sans,
  body: fontFamily.sans,
  detail: fontFamily.sans,
  code: fontFamily.mono,
}

export const fontSizes = {
  pageTitle: '1.25rem',
  title1: '1rem',
  title2: '1rem',
  action1: '0.875rem',
  action2: '0.875rem',
  display: '1.5rem',
  body: '0.875rem',
  detail: '0.75rem',
  code: 'inherit',
}

export const fontWeights = {
  pageTitle: 400,
  title1: 500,
  title2: 400,
  action1: 500,
  action2: 400,
  display: 500,
  body: 400,
  detail: 400,
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
