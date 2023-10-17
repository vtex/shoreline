import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'

import { anchorTheme } from './anchor.style'

/**
 * Anchor component
 * @example
 * <Anchor href="#">Link to #</Anchor>
 */
export const Anchor = forwardRef(function Anchor(
  props: AnchorProps,
  ref: Ref<HTMLAnchorElement>
) {
  const { className = '', children, ...anchorProps } = props

  return (
    <a ref={ref} className={cx(anchorTheme, className)} {...anchorProps}>
      {children}
    </a>
  )
})

export type AnchorProps = ComponentPropsWithoutRef<'a'>
