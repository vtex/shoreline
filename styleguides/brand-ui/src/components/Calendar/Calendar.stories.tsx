import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Calendar, CalendarProps } from '.'

export default {
  title: 'beta/Calendar',
  argTypes: {
    locale: {
      control: {
        type: 'select',
        options: ['pt', 'en', 'fr', 'es'],
      },
    },
    month: {
      control: {
        type: 'select',
        options: Array.from({ length: 12 }, (_, i) => i + 1),
      },
    },
  },
} as Meta

const Template: Story<CalendarProps> = (props) => <Calendar {...props} />

export const Playground = Template.bind({})
Playground.args = {
  day: 15,
  month: 3,
  year: 2020,
  disabled: false,
  locale: 'en',
}
