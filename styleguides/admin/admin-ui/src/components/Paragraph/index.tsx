import { Box as ReakitBox } from 'reakit'
import { ReactNode, forwardRef, Ref, PropsWithChildren } from 'react'

import { cn, createElement } from '../../system'
import { Overridable } from '../../types'

export const Paragraph = forwardRef(function Paragraph(
  props: PropsWithChildren<ParagraphProps>,
  ref: Ref<HTMLParagraphElement>
) {
  const htmlProps = useParagraph(props)
  return createElement({
    ref,
    element: 'p',
    component: ReakitBox,
    htmlProps,
  })
})

export function useParagraph(props: ParagraphProps){
  const { styleOverrides, ...htmlProps } = props

  const className = cn({
    text: 'body',
    ...styleOverrides
  })

  return { className, ...htmlProps}
}

export interface ParagraphProps
  extends Overridable {
  /**
   * paragraph children
   */
  children?: ReactNode
}
