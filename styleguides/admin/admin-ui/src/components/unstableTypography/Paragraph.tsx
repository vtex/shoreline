import { Box as ReakitBox } from 'reakit'
import { ReactNode, forwardRef, Ref, PropsWithChildren } from 'react'
import { useCleanProps, useCx, createElement } from '@vtex/admin-ui-system'

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
  const className = useCx({ text: 'body', ...props })
  const htmlProps = useCleanProps(props)

  return { ...htmlProps, className }
}

export interface ParagraphProps {
  children?: ReactNode
}
