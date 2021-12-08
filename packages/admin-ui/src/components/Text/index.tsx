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
      primary: {
        color: '$primary',
      },
      secondary: {
        color: '$secondary',
      },
      info: {
        color: '$info',
      },
      positive: {
        color: '$positive',
      },
      critical: {
        color: '$critical',
      },
      warning: {
        color: '$warning',
      },
    },
  },
})

Text.defaultProps = {
  tone: 'primary',
  variant: 'body',
}

export type TextProps = ComponentPropsWithRef<typeof Text>
