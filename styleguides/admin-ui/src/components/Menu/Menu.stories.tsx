import React from 'react'
import { Meta, Story } from '@storybook/react'

import {
  Menu,
  MenuProps,
  StatelessMenu,
  StatelessMenuProps,
  useMenuState,
} from './index'
import { Button } from '../Button'
import {
  IconCaret,
  IconFavorite,
  IconLink,
  IconDownload,
  IconDelete,
} from '../../icons'

export default {
  title: 'alpha/Menu',
  component: Menu,
} as Meta

export const Stateful: Story<MenuProps> = () => (
  <Menu
    hideOnClick
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
    <Menu.Separator />
    <Menu.Item icon={IconDelete}>Delete</Menu.Item>
  </Menu>
)

Stateful.parameters = {
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

export const Stateless: Story<StatelessMenuProps> = () => {
  const state = useMenuState({
    orientation: 'vertical',
    loop: true,
    placement: 'bottom-start',
  })

  return (
    <StatelessMenu
      aria-label="actions"
      state={state}
      disclosure={
        <Button
          icon={(props) => <IconCaret {...props} direction="down" />}
          iconPosition="end"
        >
          Action Menu
        </Button>
      }
    >
      <StatelessMenu.Item icon={IconDownload}>Download</StatelessMenu.Item>
      <StatelessMenu.Item icon={IconLink}>Link to</StatelessMenu.Item>
      <StatelessMenu.Item icon={IconFavorite}>Favorite</StatelessMenu.Item>
      <StatelessMenu.Separator />
      <StatelessMenu.Item icon={IconDelete}>Delete</StatelessMenu.Item>
    </StatelessMenu>
  )
}

Stateless.parameters = {
  playroom: {
    code: `
<Play.MenuState>
  {(state) => (
    <StatelessMenu
    aria-label="actions"
    state={state}
    disclosure={
      <Button
        icon={(props) => <IconCaret {...props} direction="down" />}
        iconPosition="end"
      >
        Action Menu
      </Button>
    }
  >
    <StatelessMenu.Item icon={IconDownload}>Download</StatelessMenu.Item>
    <StatelessMenu.Item icon={IconLink}>Link to</StatelessMenu.Item>
    <StatelessMenu.Item icon={IconFavorite}>Favorite</StatelessMenu.Item>
    <StatelessMenu.Separator />
    <StatelessMenu.Item icon={IconDelete}>Delete</StatelessMenu.Item>
  </StatelessMenu>
  )}
</Play.MenuState>
    `,
  },
}
