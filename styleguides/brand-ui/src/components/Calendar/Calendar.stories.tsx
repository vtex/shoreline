/** @jsx jsx */
import { PropsWithChildren } from 'react'
import { Story, Meta } from '@storybook/react'
import { Box, jsx } from 'theme-ui'

import { Calendar, CalendarProps, DayProps, Events } from '.'
import events from './mockEvents'
import { Popover } from '../Popover'

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

export const WithBottomSection = () => (
  <Calendar month={3} events={events}>
    <Box sx={{ width: '100%', textAlign: 'center' }}>98.7% Uptime</Box>
  </Calendar>
)

const CustomComponent = ({
  children,
  variant,
  value,
  onClick,
  ...restProps
}: PropsWithChildren<DayProps>) => {
  return (
    <Popover
      disclosure={
        <button sx={{ variant }} {...restProps}>
          {children}
        </button>
      }
      showClose
    >
      <Popover.Content>{value.toFormat('dd MMMM yyyy')}</Popover.Content>
    </Popover>
  )
}

const eventsWithCustomComponent: Events = {
  '2020-03-12': {
    name: 'Collections and Checkout are having some instabilities',
    colors: ['#FF4C4C'],
    component: CustomComponent,
  },
  '2020-03-30': {
    name: 'Collections and Checkout are having some instabilities',
    component: CustomComponent,
  },
}

export const WithCustomComponent = () => (
  <Calendar month={3} events={eventsWithCustomComponent} locale="en" />
)
