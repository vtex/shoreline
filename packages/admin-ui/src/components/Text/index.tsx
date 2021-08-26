import type { ReactNode } from 'react'
import { createComponent } from '@vtex/admin-jsxs'
import { Primitive } from '@vtex/admin-primitives'

import type { SystemComponent } from '../../types'

export const Text = createComponent(Primitive, useText)

function useText(props: TextProps) {
  const {
    variant = 'body',
    feedback = 'default',
    csx,
    element = 'span',
    ...htmlProps
  } = props

  const color = {
    default: 'dark.primary',
    secondary: 'dark.secondary',
    primary: 'blue',
    success: 'green',
    danger: 'red',
    warning: 'yellow',
  }[feedback]

  return {
    element,
    csx: {
      color,
      text: variant,
      ...csx,
    },
    ...htmlProps,
  }
}

export type TextElementType =
  | 'code'
  | 'span'
  | 'strong'
  | 'i'
  | 'u'
  | 'abbr'
  | 'cite'
  | 'del'
  | 'em'
  | 'ins'
  | 'kbd'
  | 'mark'
  | 's'
  | 'samp'
  | 'sub'
  | 'pre'
  | 'sup'

export type TextVariantType =
  | 'headline'
  | 'subtitle'
  | 'body'
  | 'small'
  | 'action'
  | 'highlight'
  | 'code'

export type TextFeedbackType =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'

export interface TextProps extends SystemComponent {
  /**
   * Element to render
   * @default span
   */
  element?: TextElementType
  /**
   * Text children
   */
  children?: ReactNode
  /**
   * Text variant. Consumes the text pattern
   * @default body
   */
  variant?: TextVariantType
  /**
   * html id
   */
  id?: string
  /**
   * text feedback
   * @default 'default'
   */
  feedback?: TextFeedbackType
}
