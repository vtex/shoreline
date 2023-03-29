import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { Composite } from 'reakit/Composite'
import { cx } from '@vtex/admin-ui-core'

import type { SegmentStateReturn } from './segment.state'
import { segmentListTheme } from './segment.css'

export const SegmentList = forwardRef(function SegmentList(
  props: SegmentListProps,
  ref: Ref<HTMLDivElement>
) {
  const { className = '', ...htmlProps } = props

  return (
    <Composite
      ref={ref}
      className={cx(segmentListTheme, className)}
      {...htmlProps}
    />
  )
})

export type SegmentListProps = ComponentPropsWithoutRef<'div'> & {
  state: SegmentStateReturn
}
