import { Box as ReakitBox } from 'reakit'
import { ReactNode, forwardRef, Ref, PropsWithChildren } from 'react'
import { useClassName, createElement, cleanProps } from '@vtex/admin-ui-system'

export const unstableParagraph = forwardRef(function Paragraph(
  props: PropsWithChildren<ParagraphProps>,
  ref: Ref<HTMLParagraphElement>
) {
  const paragraphProps = useParagraph(props)

  return createElement({
    ref,
    element: 'p',
    component: ReakitBox,
    htmlProps: paragraphProps,
  })
})

export function useParagraph(props: ParagraphProps) {
  const className = useClassName({ props: { text: 'body', ...props } })
  const htmlProps = cleanProps(props)

  return { ...htmlProps, className }
}

export interface ParagraphProps {
  children?: ReactNode
}
