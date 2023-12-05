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
} from '@vtex/shoreline-components'

import { Calendar } from '../calendar'
import { DateField } from '../date-field'
import { IconCalendarBlank } from '@vtex/shoreline-icons'
import type { DateValue } from '@react-aria/calendar'

/**
 * Allow users to pick a date
 * @example
 * <DatePicker />
 */
export function DatePicker<T extends DateValue>(props: DatePickerProps<T>) {
  const state = useDatePickerState(props)
  const ref = useRef(null)
  const { groupProps, labelProps, fieldProps, buttonProps, calendarProps } =
    useDatePicker(props, state, ref)

  const anchorRef = useRef<HTMLDivElement>(null)

  return (
    <PopoverProvider
      open={state.isOpen}
      setOpen={state.setOpen}
      placement="bottom-start"
    >
      <div
        ref={anchorRef}
        style={{ display: 'inline-flex', flexDirection: 'column' }}
      >
        <div {...labelProps}>{props.label}</div>
        <div {...groupProps} ref={ref} style={{ display: 'flex' }}>
          <DateField
            {...fieldProps}
            suffix={
              <Bleed vertical="$space-3" horizontal="$space-4">
                <PopoverTrigger asChild>
                  <IconButton
                    id={buttonProps.id}
                    label={buttonProps['aria-label']}
                    aria-describedby={buttonProps['aria-describedby']}
                    size="large"
                    variant="tertiary"
                    style={{
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                  >
                    <IconCalendarBlank />
                  </IconButton>
                </PopoverTrigger>
              </Bleed>
            }
          />
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

export type DatePickerProps<T extends DateValue> = AriaDatePickerProps<T>
