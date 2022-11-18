import React, { useRef } from 'react'
import { useDateSegment } from 'react-aria'
import type {
  DateSegment as DataSegmentType,
  DateFieldState,
} from 'react-stately'

interface DateSegmentProps {
  segment: DataSegmentType
  state: DateFieldState
}

export function DateSegment(props: DateSegmentProps) {
  const { segment, state } = props
  const ref = useRef<HTMLDivElement>(null)
  const { segmentProps } = useDateSegment(segment, state, ref)

  return (
    <div
      {...segmentProps}
      ref={ref}
      className={`segment ${segment.isPlaceholder ? 'placeholder' : ''}`}
    >
      {segment.text}
    </div>
  )
}
