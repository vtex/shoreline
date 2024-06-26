import type { Ref } from 'react'
import React from 'react'
import type { AriaDateFieldProps } from '@react-aria/datepicker'
import { useDateField } from '@react-aria/datepicker'
import { useDateFieldState } from '@react-stately/datepicker'
import { useMergeRef, forwardRef } from '@vtex/shoreline-utils'
import { useLocale } from '../locale'
import { VisuallyHidden } from '../visually-hidden'

import { DateSegment } from '../date-segment'
import { createCalendar } from '../utils'
import type { DateValue } from '../utils'

/**
 * A list of date-segments used as base for date-picker and date-range-picker
 * @status stable
 * @example
 * <DateField />
 */
export const DateField = forwardRef(function DateField<T extends DateValue>(
  props: DateFieldProps<T>,
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
    <div data-sl-date-field className={className}>
      <VisuallyHidden>
        <label {...labelProps} />
      </VisuallyHidden>
      <div
        {...fieldProps}
        ref={useMergeRef(ref, forwardedRef)}
        data-sl-date-field-segment-list
      >
        {state.segments.map((segment, i) => (
          <DateSegment key={i} segment={segment} state={state} />
        ))}
      </div>
    </div>
  )
})

export interface DateFieldOptions<T extends DateValue>
  extends AriaDateFieldProps<T> {
  /**
   * Custom className
   */
  className?: string
}

export type DateFieldProps<T extends DateValue> = DateFieldOptions<T>
