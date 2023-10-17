import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/shoreline-utils'

import { centerStyle } from './center.css'

export const Center = forwardRef<HTMLDivElement, CenterProps>(function Center(
  props,
  ref
) {
  const { className, ...divProps } = props

  return <div ref={ref} className={cx(centerStyle, className)} {...divProps} />
})

export type CenterProps = ComponentPropsWithoutRef<'div'>
