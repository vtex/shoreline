import React, { useRef } from 'react'
import type { AriaDatePickerProps } from '@react-aria/datepicker'
import { useDatePicker } from '@react-aria/datepicker'
import { useDatePickerState } from '@react-stately/datepicker'
import {
  Bleed,
  IconButton,
  Popover,
  PopoverProvider,
  PopoverTrigger,
  VisuallyHidden,
  useFieldContext,
} from '@vtex/shoreline-components'
import type { DateValue } from '@react-aria/calendar'
import { IconCalendarBlank } from '@vtex/shoreline-icons'

import { Calendar } from '../calendar'
import { DateField } from '../date-field'
import { useStore } from '@vtex/shoreline-utils'

/**
 * Allow users to pick a date
 * @playground
 * @kind date
 * @example
 * <DatePicker />
 */
export function DatePicker<T extends DateValue>(props: DatePickerProps<T>) {
  const { className, id: defaultId, error: defaultError, ...domProps } = props
  const state = useDatePickerState(domProps)
  const ref = useRef(null)
  const anchorRef = useRef<HTMLDivElement>(null)
  const { groupProps, labelProps, fieldProps, buttonProps, calendarProps } =
    useDatePicker(domProps, state, ref)

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
      <div ref={anchorRef} data-sl-date-picker className={className}>
        <VisuallyHidden>
          <div {...labelProps} />
        </VisuallyHidden>
        <div
          {...groupProps}
          ref={ref}
          data-sl-date-picker-input
          data-error={error}
        >
          <DateField id={id} {...fieldProps} />
          <Bleed end="$space-2">
            <PopoverTrigger asChild>
              <IconButton
                id={buttonProps.id}
                label={buttonProps['aria-label']}
                aria-describedby={buttonProps['aria-describedby']}
                variant="tertiary"
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
        <Calendar {...calendarProps} />
      </Popover>
    </PopoverProvider>
  )
}

export type DatePickerProps<T extends DateValue> = Omit<
  AriaDatePickerProps<T>,
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
