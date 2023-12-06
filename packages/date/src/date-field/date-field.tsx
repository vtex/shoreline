import type { Dispatch, ReactNode, SetStateAction } from 'react'
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
import {
  Field,
  FieldLabel,
  FieldMessage,
  useLocale,
} from '@vtex/shoreline-components'

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
      onChange,
      className,
      prefix,
      suffix,
      helpText,
      error,
      errorText,
      optional,
    } = props

    const locale = useLocale()
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
        <FieldLabel optional={optional} {...labelProps}>
          {props.label}
        </FieldLabel>
        <div
          data-sl-date-input-container
          data-disabled={fieldProps['aria-disabled']}
          data-error={state.isInvalid}
        >
          {prefix && (
            <div data-sl-date-input-term data-type="prefix">
              {prefix}
            </div>
          )}
          <div
            {...fieldProps}
            ref={useMergeRef(ref, forwardedRef)}
            data-sl-date-input
          >
            {state.segments.map((segment, i) => (
              <DateSegment key={i} segment={segment} state={state} />
            ))}
          </div>
          {suffix && (
            <div data-sl-date-input-term data-type="suffix">
              {suffix}
            </div>
          )}
        </div>
        <FieldMessage
          helpText={helpText}
          errorText={errorText}
          error={error || state.isInvalid}
        />
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
  label?: ReactNode
  /**
   * Wheter has error
   * @default false
   */
  error?: boolean
  /**
   * Field value
   */
  value?: DateValue | null
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
    | ((value: DateValue) => void)
    | ((value: CalendarDate) => void)
    | ((value: CalendarDateTime) => void)
    | ((value: ZonedDateTime) => void)

  /**
   * Default field value
   */
  defaultValue?: DateValue | null
  /**
   * Node added before input space
   */
  prefix?: ReactNode
  /**
   * Node added before input space
   */
  suffix?: ReactNode
  /**
   * Error message
   */
  errorText?: string
  /**
   * Help message
   */
  helpText?: string
  /**
   * Wether the field is optional
   */
  optional?: boolean
}
