/* eslint-disable no-alert */
import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Grid } from 'theme-ui'

import { HelloBar, HelloBarProps } from './index'
import { IconMock } from '../Button/IconMock'

export default {
  title: 'beta/HelloBar',
  component: HelloBar,
} as Meta

const Template: Story<HelloBarProps> = (args) => (
  <HelloBar {...args} icon={(props) => <IconMock {...props} />} />
)

export const Playground = Template.bind({})
Playground.args = {
  children:
    'Subscribe to get email notifications whenever VTEX creates, updates or resolves an incident.',
  action: {
    label: 'subscribe',
    onClick: () => alert('Subscribe'),
  },
}

export const Variations = () => (
  <Grid gap={5}>
    <HelloBar
      action={{
        label: 'subscribe',
        onClick: () => alert('Primary: Subscribe'),
      }}
    >
      Subscribe to get email notifications whenever VTEX creates, updates or
      resolves an incident.
    </HelloBar>
    <HelloBar
      variant="secondary"
      action={{
        label: 'subscribe',
        onClick: () => alert('Secondary: Subscribe'),
      }}
    >
      Subscribe to get email notifications whenever VTEX creates, updates or
      resolves an incident.
    </HelloBar>
    <HelloBar
      variant="tertiary"
      action={{
        label: 'subscribe',
        onClick: () => alert('Tertiary: Subscribe'),
      }}
    >
      Subscribe to get email notifications whenever VTEX creates, updates or
      resolves an incident.
    </HelloBar>
  </Grid>
)
