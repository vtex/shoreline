import { jsx } from '@vtex/admin-ui'

export const Blockquote = jsx('blockquote')({
  color: '$primary',
  paddingY: 1,
  paddingX: 2,
  marginY: 3,
  borderRadius: 'default',
  p: {
    margin: 0,
  },
  borderWidth: 1,
  borderStyle: 'solid',
  variants: {
    tone: {
      critical: {
        bg: `$critical`,
        color: `$critical`,
        border: `$critical`,
      },
      warning: {
        bg: `$warning`,
        color: `$warning`,
        border: `$warning`,
      },
      info: {
        bg: `$info`,
        color: `$info`,
        border: `$info`,
      },
      positive: {
        bg: `$positive`,
        color: `$positive`,
        border: `$positive`,
      },
    },
  },
})

Blockquote.defaultProps = {
  tone: 'info',
}
