import React from 'react'
import type { Meta } from '@storybook/react'

import { Calendar, useCalendarState } from '../index'

export default {
  title: 'admin-ui/Calendar',
} as Meta

export function Basic() {
  const state = useCalendarState()

  return <Calendar state={state} />
}
