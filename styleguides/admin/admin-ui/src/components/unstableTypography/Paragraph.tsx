import { Box as ReakitBox } from 'reakit'
import { ReactNode, forwardRef, Ref, PropsWithChildren } from 'react'
import { createElement } from '@vtex/admin-ui-system'

import { useComponent } from '../../hooks/useComponent'

export const unstableParagraph = forwardRef(function Paragraph(
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

export interface ParagraphProps {
  children?: ReactNode
}
