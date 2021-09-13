import { jsx } from '@vtex/admin-ui-react'
import type { ComponentPropsWithRef } from 'react'

export const Text = jsx.span({
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
    feedback: {
      default: {
        color: 'dark.primary',
      },
      primary: {
        color: 'blue',
      },
      secondary: {
        color: 'dark.secondary',
      },
      success: {
        color: 'green',
      },
      danger: {
        color: 'red',
      },
      warning: {
        color: 'yellow',
      },
    },
  },
})

Text.defaultProps = {
  feedback: 'default',
  variant: 'body',
}

export type TextProps = ComponentPropsWithRef<typeof Text>
