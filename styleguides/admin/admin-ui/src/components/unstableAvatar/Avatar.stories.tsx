import React from 'react'
import { Meta, Story } from '@storybook/react'

import { unstableAvatar as Avatar, AvatarProps } from './index'
import { unstableThemeProvider as ThemeProvider } from '../unstableThemeProvider'
import { unstableSet as Set } from '../unstableSet'

export default {
  title: 'system-next/avatar',
  component: Avatar,
} as Meta

export const Basic: Story<AvatarProps> = () => {
  return (
    <ThemeProvider>
      <Set>
        <Avatar label="base" />
        <Avatar label="primary" palette="primary" />
        <Avatar label="danger" palette="danger" />
      </Set>
    </ThemeProvider>
  )
}
