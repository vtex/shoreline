import { Box as ReakitBox } from 'reakit'
import { ReactNode, forwardRef, Ref } from 'react'
import { createElement } from '@vtex/admin-ui-system'
import { TextPattern } from '@vtex/admin-ui-theme'

import { useComponent } from '../../hooks/useComponent'
import { Overridable } from '../../types'

export const Text = forwardRef(function Heading(
  props: TextProps,
  ref: Ref<HTMLElement>
) {
  const { element = 'span', ...htmlProps } = props
  const textProps = useComponent({
    props: htmlProps,
  })

  return createElement({
    ref,
    element,
    component: ReakitBox,
    htmlProps: textProps,
  })
})

export interface TextProps extends Overridable, TextPattern {
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
}
