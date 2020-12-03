import { Box as ReakitBox } from 'reakit'
import { ReactNode, forwardRef, Ref } from 'react'

import { cn, createElement } from '../../system'
import { Overridable } from '../../types'

export const Heading = forwardRef(function Heading(
  props: HeadingProps,
  ref: Ref<HTMLHeadingElement>
) {
  const { element = 'h1', ...htmlProps } = props
  const headingProps = useHeading(htmlProps)

  return createElement({
    ref,
    element,
    component: ReakitBox,
    htmlProps: headingProps,
  })
})

export function useHeading(props: HeadingProps) {
  const { styleOverrides, ...htmlProps } = props

  const className = cn({
    text: 'headline',
    ...styleOverrides,
  })

  return { className, ...htmlProps }
}

export interface HeadingProps extends Overridable {
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
