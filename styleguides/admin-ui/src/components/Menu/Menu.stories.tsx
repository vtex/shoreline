import React, { Fragment } from 'react'
import { Meta, Story } from '@storybook/react'

import { Menu, MenuProps } from './index'
import { StatelessMenu, StatelessMenuProps, useMenuState } from './Stateless'
import { Button } from '../Button'
import { IconCaret, IconFavorite, IconLink, IconDownload } from '../../icons'

export default {
  title: 'alpha/Menu',
  component: Menu,
} as Meta

export const Base: Story<MenuProps> = () => (
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

export const Stateless: Story<StatelessMenuProps> = () => {
  const state = useMenuState({
    orientation: 'vertical',
    loop: true,
    placement: 'bottom-start',
  })

  return (
    <Fragment>
      <Button onClick={() => state.show()}>Show</Button>
      <StatelessMenu
        aria-label="menu label"
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
        <Menu.Item icon={IconDownload}>Download</Menu.Item>
        <Menu.Item icon={IconLink}>Link to</Menu.Item>
        <Menu.Item icon={IconFavorite}>Favorite</Menu.Item>
      </StatelessMenu>
    </Fragment>
  )
}
