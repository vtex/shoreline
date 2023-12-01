import type { Dispatch, SetStateAction } from 'react'
import React, { forwardRef } from 'react'
import { useDateField } from '@react-aria/datepicker'
import { useDateFieldState } from '@react-stately/datepicker'
import type {
  CalendarDate,
  ZonedDateTime,
  DateValue,
  CalendarDateTime,
} from '@internationalized/date'
import { createCalendar } from '@internationalized/date'
import { useMergeRef } from '@vtex/shoreline-utils'
import { Field, FieldLabel } from '@vtex/shoreline-components'

import { DateSegment } from '../date-segment'
import './date-field.css'

/**
 * Allow users to select a date in a segmented field
 * @example
 * <DateField label="Date" />
 */
export const DateField = forwardRef<HTMLDivElement, DateFieldProps>(
  function DateField(props, forwardedRef) {
    const {
      granularity = 'day',
      hourCycle = 24,
      locale = 'en-US',
      onChange,
      className,
    } = props

    const state = useDateFieldState({
      ...props,
      onChange: onChange as Dispatch<SetStateAction<DateValue>>,
      granularity,
      hourCycle,
      locale,
      createCalendar,
    })

    const ref = React.useRef<HTMLDivElement>(null)
    const { labelProps, fieldProps } = useDateField(props, state, ref)

    return (
      <Field data-sl-date-field className={className}>
        <FieldLabel {...labelProps}>{props.label}</FieldLabel>
        <div
          {...fieldProps}
          ref={useMergeRef(ref, forwardedRef)}
          data-sl-date-field-input
        >
          {state.segments.map((segment, i) => (
            <DateSegment key={i} segment={segment} state={state} />
          ))}
          {state.isInvalid && <span aria-hidden="true">🚫</span>}
        </div>
      </Field>
    )
  }
)

export interface DateFieldProps {
  /**
   * Custom className
   */
  className?: string
  /**
   * Granularity of the filed
   * @default 'day'
   */
  granularity?: 'day' | 'hour' | 'minute' | 'second'
  /**
   * Hour cycle
   * @default 24
   */
  hourCycle?: 12 | 24
  /**
   * Field label
   */
  label?: string
  /**
   * Field locale
   * @default 'en-US'
   */
  locale?: string
  /**
   * Wheter has error
   * @default false
   */
  error?: boolean
  /**
   * Field value
   */
  value?: DateValue
  /**
   * Minimal date allowed
   */
  minValue?: DateValue
  /**
   * Maximun date allowed
   */
  maxValue?: DateValue
  /**
   * Callback after value changes
   */
  onChange?:
    | Dispatch<SetStateAction<CalendarDate>>
    | Dispatch<SetStateAction<ZonedDateTime>>
    | Dispatch<SetStateAction<CalendarDateTime>>
  /**
   * Default field value
   */
  defaultValue?: DateValue
}
