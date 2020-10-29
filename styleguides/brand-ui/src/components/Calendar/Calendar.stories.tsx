import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Calendar, CalendarProps, Events } from '.'

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

const events: Events = {
  '2020-03-12': {
    name: 'Collections and Checkout are having some instabilities',
    colors: ['#3D5980'],
  },
  '2020-03-27': {
    name: 'Collections and Checkout are having some instabilities',
  },
  '2020-03-15': {
    name: 'Collections and Checkout are having some instabilities',
    colors: ['#FFB100', '#FF4C4C'],
  },
  '2020-03-17': {
    name: 'Collections and Checkout are having some instabilities',
    colors: ['#FFB100'],
  },
}

const Template: Story<CalendarProps> = (props) => {
  return <Calendar events={events} {...props} />
}

export const Playground = Template.bind({})
Playground.args = {
  day: 15,
  month: 3,
  year: 2020,
  disabled: false,
  locale: 'en',
}
