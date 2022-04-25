import type { StyleProp } from '@vtex/admin-ui-core'

const style: Record<string, StyleProp> = {}

style.container = {
  paddingTop: '1rem',
  paddingBottom: '3rem',
  paddingX: '3rem',
  margin: '0 calc(var(--ifm-spacing-horizontal) * -1)',

  '@media (min-width: 997px)': {
    paddingTop: '2.5rem',
    paddingBottom: '4rem',
  },
}

style.caption = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '1.5rem',
}

style.breadcrumb = {
  fontSize: '1rem',
  fontVariationSettings: '"WGHT" 400',
  lineHeight: '1.2',
  color: '$secondary',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
}

style.logosContainer = {
  display: 'flex',
  alignItems: 'center',
}

style.gitHubUrl = {
  ':before': {
    background: `url("/img/github-logo.svg")`,
    content: '""',
    display: 'flex',
    height: '1.5rem',
    width: '1.5rem',
  },

  ':hover': {
    opacity: '0.5',
  },
}

style.figma = {
  marginLeft: '1rem',

  ':before': {
    ...style.gitHubUrl[':before'],
    background: `url("/img/figma-logo.svg")`,
  },

  ':hover': {
    opacity: '0.5',
  },
}

style.title = {
  fontSize: '3rem',
  fontVariationSettings: '"WGHT" 200',
  lineHeight: '1',
  color: '$primary',
  paddingTop: '1.75rem',

  '@media (min-width: 997px)': {
    fontSize: '4.5rem',
    paddingTop: '2rem',
  },
}

export default style
