import { jsx } from '@vtex/admin-ui-react'
import type { ComponentPropsWithRef } from 'react'

export const Text = jsx('span')({
  variants: {
    variant: {
      pageTitle: {
        text: '$pageTitle',
      },
      title1: {
        text: '$title1',
      },
      title2: {
        text: '$title2',
      },
      action1: {
        text: '$action1',
      },
      action2: {
        text: '$action2',
      },
      display: {
        text: '$display',
      },
      body: {
        text: '$body',
      },
      detail: {
        text: '$detail',
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
