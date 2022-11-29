import React, { useRef } from 'react'
import { useDateSegment } from 'react-aria'
import type {
  DateSegment as DataSegmentType,
  DateFieldState,
} from 'react-stately'
import { cx } from '@vtex/admin-ui'

import { dateSegmentTheme } from './date-field.css'

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
      className={cx(
        `segment ${segment.isPlaceholder ? 'placeholder' : ''}`,
        dateSegmentTheme
      )}
      data-is-placeholder={segment.isPlaceholder}
    >
      {segment.text}
    </div>
  )
}
