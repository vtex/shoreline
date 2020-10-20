import { Box as ReakitBox } from 'reakit'
import { ReactNode, forwardRef, Ref } from 'react'
import { createElement } from '@vtex/admin-ui-system'

import { useHeadingLevel } from './context'
import { useComponent } from '../../hooks/useComponent'

export const unstableHeading = forwardRef(function Heading(
  props: HeadingProps,
  ref: Ref<HTMLHeadingElement>
) {
  const headingProps = useComponent({ props: { text: 'headline', ...props } })
  const level = useHeadingLevel()

  const element = props.element ?? `h${level}`

  return createElement({
    ref,
    element,
    component: ReakitBox,
    htmlProps: headingProps,
  })
})

export interface HeadingProps {
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children?: ReactNode
}
