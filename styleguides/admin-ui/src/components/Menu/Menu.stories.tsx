import React, { Fragment } from 'react'
import { Meta, Story } from '@storybook/react'

import {
  Menu,
  MenuProps,
  StatelessMenu,
  StatelessMenuProps,
  useMenuState,
} from './index'
import { IconFavorite, IconLink, IconDownload, IconDelete } from '../../icons'
import { MenuDisclosure } from './Stateless'
import { ActionButton } from './ActionButton'

export default {
  title: 'alpha/Menu',
  component: Menu,
} as Meta

export const Stateful: Story<MenuProps> = () => (
  <Menu
    hideOnClick
    aria-label="menu label"
    disclosure={<ActionButton display="menu" />}
  >
    <Menu.Item icon={<IconDownload />}>Download</Menu.Item>
    <Menu.Item icon={<IconLink />}>Link to</Menu.Item>
    <Menu.Item icon={<IconFavorite />}>Favorite</Menu.Item>
    <Menu.Separator />
    <Menu.Item icon={<IconDelete />}>Delete</Menu.Item>
  </Menu>
)

Stateful.parameters = {
  playroom: {
    code: `
    <Menu
    aria-label="menu label"
    disclosure={<ActionButton display="menu" />}
  >
    <Menu.Item icon={<IconDownload />}>Download</Menu.Item>
    <Menu.Item icon={<IconLink />}>Link to</Menu.Item>
    <Menu.Item icon={<IconFavorite />}>Favorite</Menu.Item>
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
      <MenuDisclosure {...state}>
        <ActionButton variant="subtle">Post options</ActionButton>
      </MenuDisclosure>
      <StatelessMenu aria-label="actions" state={state}>
        <StatelessMenu.Item icon={<IconDownload />}>
          Download
        </StatelessMenu.Item>
        <StatelessMenu.Item icon={<IconLink />}>Link to</StatelessMenu.Item>
        <StatelessMenu.Item icon={<IconFavorite />}>
          Favorite
        </StatelessMenu.Item>
        <StatelessMenu.Separator />
        <StatelessMenu.Item icon={<IconDelete />}>Delete</StatelessMenu.Item>
      </StatelessMenu>
    </Fragment>
  )
}

Stateless.parameters = {
  playroom: {
    code: `
<Play.MenuState>
  {(state) => (
    <>
    <MenuDisclosure {...state}>
      <ActionButton variant="subtle">Post options</ActionButton>
    </MenuDisclosure>
    <StatelessMenu aria-label="actions" state={state}>
      <StatelessMenu.Item icon={<IconDownload />}>Download</StatelessMenu.Item>
      <StatelessMenu.Item icon={<IconLink />}>Link to</StatelessMenu.Item>
      <StatelessMenu.Item icon={<IconFavorite />}>Favorite</StatelessMenu.Item>
      <StatelessMenu.Separator />
      <StatelessMenu.Item icon={<IconDelete />}>Delete</StatelessMenu.Item>
    </StatelessMenu>
  </>
  )}
</Play.MenuState>
    `,
  },
}
