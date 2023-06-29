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
    fontWeight: fontWeight.medium,
    fontSize: fontSize.pageTitle,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  title1: {
    fontFamily: fontFamily.sans,
    fontWeight: fontWeight.bold,
    fontSize: fontSize.title,
    lineHeight: 1.24,
    letterSpacing: '-0.01em',
  },
  title2: {
    fontFamily: fontFamily.sans,
    fontWeight: fontWeight.medium,
    fontSize: fontSize.title,
    lineHeight: 1.24,
    letterSpacing: '-0.01em',
  },
  action1: {
    fontFamily: fontFamily.sans,
    fontWeight: fontWeight.bold,
    fontSize: fontSize.action,
    lineHeight: 1.16,
    letterSpacing: '0em',
  },
  action2: {
    fontFamily: fontFamily.sans,
    fontWeight: fontWeight.medium,
    fontSize: fontSize.action,
    lineHeight: 1.16,
    letterSpacing: '0em',
  },
  display: {
    fontFamily: fontFamily.sans,
    fontWeight: fontWeight.bold,
    fontSize: fontSize.display,
    lineHeight: 1.32,
    letterSpacing: '-0.02em',
  },
  body: {
    fontFamily: fontFamily.sans,
    fontWeight: fontWeight.medium,
    fontSize: fontSize.body,
    lineHeight: 1.4,
    letterSpacing: '0em',
  },
  detail: {
    fontFamily: fontFamily.sans,
    fontWeight: fontWeight.medium,
    fontSize: fontSize.detail,
    lineHeight: 1.32,
    letterSpacing: '0em',
  },
  code: {
    fontFamily: fontFamily.mono,
  },
}
