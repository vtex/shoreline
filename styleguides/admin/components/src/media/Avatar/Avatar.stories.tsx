import React from 'react'
import { Meta, Story } from '@storybook/react'

import { Avatar, AvatarOwnProps } from './index'
import { onda } from '@vtex/admin-core'

export default {
  title: 'media/Avatar',
  component: Avatar,
} as Meta

export const Playground: Story<AvatarOwnProps> = (args) => {
  return <Avatar {...args} />
}

Playground.args = {
  label: 'base',
}

export const Basic = () => {
  return (
    <onda.div csx={{ 'div + div': { paddingLeft: 2 } }}>
      <Avatar label="base" />
      <Avatar label="primary" palette="primary" />
      <Avatar label="danger" palette="danger" />
    </onda.div>
  )
}
