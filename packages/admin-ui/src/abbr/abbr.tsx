import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'

import { abbrTheme } from './abbr.style'

/**
 * Abbreviation component
 * @example
 * <Abbr title="Long Version">lv</Abbr>
 */
export const Abbr = forwardRef(function Abbr(
  props: AbbrProps,
  ref: Ref<HTMLDivElement>
) {
  const { className = '', children, ...abbrProps } = props

  return (
    <abbr ref={ref} className={cx(abbrTheme, className)} {...abbrProps}>
      {children}
    </abbr>
  )
})

export type AbbrProps = ComponentPropsWithoutRef<'abbr'>
