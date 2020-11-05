import { Box as ReakitBox } from 'reakit'
import { ReactNode, forwardRef, Ref, PropsWithChildren } from 'react'
import { SpaceStyleProps, TextPattern } from '@vtex/admin-ui-theme'

import { createElement } from '../../system'
import { useComponent } from '../../hooks/useComponent'
import { Overridable } from '../../types'

export const Paragraph = forwardRef(function Paragraph(
  props: PropsWithChildren<ParagraphProps>,
  ref: Ref<HTMLParagraphElement>
) {
  const paragraphProps = useComponent({ props: { text: 'body', ...props } })

  return createElement({
    ref,
    element: 'p',
    component: ReakitBox,
    htmlProps: paragraphProps,
  })
})

export interface ParagraphProps
  extends Overridable,
    TextPattern,
    SpaceStyleProps {
  /**
   * paragraph children
   */
  children?: ReactNode
}
