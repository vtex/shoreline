import React, { useRef } from 'react'
import { useDatePicker } from '@react-aria/datepicker'
import { useDatePickerState } from '@react-stately/datepicker'
import {
  IconButton,
  Popover,
  PopoverProvider,
  PopoverTrigger,
} from '@vtex/shoreline-components'

import { Calendar } from '../calendar'
import { DateField } from '../date-field'
import { IconCalendarBlank } from '@vtex/shoreline-icons'

export function DatePicker(props: any) {
  const state = useDatePickerState(props)
  const ref = useRef(null)
  const { groupProps, labelProps, fieldProps, buttonProps, calendarProps } =
    useDatePicker(props, state, ref)

  return (
    <PopoverProvider
      open={state.isOpen}
      setOpen={state.setOpen}
      placement="bottom-start"
    >
      <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
        <div {...labelProps}>{props.label}</div>
        <div {...groupProps} ref={ref} style={{ display: 'flex' }}>
          <DateField {...(fieldProps as any)} />
          <PopoverTrigger asChild>
            <IconButton
              id={buttonProps.id}
              label={buttonProps['aria-label']}
              aria-describedby={buttonProps['aria-describedby']}
            >
              <IconCalendarBlank />
            </IconButton>
          </PopoverTrigger>
        </div>
        <Popover>
          <Calendar {...(calendarProps as any)} />
        </Popover>
      </div>
    </PopoverProvider>
  )
}
