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
      <Avatar label="lightBlue" />
      <Avatar label="green" palette="green" />
      <Avatar label="orange" palette="orange" />
      <Avatar label="cyan" palette="cyan" />
      <Avatar label="purple" palette="purple" />
      <Avatar label="teal" palette="teal" />
      <Avatar label="gray" palette="gray" />
    </Set>
  )
}
