import React from 'react'
import { Meta, Story } from '@storybook/react'

import { Avatar, AvatarProps } from './index'
import { Box } from '../Box'

export default {
  title: 'beta/Avatar',
  component: Avatar,
} as Meta

export const Basic: Story<AvatarProps> = () => {
  return (
    <Box display="flex" w="15" justify="around">
      <Avatar label="base" />
      <Avatar label="primary" palette="primary" />
      <Avatar label="danger" palette="danger" />
      <Avatar label="success" palette="success" />
    </Box>
  )
}
