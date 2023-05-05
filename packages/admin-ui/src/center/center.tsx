import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'

import { centerTheme } from './center.css'

/**
 * Layout that aligns its children on the center
 * @example
 * import { Center } from `@vtex/admin-ui`
 * <Center>Centralized content</Center>
 */
export const Center = forwardRef(function Center(
  props: CenterProps,
  ref: Ref<HTMLDivElement>
) {
  const { className = '', ...htmlProps } = props

  return <div ref={ref} className={cx(centerTheme, className)} {...htmlProps} />
})

export type CenterProps = ComponentPropsWithoutRef<'div'>
