import { fontFamily } from './font-family'

const fontWeight = {
  hairline: 100,
  thin: 200,
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
  black: 900,
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
    fontFamily: fontFamily.sans,
    fontWeight: fontWeight.regular,
    fontSize: fontSize.pageTitle,
    lineHeight: 1.2,
    letterSpacing: '-0.004em',
  },
  title1: {
    fontFamily: fontFamily.sans,
    fontWeight: fontWeight.medium,
    fontSize: fontSize.title,
    lineHeight: 1.5,
    letterSpacing: '0em',
  },
  title2: {
    fontFamily: fontFamily.sans,
    fontWeight: fontWeight.regular,
    fontSize: fontSize.title,
    lineHeight: 1.5,
    letterSpacing: '0em',
  },
  action1: {
    fontFamily: fontFamily.sans,
    fontWeight: fontWeight.medium,
    fontSize: fontSize.action,
    lineHeight: 1.1428571429,
    letterSpacing: '0.01em',
  },
  action2: {
    fontFamily: fontFamily.sans,
    fontWeight: fontWeight.regular,
    fontSize: fontSize.action,
    lineHeight: 1.1428571429,
    letterSpacing: '0.01em',
  },
  display: {
    fontFamily: fontFamily.sans,
    fontWeight: fontWeight.medium,
    fontSize: fontSize.display,
    lineHeight: 1.3333333333,
    letterSpacing: '-0.004em',
  },
  body: {
    fontFamily: fontFamily.sans,
    fontWeight: fontWeight.regular,
    fontSize: fontSize.body,
    lineHeight: 1.4285714286,
    letterSpacing: '0.002em',
  },
  detail: {
    fontFamily: fontFamily.sans,
    fontWeight: fontWeight.regular,
    fontSize: fontSize.detail,
    lineHeight: 1.3333333333,
    letterSpacing: '0.004em',
  },
  code: {
    fontFamily: fontFamily.mono,
  },
}
