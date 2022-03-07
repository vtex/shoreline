import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StyleProp } from '@vtex/admin-ui-core'

import { PickerPopover } from '../picker'
import { Calendar } from '../calendar'
import type { DatePickerStateReturn } from './date-picker.state'

export const DatePickerCalendar = forwardRef(
  (props: DatePickerCalendarProps, ref: Ref<HTMLDivElement>) => {
    const {
      state: { pickerState, calendarState },
      csx = {},
    } = props

    return (
      <PickerPopover csx={csx} ref={ref} state={pickerState}>
        <Calendar state={calendarState} />
      </PickerPopover>
    )
  }
)

DatePickerCalendar.displayName = 'DatePickerCalendar'

export interface DatePickerCalendarProps {
  state: DatePickerStateReturn
  csx?: StyleProp
}
