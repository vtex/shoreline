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
    feedback: {
      base: {
        color: 'base',
      },
      muted: {
        color: 'muted',
      },
      info: {
        color: 'feedback.info',
      },
      success: {
        color: 'feedback.success',
      },
      danger: {
        color: 'feedback.danger',
      },
      warning: {
        color: 'feedback.warning',
      },
    },
  },
})

Text.defaultProps = {
  feedback: 'base',
  variant: 'body',
}

export type TextProps = ComponentPropsWithRef<typeof Text>
