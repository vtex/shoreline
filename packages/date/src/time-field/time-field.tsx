import type { ReactNode, Ref } from 'react'
import React from 'react'
import type { AriaTimeFieldProps, TimeValue } from '@react-aria/datepicker'
import { useTimeField } from '@react-aria/datepicker'
import { useTimeFieldState } from '@react-stately/datepicker'
import { useMergeRef, forwardRef } from '@vtex/shoreline-utils'
import {
  Field,
  FieldLabel,
  FieldMessage,
  useLocale,
} from '@vtex/shoreline-components'

import { DateSegment } from '../date-segment'
import './time-field.css'

/**
 * Allow users to select a time in a segmented field
 * @example
 * <TimeField label="Time" />
 */
export const TimeField = forwardRef(function TimeField<T extends TimeValue>(
  props: TimeFieldProps<T>,
  forwardedRef: Ref<HTMLDivElement>
) {
  const { className, prefix, suffix, helpText, error, errorText, optional } =
    props

  const locale = useLocale()
  const state = useTimeFieldState({
    ...props,
    locale,
  })

  const ref = React.useRef<HTMLDivElement>(null)
  const { labelProps, fieldProps } = useTimeField(props, state, ref)

  return (
    <Field data-sl-time-field className={className}>
      <FieldLabel optional={optional} {...labelProps}>
        {props.label}
      </FieldLabel>
      <div
        data-sl-time-input-container
        data-disabled={fieldProps['aria-disabled']}
        data-error={state.isInvalid}
      >
        {prefix && (
          <div data-sl-time-input-term data-type="prefix">
            {prefix}
          </div>
        )}
        <div
          {...fieldProps}
          ref={useMergeRef(ref, forwardedRef)}
          data-sl-time-input
        >
          {state.segments.map((segment, i) => (
            <DateSegment key={i} segment={segment} state={state} />
          ))}
        </div>
        {suffix && (
          <div data-sl-time-input-term data-type="suffix">
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
})

export interface TimeFieldProps<T extends TimeValue>
  extends Omit<AriaTimeFieldProps<T>, 'locale'> {
  /**
   * Custom className
   */
  className?: string
  /**
   * Wether has error
   */
  error?: boolean
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
