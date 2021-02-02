import React, { ReactNode, forwardRef, Ref, PropsWithChildren } from 'react'

import { StyleProp } from '@vtex/admin-core'
import { Overridable } from '../../types'
import { Box } from '../Box'

export const Paragraph = forwardRef(function Paragraph(
  props: PropsWithChildren<ParagraphProps>,
  ref: Ref<HTMLParagraphElement>
) {
  const { styles, ...htmlProps } = useParagraph(props)

  return <Box element="p" ref={ref} styles={styles} {...htmlProps} />
})

export function useParagraph(props: ParagraphProps) {
  const { styleOverrides, ...htmlProps } = props

  const styles = {
    text: 'body',
    ...styleOverrides,
  } as StyleProp

  return { styles, ...htmlProps }
}

export interface ParagraphProps extends Overridable {
  /**
   * paragraph children
   */
  children?: ReactNode
}
