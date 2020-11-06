import React from 'react'
import { Meta } from '@storybook/react'
import { Box } from 'theme-ui'

import { Timeline } from './index'

export default {
  title: 'beta/Timeline',
  component: Timeline,
} as Meta

export const SimpleUsage = () => {
  return (
    <Box sx={{ maxWidth: ['100%', '70%', '50%'] }}>
      <Timeline>
        <Timeline.Event
          title="Event 1"
          subtitle="Some description about the event"
        />
        <Timeline.Event
          title="Event 2"
          subtitle="Some description about the event"
        />
        <Timeline.Event
          title="Event 3"
          subtitle="Some description about the event"
        />
      </Timeline>
    </Box>
  )
}

const Icon = () => (
  <Box sx={{ width: '20px', height: '20px' }}>
    <Box
      sx={{ backgroundColor: 'warning.base', width: '100%', height: '100%' }}
    />
  </Box>
)

export const Customized = () => {
  return (
    <Box sx={{ maxWidth: ['100%', '70%', '50%'] }}>
      <Timeline>
        <Timeline.Event
          title="Event 1"
          subtitle="Some description about the event"
          icon={<Icon />}
        />
        <Timeline.Event
          title="Event 2"
          subtitle="Some description about the event"
          icon={<Icon />}
        />
        <Timeline.Event
          title="Event 3"
          subtitle="Some description about the event"
          icon={<Icon />}
        />
      </Timeline>
    </Box>
  )
}

export const Nested = () => {
  return (
    <Box sx={{ maxWidth: ['100%', '70%', '50%'] }}>
      <Timeline>
        <Timeline.Event title="Event 1">
          <Timeline>
            <Timeline.Event
              title="Event Nested 1"
              subtitle="Some description about the event"
            />
            <Timeline.Event
              title="Event Nested 2"
              subtitle="Some description about the event"
            />
            <Timeline.Event
              title="Event Nested 3"
              subtitle="Some description about the event"
            />
          </Timeline>
        </Timeline.Event>
        <Timeline.Event
          title="Event 2"
          subtitle="Some description about the event"
        />
        <Timeline.Event
          title="Event 3"
          subtitle="Some description about the event"
        />
      </Timeline>
    </Box>
  )
}
