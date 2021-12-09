import { theme, merge, color } from '@vtex/admin-ui'

export default merge(theme, {
  shadows: {
    block:
      '0 1px 1px hsl(0deg 0% 0% / 0.05), 0 2px 2px hsl(0deg 0% 0% / 0.05), 0 4px 4px hsl(0deg 0% 0% / 0.05), 0 8px 8px hsl(0deg 0% 0% / 0.05), 0 16px 16px hsl(0deg 0% 0% / 0.05)',
  },
  global: {
    img: {
      borderRadius: '0.25rem',
      maxWidth: '100%',
    },
    pre: {
      fontFamily: `${theme.fonts.mono} !important`,
    },
    code: {
      fontFamily: `${theme.fonts.mono} !important`,
      color: `$info`,
      bg: 'transparent',
    },
    'pre > code': {
      fontFamily: `${theme.fonts.mono} !important`,
    },
    '.token': {
      fontFamily: `${theme.fonts.mono} !important`,
      display: 'inline-block',
      verticalAlign: 'middle',
      lineHeight: 1,
      fontSize: '14px',
    },
    textArea: {
      fontFamily: `${theme.fonts.mono} !important`,
    },
    'code.inline-code': {
      display: 'inline-block',
      verticalAlign: 'middle',
      lineHeight: 1,
      padding: '0.2em',
      backgroundColor: '#44475a',
      color: 'rgba(248, 248, 242)',
      fontSize: '14px',
      borderRadius: '3px',
    },
    'h1 code.inline-code, h2 code.inline-code': {
      fontSize: 'calc(100% - 5px)',
      padding: '4px',
    },
    blockquote: {
      marginBottom: '16px',
      width: '100%',
      p: { padding: '1rem', borderRadius: '5px', margin: '0' },
    },
    hr: {
      border: '0',
      height: '0',
      borderTop: '1px solid rgba(0, 0, 0, 0.1)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
    },
    iframe: { marginBottom: '16px' },
    'ul, ol': {
      paddingLeft: '15px',
      marginBottom: '16px',
      li: { lineHeight: '28px' },
    },
    'li ul, li ol': { marginBottom: '0' },
    '.gatsby-highlight': {
      fontFamily: `${theme.fonts.mono} !important`,
      fontVariant:
        'no-common-ligatures no-discretionary-ligatures no-historical-ligatures no-contextual',
      position: 'relative',
      zIndex: 0,
      margin: '16px 0px',
      overflow: 'auto',
      '.token': { fontStyle: 'normal !important' },
    },
    "pre[class*='language-'] code": { fontFamily: 'inherit' },
    "pre[class*='language-']::before": {
      background: '#d9d7e0',
      borderRadius: '0 0 4px 4px',
      color: '#232129',
      fontSize: '12px',
      fontFamily: 'inherit',
      letterSpacing: '0.075em',
      lineHeight: 1,
      padding: '0.25rem 0.5rem',
      position: 'absolute',
      left: '1rem',
      textAlign: 'right',
      textTransform: 'uppercase',
      top: '12px',
    },
    "pre[class~='language-js']::before, pre[class~='language-javascript']::before":
      {
        content: "'js'",
        background: '#f7df1e',
      },
    "pre[class~='language-jsx']::before": {
      content: "'jsx'",
      background: '#61dafb',
    },
    "pre[class~='language-typescript']::before, pre[class~='language-ts']::before":
      {
        content: "'ts'",
        background: '#294e80',
        color: '#fff',
      },
    "pre[class~='language-tsx']::before": {
      content: "'tsx'",
      background: '#294e80',
      color: '#fff',
    },
    "pre[class~='language-graphql']::before": {
      content: "'GraphQL'",
      background: '#e10098',
      color: '#fff',
    },
    "pre[class~='language-html']::before": {
      content: "'html'",
      background: '#005a9c',
      color: '#fff',
    },
    "pre[class~='language-css']::before": {
      content: "'css'",
      background: '#ff9800',
      color: '#fff',
    },
    "pre[class~='language-mdx']::before": {
      content: "'mdx'",
      background: '#f9ac00',
      color: '#fff',
    },
    "pre[class~='language-shell']::before": { content: "'shell'" },
    "pre[class~='language-sh']::before": { content: "'sh'" },
    "pre[class~='language-bash']::before": { content: "'bash'" },
    "pre[class~='language-yaml']::before, pre[class~='language-yml']::before": {
      content: "'yaml'",
      background: '#ffa8df',
    },
    "pre[class~='language-markdown']::before": { content: "'md'" },
    "pre[class~='language-json']::before, pre[class~='language-json5']::before":
      {
        content: "'json'",
        background: 'linen',
      },
    "pre[class~='language-diff']::before": {
      content: "'diff'",
      background: '#e6ffed',
    },
    "pre[class~='language-text']::before": {
      content: "'text'",
      background: '#fff',
    },
    "pre[class~='language-flow']::before": {
      content: "'flow'",
      background: '#e8bd36',
    },
  },
  colors: {
    purple: '#805ad5',
    rebelPink: '#F71963',
  },
  borderColor: {
    nestedContent: color('grey20'),
  },
  sizes: {
    header: '4.5rem',
    content: '90rem',
  },
  space: {
    content: '4.5rem',
  },
})
