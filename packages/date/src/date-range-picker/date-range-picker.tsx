import React, { useRef } from 'react'
import type { AriaDateRangePickerProps } from '@react-aria/datepicker'
import { useDateRangePicker } from '@react-aria/datepicker'
import { useDateRangePickerState } from '@react-stately/datepicker'
import {
  Bleed,
  IconButton,
  Popover,
  PopoverProvider,
  PopoverTrigger,
  useFieldContext,
} from '@vtex/shoreline-components'
import type { DateValue } from '@react-aria/calendar'
import { IconCalendarBlank, IconMinusSmall } from '@vtex/shoreline-icons'

import { RangeCalendar } from '../range-calendar'

import { DateField } from '../date-field'
import { useStore } from '@vtex/shoreline-utils'

/**
 * Allow users to pick a date range
 * @example
 * <DateRangePicker />
 */
export function DateRangePicker<T extends DateValue>(
  props: DateRangePickerProps<T>
) {
  const { className, id: defaultId, error: defaultError, ...domProps } = props
  const state = useDateRangePickerState(domProps)
  const ref = useRef(null)
  const anchorRef = useRef<HTMLDivElement>(null)
  const {
    groupProps,
    labelProps,
    startFieldProps,
    endFieldProps,
    buttonProps,
    calendarProps,
  } = useDateRangePicker(domProps, state, ref)

  const store = useFieldContext()
  const { id: contextId, error: contextError } = useStore(store, (s) => s)

  const id = defaultId || contextId
  const error = defaultError || contextError

  return (
    <PopoverProvider
      open={state.isOpen}
      setOpen={state.setOpen}
      placement="bottom-start"
    >
      <div ref={anchorRef} data-sl-date-range-picker>
        <div {...labelProps} />
        <div
          id={id}
          data-sl-date-range-picker-input
          {...groupProps}
          ref={ref}
          data-error={error}
        >
          <div data-sl-date-range-picker-field-group>
            <DateField {...startFieldProps} />
            <IconMinusSmall />
            <DateField {...endFieldProps} />
          </div>
          <Bleed end="$space-2">
            <PopoverTrigger asChild>
              <IconButton
                id={buttonProps.id}
                label={buttonProps['aria-label']}
                aria-describedby={buttonProps['aria-describedby']}
                variant="tertiary"
                data-sl-date-range-picker-icon-button
              >
                <IconCalendarBlank />
              </IconButton>
            </PopoverTrigger>
          </Bleed>
        </div>
      </div>
      <Popover
        getAnchorRect={() => {
          if (anchorRef && anchorRef.current) {
            return anchorRef.current.getBoundingClientRect()
          }

          return null
        }}
      >
        <RangeCalendar {...calendarProps} />
      </Popover>
    </PopoverProvider>
  )
}

export type DateRangePickerProps<T extends DateValue> = Omit<
  AriaDateRangePickerProps<T>,
  'label'
> & {
  /**
   * Custom className
   */
  className?: string
  /**
   * Wether has error
   */
  error?: boolean
}
