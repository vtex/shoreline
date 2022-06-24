import React, { useState } from 'react'
import type { Meta } from '@storybook/react'
import { Popover, PopoverDisclosure, usePopoverState } from 'ariakit'

import { Calendar, useCalendarState } from '../index'
import { Button } from '../../button'
import { AdminUIDate } from '../utils'
import { I18nProvider } from '../../i18n'
import { Box } from '../../box'
import { ClassName } from '@vtex/admin-ui-react'

export default {
  title: 'admin-ui-review/calendar',
  decorators: [
    (Story) => (
      <Box
        csx={{
          margin: '$xl',
        }}
      >
        <Story />
      </Box>
    ),
  ],
} as Meta

export function Basic() {
  const state = useCalendarState()

  return <Calendar state={state} />
}

export function ControlledState() {
  const [value, setValue] = useState(new AdminUIDate(new Date()))
  const calendar = useCalendarState({
    value,
    onChange: (d) => setValue(d),
  })

  return <Calendar state={calendar} />
}

export function MinMaxDates() {
  const state = useCalendarState({
    minValue: new AdminUIDate({
      year: 2022,
      month: 2,
      day: 25,
    }),
    maxValue: new AdminUIDate({
      year: 2030,
      month: 1,
      day: 1,
    }),
  })

  return <Calendar state={state} />
}

export function PopoverBox() {
  const calendar = useCalendarState()
  const popover = usePopoverState({
    gutter: 4,
    placement: 'bottom-start',
  })

  return (
    <>
      <PopoverDisclosure state={popover} as={Button} variant="tertiary">
        Pick a date
      </PopoverDisclosure>
      <ClassName
        csx={{
          bg: '$primary',
          boxShadow: '$overlay.center',
          border: '$neutral',
          borderRadius: '$default',
        }}
      >
        {(className) => (
          <Popover className={className} state={popover}>
            <Calendar state={calendar} />
          </Popover>
        )}
      </ClassName>
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
