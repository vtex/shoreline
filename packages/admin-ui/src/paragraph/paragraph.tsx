import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'

import { paragraphTheme } from './paragraph.style'

/**
 * Paragraph component
 * @example
 * <Paragraph>text</Paragraph>
 */
export const Paragraph = forwardRef(function Paragraph(
  props: ParagraphProps,
  ref: Ref<HTMLParagraphElement>
) {
  const { className = '', children, ...paragraphProps } = props

  return (
    <p ref={ref} className={cx(paragraphTheme, className)} {...paragraphProps}>
      {children}
    </p>
  )
})

export type ParagraphProps = ComponentPropsWithoutRef<'p'>
