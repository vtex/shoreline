import React, { forwardRef } from 'react'
import { useDateSegment } from '@react-aria/datepicker'
import type {
  DateSegment as SegmentType,
  DateFieldState,
} from '@react-stately/datepicker'
import { useMergeRef } from '@vtex/shoreline-utils'

export const DateSegment = forwardRef<HTMLDivElement, DateSegmentProps>(
  function DateSegment(props, forwardedRef) {
    const { segment, state } = props
    const ref = React.useRef(null)
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
  segment: SegmentType
  state: DateFieldState
}
