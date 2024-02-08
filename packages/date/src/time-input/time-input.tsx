import type { Ref } from 'react'
import React, { useCallback, useMemo } from 'react'
import type { AriaTimeFieldProps, TimeValue } from '@react-aria/datepicker'
import { useTimeField } from '@react-aria/datepicker'
import type { SegmentType } from '@react-stately/datepicker'
import { useTimeFieldState } from '@react-stately/datepicker'
import { useMergeRef, forwardRef, useStore } from '@vtex/shoreline-utils'
import {
  useLocale,
  useFieldContext,
  IconButton,
  Bleed,
} from '@vtex/shoreline-components'

import { DateSegment } from '../date-segment'
import { IconXCircle } from '@vtex/shoreline-icons'

/**
 * Allow users to select a time in a segmented field
 * @kind date
 * @example
 * <TimeInput />
 */
export const TimeInput = forwardRef(function TimeInput<T extends TimeValue>(
  props: TimeInputProps<T>,
  forwardedRef: Ref<HTMLDivElement>
) {
  const { className, id: defaultId, error: defaultError, ...domProps } = props

  const store = useFieldContext()
  const { id: contextId, error: contextError } = useStore(store, (s) => s)

  const id = defaultId || contextId
  const error = defaultError || contextError

  const locale = useLocale()
  const state = useTimeFieldState({
    ...domProps,
    locale,
  })

  const ref = React.useRef<HTMLDivElement>(null)
  const { fieldProps } = useTimeField(
    {
      id,
      ...domProps,
    },
    state,
    ref
  )

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
    <div
      data-sl-time-input
      data-disabled={fieldProps['aria-disabled']}
      data-error={error || state.isInvalid}
      className={className}
    >
      <div
        {...fieldProps}
        ref={useMergeRef(ref, forwardedRef)}
        data-sl-time-input-element
      >
        {state.segments.map((segment, i) => (
          <DateSegment key={i} segment={segment} state={state} />
        ))}
      </div>
      {showClearButton && (
        <Bleed end="$space-2">
          <IconButton onClick={clear} variant="tertiary" label="Clear">
            <IconXCircle />
          </IconButton>
        </Bleed>
      )}
    </div>
  )
})

export interface TimeInputProps<T extends TimeValue>
  extends Omit<AriaTimeFieldProps<T>, 'locale' | 'label'> {
  /**
   * Custom className
   */
  className?: string
  /**
   * Wether has error
   */
  error?: boolean
}
