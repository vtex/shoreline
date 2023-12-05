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
          <DateField {...(fieldProps as any)} />
          <PopoverTrigger asChild>
            <IconButton
              id={buttonProps.id}
              label={buttonProps['aria-label']}
              aria-describedby={buttonProps['aria-describedby']}
              size="large"
              variant="tertiary"
            >
              <IconCalendarBlank />
            </IconButton>
          </PopoverTrigger>
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
        <Calendar {...(calendarProps as any)} />
      </Popover>
    </PopoverProvider>
  )
}
