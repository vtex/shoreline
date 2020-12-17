import React from 'react'
import { Meta, Story } from '@storybook/react'

import { Avatar, AvatarProps } from './index'
import { Set } from '../Set'

export default {
  title: 'components/Avatar',
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
