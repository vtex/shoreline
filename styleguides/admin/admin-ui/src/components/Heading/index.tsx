import { Box as ReakitBox } from 'reakit'
import { ReactNode, forwardRef, Ref } from 'react'
import { createElement } from '@vtex/admin-ui-system'
import { TextPattern } from '@vtex/admin-ui-theme'

import { useComponent } from '../../hooks/useComponent'
import { Overridable } from '../../types'

export const Heading = forwardRef(function Heading(
  props: HeadingProps,
  ref: Ref<HTMLHeadingElement>
) {
  const { element, ...htmlProps } = props
  const headingProps = useComponent({
    props: { text: 'headline', ...htmlProps },
  })

  return createElement({
    ref,
    element,
    component: ReakitBox,
    htmlProps: headingProps,
  })
})

export interface HeadingProps extends Overridable, TextPattern {
  /**
   * Element to render
   * @default h1
   */
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  /**
   * heading children
   */
  children?: ReactNode
}
