import type { ReactNode, Ref } from 'react'
import React, { useCallback, useMemo } from 'react'
import type { AriaDateFieldProps } from '@react-aria/datepicker'
import { useDateField } from '@react-aria/datepicker'
import type { SegmentType } from '@react-stately/datepicker'
import { useDateFieldState } from '@react-stately/datepicker'
import type { DateValue } from '@internationalized/date'
import { createCalendar } from '@internationalized/date'
import { useMergeRef, forwardRef } from '@vtex/shoreline-utils'
import {
  Field,
  FieldLabel,
  FieldMessage,
  IconButton,
  Slot,
  Stack,
  useLocale,
} from '@vtex/shoreline-components'
import { IconXCircle } from '@vtex/shoreline-icons'

import './date-field.css'
import { DateSegment } from '../date-segment'

/**
 * Allow users to select a date in a segmented field
 * @example
 * <DateField label="Date" />
 */
export const DateField = forwardRef(function DateField<T extends DateValue>(
  props: DateFieldProps<T>,
  forwardedRef: Ref<HTMLDivElement>
) {
  const { className, helpText, error, errorText, optional, endSlot } = props

  const locale = useLocale()
  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  })

  const ref = React.useRef<HTMLDivElement>(null)
  const { labelProps, fieldProps } = useDateField(props, state, ref)

  const clear = useCallback(() => {
    const types: SegmentType[] = [
      'era',
      'year',
      'month',
      'day',
      'hour',
      'minute',
      'second',
      'dayPeriod',
      'literal',
      'timeZoneName',
    ]

    // onChange(null)
    // state.setValue(null)

    // state.setValue(undefined)
    // state.updateValidation

    types.forEach((segment) => {
      state.clearSegment(segment)
    })
  }, [state.clearSegment])

  const showClearButton = useMemo(
    () =>
      state.segments.some((segment) => {
        return segment.isEditable && !segment.isPlaceholder
      }),
    [state.segments]
  )

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
        <div
          {...fieldProps}
          ref={useMergeRef(ref, forwardedRef)}
          data-sl-date-input
        >
          {state.segments.map((segment, i) => (
            <DateSegment key={i} segment={segment} state={state} />
          ))}
        </div>
        <Stack direction="row" space="$space-1">
          {showClearButton && (
            <IconButton onClick={clear} variant="tertiary" label="Clear">
              <IconXCircle />
            </IconButton>
          )}
          {endSlot && <Slot>{endSlot}</Slot>}
        </Stack>
      </div>
      <FieldMessage
        helpText={helpText}
        errorText={errorText}
        error={error || state.isInvalid}
      />
    </Field>
  )
})

export interface DateFieldProps<T extends DateValue>
  extends AriaDateFieldProps<T> {
  /**
   * Custom className
   */
  className?: string
  /**
   * Wheter has error
   * @default false
   */
  error?: boolean
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
  /**
   *
   */
  endSlot?: ReactNode
}
