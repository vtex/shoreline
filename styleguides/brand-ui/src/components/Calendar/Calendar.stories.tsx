import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Box } from 'theme-ui'

import { Calendar, CalendarProps } from '.'
import events from './mockEvents'

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

const Template: Story<CalendarProps> = (props) => (
  <Calendar events={events} {...props} />
)

export const Playground = Template.bind({})
Playground.args = {
  day: 15,
  month: 3,
  year: 2020,
  disabled: false,
  locale: 'en',
}

export const BottomSection = () => (
  <Calendar month={3} events={events}>
    <Box sx={{ width: '100%', textAlign: 'center' }}>98.7% Uptime</Box>
  </Calendar>
)
