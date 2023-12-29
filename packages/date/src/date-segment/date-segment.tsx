import React, { forwardRef, useRef } from 'react'
import { useDateSegment } from '@react-aria/datepicker'
import type {
  DateSegment as SegmentType,
  DateFieldState,
} from '@react-stately/datepicker'
import { useMergeRef } from '@vtex/shoreline-utils'

/**
 * Segment of a DateField
 */
export const DateSegment = forwardRef<HTMLDivElement, DateSegmentProps>(
  function DateSegment(props, forwardedRef) {
    const { segment, state } = props
    const ref = useRef<HTMLDivElement>(null)
    const { segmentProps } = useDateSegment(segment, state, ref)

    return (
      <div
        {...segmentProps}
        ref={useMergeRef(ref, forwardedRef)}
        data-sl-date-segment
        data-placeholder={segment.isPlaceholder}
      >
        {segment.text}
      </div>
    )
  }
)

export interface DateSegmentProps {
  /**
   * Segment to render
   */
  segment: SegmentType
  /**
   * State of a Datefield
   */
  state: DateFieldState
}
