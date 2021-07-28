import React from 'react'
import type { Meta, Story } from '@storybook/react'

import type { AvatarProps } from './index'
import { Avatar } from './index'
import { Set } from '../Set'

export default {
  title: 'admin-ui/Avatar',
  component: Avatar,
} as Meta

export const Playground: Story<AvatarProps> = (args) => {
  return <Avatar {...args} />
}

Playground.args = {
  label: 'base',
}

export const Basic = () => {
  return (
    <Set>
      <Avatar label="base" />
      <Avatar label="primary" palette="primary" />
      <Avatar label="danger" palette="danger" />
    </Set>
  )
}
