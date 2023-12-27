import React, { useRef } from 'react'
import type { AriaDatePickerProps } from '@react-aria/datepicker'
import { useDatePicker } from '@react-aria/datepicker'
import { useDatePickerState } from '@react-stately/datepicker'
import {
  Bleed,
  Flex,
  IconButton,
  Popover,
  PopoverProvider,
  PopoverTrigger,
} from '@vtex/shoreline-components'
import type { DateValue } from '@react-aria/calendar'
import { IconCalendarBlank } from '@vtex/shoreline-icons'

import { Calendar } from '../calendar'
import { DateField } from '../date-field'
import './date-picker.css'

/**
 * Allow users to pick a date
 * @example
 * <DatePicker />
 */
export function DatePicker<T extends DateValue>(props: DatePickerProps<T>) {
  const state = useDatePickerState(props)
  const ref = useRef(null)
  const anchorRef = useRef<HTMLDivElement>(null)
  const { groupProps, labelProps, fieldProps, buttonProps, calendarProps } =
    useDatePicker(props, state, ref)

  return (
    <PopoverProvider
      open={state.isOpen}
      setOpen={state.setOpen}
      placement="bottom-start"
    >
      <div ref={anchorRef} data-sl-date-picker>
        <div {...labelProps}>{props.label}</div>
        <Flex {...groupProps} ref={ref}>
          <DateField
            {...fieldProps}
            suffix={
              <Bleed
                top="$space-3"
                bottom="$space-3"
                start="$space-4"
                end="$space-4"
              >
                <PopoverTrigger asChild>
                  <IconButton
                    id={buttonProps.id}
                    label={buttonProps['aria-label']}
                    aria-describedby={buttonProps['aria-describedby']}
                    size="large"
                    variant="tertiary"
                    data-sl-date-picker-icon-button
                  >
                    <IconCalendarBlank />
                  </IconButton>
                </PopoverTrigger>
              </Bleed>
            }
          />
        </Flex>
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

export type DatePickerProps<T extends DateValue> = AriaDatePickerProps<T>
