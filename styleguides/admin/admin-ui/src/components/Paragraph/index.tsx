import React, { ReactNode, forwardRef, Ref, PropsWithChildren } from 'react'

import { StyleProp } from '@vtex/admin-core'
import { SystemComponent } from '../../types'
import { Box } from '@vtex/admin-primitives'

export const Paragraph = forwardRef(function Paragraph(
  props: PropsWithChildren<ParagraphProps>,
  ref: Ref<HTMLParagraphElement>
) {
  const { styles, ...htmlProps } = useParagraph(props)

  return <Box element="p" ref={ref} csx={styles} {...htmlProps} />
})

export function useParagraph(props: ParagraphProps) {
  const { csx, ...htmlProps } = props

  const styles = {
    text: 'body',
    ...csx,
  } as StyleProp

  return { styles, ...htmlProps }
}

export interface ParagraphProps extends SystemComponent {
  /**
   * paragraph children
   */
  children?: ReactNode
}
