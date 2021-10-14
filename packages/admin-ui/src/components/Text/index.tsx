import { jsx } from '@vtex/admin-ui-react'
import type { ComponentPropsWithRef } from 'react'

export const Text = jsx('span')({
  variants: {
    variant: {
      headline: {
        text: 'headline',
      },
      subtitle: {
        text: 'subtitle',
      },
      body: {
        text: 'body',
      },
      small: {
        text: 'small',
      },
      action: {
        text: 'action',
      },
      highlight: {
        text: 'highlight',
      },
      code: {
        text: 'code',
      },
    },
    tone: {
      neutral: {
        color: 'base',
      },
      muted: {
        color: 'muted',
      },
      info: {
        color: 'notification.info',
      },
      positive: {
        color: 'notification.positive',
      },
      critical: {
        color: 'notification.critical',
      },
      warning: {
        color: 'notification.warning',
      },
    },
  },
})

Text.defaultProps = {
  tone: 'neutral',
  variant: 'body',
}

export type TextProps = ComponentPropsWithRef<typeof Text>
