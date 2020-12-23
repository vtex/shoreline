import { Box as ReakitBox } from 'reakit'
import { ReactNode, forwardRef, Ref } from 'react'

import { cn, createElement } from '../../system'
import { Overridable } from '../../types'

export const Text = forwardRef(function Heading(
  props: TextProps,
  ref: Ref<HTMLElement>
) {
  const { element = 'span', ...htmlProps } = props

  const textProps = useText(htmlProps)

  return createElement({
    ref,
    element,
    component: ReakitBox,
    htmlProps: textProps,
  })
})

function useText(props: TextProps) {
  const {
    variant = 'body',
    feedback = 'default',
    styleOverrides,
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

  const className = cn({
    color,
    text: variant,
    ...styleOverrides,
  })

  return { className, ...htmlProps }
}

export interface TextProps extends Overridable {
  /**
   * Element to render
   * @default span
   */
  element?:
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
  /**
   * heading children
   */
  children?: ReactNode
  /**
   * Text variant. Consumes the text pattern
   * @default body
   */
  variant?:
    | 'headline'
    | 'subtitle'
    | 'body'
    | 'small'
    | 'action'
    | 'highlight'
    | 'code'
  /**
   * html id
   */
  id?: string
  /**
   * text feedback
   * @default 'default'
   */
  feedback?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
}
