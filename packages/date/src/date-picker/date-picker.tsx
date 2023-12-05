import type { ComponentPropsWithoutRef, MouseEventHandler } from 'react'
import React, { useRef } from 'react'
import { useDatePicker } from '@react-aria/datepicker'
import { useDatePickerState } from '@react-stately/datepicker'

import { Calendar } from '../calendar'
import { DateField } from '../date-field'
import type { AriaButtonProps } from '@react-aria/button'

export function DatePicker(props: any) {
  const state = useDatePickerState(props)
  const ref = useRef(null)
  const {
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
  } = useDatePicker(props, state, ref)

  console.log({
    buttonProps,
  })

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
      <div {...labelProps}>{props.label}</div>
      <div {...groupProps} ref={ref} style={{ display: 'flex' }}>
        <DateField {...(fieldProps as any)} />
        <button {...mapToHTMLProps(buttonProps)}>🗓</button>
      </div>
      {state.isOpen && (
        <div>
          "popover"
          <div {...dialogProps}>
            <Calendar {...(calendarProps as any)} />
          </div>
        </div>
      )}
    </div>
  )
}

function mapToHTMLProps(
  ariaProps: AriaButtonProps
): ComponentPropsWithoutRef<'button'> {
  return {
    ...ariaProps,
    onClick:
      ariaProps.onPress as unknown as MouseEventHandler<HTMLButtonElement>,
  }
}
