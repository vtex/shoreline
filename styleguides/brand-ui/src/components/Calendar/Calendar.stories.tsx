/** @jsxRuntime classic */
/** @jsx jsx */
import { PropsWithChildren } from 'react'
import { Story, Meta } from '@storybook/react'
import { Box, Flex, jsx, Text } from 'theme-ui'
import { Box as ReakitBox, Button } from 'reakit'

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

const IconArrow = () => (
  <ReakitBox
    as="svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    sx={{ transform: 'rotate(90deg)', color: '#80BE80', margin: 2 }}
  >
    <path
      d="M0.499779 7.5C0.499779 7.75781 0.583112 7.92969 0.749779 8.10156L5.49978 13L6.66644 11.7969L3.33311 8.35938L16 8.35938V6.64063L3.33311 6.64063L6.66644 3.20313L5.49978 2L0.749779 6.89844C0.583112 7.07031 0.499779 7.24219 0.499779 7.5Z"
      fill="currentColor"
    />
  </ReakitBox>
)

export const WithHeaderAccessory = () => (
  <Calendar
    month={3}
    events={events}
    headerAccessory={
      <Flex sx={{ alignItems: 'center' }}>
        <IconArrow /> <Text sx={{ opacity: 0.6 }}>99.98%</Text>
      </Flex>
    }
  />
)

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
        <Button sx={{ variant }} {...restProps}>
          {children}
        </Button>
      }
      showClose
      fixed
      placement="top"
    >
      <Popover.Content>{value.toFormat('dd MMMM yyyy')}</Popover.Content>
    </Popover>
  )
}

const eventsWithCustomComponent: Events = {
  '2020-03-12': {
    events: [
      {
        name: 'Collections and Checkout are having some instabilities',
      },
    ],
    colors: ['#FF4C4C'],
    component: CustomComponent,
  },
  '2020-03-30': {
    events: [
      {
        name: 'Collections and Checkout are having some instabilities',
      },
    ],
    component: CustomComponent,
  },
}

export const WithCustomComponent = () => (
  <Calendar month={3} events={eventsWithCustomComponent} locale="en" />
)
