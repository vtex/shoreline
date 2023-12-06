import type { Ref } from 'react'
import React from 'react'
import type { AriaDateFieldProps } from '@react-aria/datepicker'
import { useDateField } from '@react-aria/datepicker'
import { useDateFieldState } from '@react-stately/datepicker'
import { useMergeRef, forwardRef } from '@vtex/shoreline-utils'
import { VisuallyHidden, useLocale } from '@vtex/shoreline-components'

import { DateSegment } from '../date-segment'
import { createCalendar } from '../utils'
import type { DateValue } from '../utils'
import './date-input.css'

/**
 * A list of date-segments
 * @example
 * <DateInput />
 */
export const DateInput = forwardRef(function DateField<T extends DateValue>(
  props: DateInputProps<T>,
  forwardedRef: Ref<HTMLDivElement>
) {
  const { granularity = 'day', hourCycle = 24, onChange, className } = props

  const locale = useLocale()
  const state = useDateFieldState({
    ...props,
    onChange,
    granularity,
    hourCycle,
    locale,
    createCalendar,
  })

  const ref = React.useRef<HTMLDivElement>(null)
  const { labelProps, fieldProps } = useDateField(props, state, ref)

  return (
    <div data-sl-date-input className={className}>
      <VisuallyHidden>
        <label {...labelProps} />
      </VisuallyHidden>
      <div
        {...fieldProps}
        ref={useMergeRef(ref, forwardedRef)}
        data-sl-date-segment-list
      >
        {state.segments.map((segment, i) => (
          <DateSegment key={i} segment={segment} state={state} />
        ))}
      </div>
    </div>
  )
})

export interface DateInputProps<T extends DateValue>
  extends AriaDateFieldProps<T> {
  className?: string
}
