import React from 'react'
import { Meta, Story } from '@storybook/react'

import { Menu, MenuProps } from './index'
import { Button } from '../Button'
import { IconCaret, IconFavorite, IconLink, IconDownload } from '../../icons'

export default {
  title: 'alpha/Menu',
  component: Menu,
} as Meta

export const Base: Story<MenuProps> = () => (
  <Menu
    aria-label="menu label"
    disclosure={
      <Button
        icon={(props) => <IconCaret {...props} direction="down" />}
        iconPosition="end"
      >
        Action Menu
      </Button>
    }
  >
    <Menu.Item icon={IconDownload}>Download</Menu.Item>
    <Menu.Item icon={IconLink}>Link to</Menu.Item>
    <Menu.Item icon={IconFavorite}>Favorite</Menu.Item>
  </Menu>
)

Base.parameters = {
  playroom: {
    code: `
    <Menu
    aria-label="menu label"
    disclosure={
      <Button
        icon={(props) => <IconCaret {...props} direction="down" />}
        iconPosition="end"
      >
        Action Menu
      </Button>
    }
  >
    <Menu.Item icon={IconDownload}>Download</Menu.Item>
    <Menu.Item icon={IconLink}>Link to</Menu.Item>
    <Menu.Item icon={IconFavorite}>Favorite</Menu.Item>
  </Menu>
    `,
  },
}
