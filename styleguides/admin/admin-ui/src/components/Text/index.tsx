import { Box as ReakitBox } from 'reakit'
import { ReactNode, forwardRef, Ref } from 'react'
import { SpaceStyleProps, TextVariant } from '@vtex/admin-ui-theme'

import { createElement } from '../unstableThemeProvider'
import { useComponent } from '../../hooks/useComponent'
import { Overridable } from '../../types'

export const Text = forwardRef(function Heading(
  props: TextProps,
  ref: Ref<HTMLElement>
) {
  const { element = 'span', variant = 'body', ...htmlProps } = props
  const textProps = useComponent({
    props: { text: variant, ...htmlProps },
  })

  return createElement({
    ref,
    element,
    component: ReakitBox,
    htmlProps: textProps,
  })
})

export interface TextProps extends Overridable, SpaceStyleProps {
  /**
   * Element to render
   * @default span
   */
  element?:
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
    | 'sup'
  /**
   * heading children
   */
  children?: ReactNode
  /**
   * Text variant. Consumes the text pattern
   * @default body
   */
  variant?: TextVariant
}
