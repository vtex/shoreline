import { jsx } from '@vtex/admin-ui'

export const Blockquote = jsx('blockquote')({
  color: 'base',
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
        bg: `notification.critical`,
        color: `notification.critical`,
        borderColor: `notification.critical`,
      },
      warning: {
        bg: `notification.warning`,
        color: `notification.warning`,
        borderColor: `notification.warning`,
      },
      info: {
        bg: `notification.info`,
        color: `notification.info`,
        borderColor: `notification.info`,
      },
      positive: {
        bg: `notification.positive`,
        color: `notification.positive`,
        borderColor: `notification.positive`,
      },
    },
  },
})

Blockquote.defaultProps = {
  tone: 'info',
}
