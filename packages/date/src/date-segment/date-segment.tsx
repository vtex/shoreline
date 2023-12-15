import * as React from 'react'
import { useDateSegment } from '@react-aria/datepicker'
import type {
  DateSegment as Segment,
  DateFieldState,
} from '@react-stately/datepicker'
import { useMergeRef } from '@vtex/shoreline-utils'

import './date-segment.css'

/**
 * Segment of a DateField
 */
export const DateSegment = React.forwardRef<HTMLDivElement, DateSegmentProps>(
  function DateSegment(props, forwardedRef) {
    const { segment, state } = props

    const ref = React.useRef<HTMLDivElement>(null)
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
  segment: Segment
  /**
   * State of a Datefield
   */
  state: DateFieldState
}
