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
        <Timeline.Event title="Event 1">
          Some description about the event
        </Timeline.Event>
        <Timeline.Event title="Event 2">
          Some description about the event
        </Timeline.Event>
        <Timeline.Event title="Event 3">
          Some description about the event
        </Timeline.Event>
      </Timeline>
    </Box>
  )
}
