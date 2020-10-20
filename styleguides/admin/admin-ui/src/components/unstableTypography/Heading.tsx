import { Box as ReakitBox } from 'reakit'
import { ReactNode, forwardRef, Ref } from 'react'
import { useCleanProps, useCx, createElement } from '@vtex/admin-ui-system'

import { useHeadingLevel } from './context'

export const unstableHeading = forwardRef(function Heading(
  props: HeadingProps,
  ref: Ref<HTMLHeadingElement>
) {
  const headingProps = useHeading(props)
  const level = useHeadingLevel()

  const element = props.element ?? `h${level}`

  return createElement({
    ref,
    element,
    component: ReakitBox,
    htmlProps: headingProps,
  })
})

export function useHeading(props: HeadingProps) {
  const className = useCx({ text: 'headline', ...props })
  const htmlProps = useCleanProps(props)

  return { ...htmlProps, className }
}

export interface HeadingProps {
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children?: ReactNode
}
