import React, { useState } from 'react'
import type { Meta } from '@storybook/react'

import { Calendar, useCalendarState } from '../index'
import {
  Picker,
  PickerDisclosure,
  PickerPopover,
  usePickerState,
} from '../../picker'
import { Button } from '../../button'
import { getDateObject } from '../utils'
import { I18nProvider } from '../../i18n'

export default {
  title: 'admin-ui/Calendar',
} as Meta

export function Basic() {
  const state = useCalendarState()

  return <Calendar state={state} />
}

export function ControlledState() {
  const [value, setValue] = useState(getDateObject())
  const calendar = useCalendarState({
    value,
    onChange: (d) => setValue(d),
  })

  return <Calendar state={calendar} />
}

export function MinMaxDates() {
  const state = useCalendarState({
    minValue: {
      year: 2022,
      month: 2,
      day: 25,
    },
  })

  return <Calendar state={state} />
}

export function PopoverBox() {
  const calendar = useCalendarState()
  const picker = usePickerState()

  return (
    <>
      <Picker state={picker}>
        <PickerDisclosure state={picker}>
          <Button>open</Button>
        </PickerDisclosure>
      </Picker>
      <PickerPopover state={picker}>
        <Calendar state={calendar} />
      </PickerPopover>
    </>
  )
}

export function I18n() {
  return (
    <I18nProvider locale="ja-JP">
      <Basic />
    </I18nProvider>
  )
}
