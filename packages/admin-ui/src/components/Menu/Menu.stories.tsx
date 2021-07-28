import React, { Fragment, useState } from 'react'
import type { Meta, Story } from '@storybook/react'
import {
  IconFavorite,
  IconLink,
  IconImport,
  IconDelete,
  IconShippingTruck,
} from '@vtex/admin-ui-icons'

import type { MenuProps } from './index'
import {
  Menu,
  StatelessMenu,
  useMenuState,
  ActionButton,
  MenuDisclosure,
} from './index'
import { Button } from '../Button'
import { Set } from '../Set'

export default {
  title: 'admin-ui/Menu',
  component: Menu,
} as Meta

export const Playground: Story<MenuProps> = (args) => (
  <Menu {...args} disclosure={<ActionButton display="menu" />}>
    <Menu.Item icon={<IconImport />}>Download</Menu.Item>
    <Menu.Item icon={<IconLink />}>Link to</Menu.Item>
    <Menu.Item icon={<IconFavorite />}>Favorite</Menu.Item>
    <Menu.Separator />
    <Menu.Item icon={<IconDelete />}>Delete</Menu.Item>
  </Menu>
)

Playground.args = {
  hideOnClick: true,
  'aria-label': 'menu label',
}
export const Stateful = () => (
  <Menu
    hideOnClick
    aria-label="menu label"
    disclosure={<ActionButton display="menu" />}
  >
    <Menu.Item icon={<IconImport />}>Download</Menu.Item>
    <Menu.Item icon={<IconLink />}>Link to</Menu.Item>
    <Menu.Item icon={<IconFavorite />}>Favorite</Menu.Item>
    <Menu.Separator />
    <Menu.Item dangerous icon={<IconDelete />}>
      Delete
    </Menu.Item>
  </Menu>
)

export const StatefulInitallyVisible = () => (
  <Menu
    visible
    hideOnClick
    aria-label="menu label"
    disclosure={<ActionButton display="menu" />}
  >
    <Menu.Item icon={<IconShippingTruck />}>Download</Menu.Item>
    <Menu.Item icon={<IconLink />}>Link to</Menu.Item>
    <Menu.Item icon={<IconFavorite />}>Favorite</Menu.Item>
    <Menu.Separator />
    <Menu.Item icon={<IconDelete />}>Delete</Menu.Item>
  </Menu>
)

export const Stateless = () => {
  const state = useMenuState({
    orientation: 'vertical',
    loop: true,
    placement: 'bottom-start',
  })

  return (
    <Fragment>
      <MenuDisclosure state={state}>
        <ActionButton variant="secondary">Post options</ActionButton>
      </MenuDisclosure>
      <StatelessMenu aria-label="actions" state={state}>
        <StatelessMenu.Item icon={<IconImport />}>Download</StatelessMenu.Item>
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

export const StatelessWithConstraint = () => {
  const [canDownload, setCanDownload] = useState(false)

  const state = useMenuState({
    orientation: 'vertical',
    loop: true,
    placement: 'bottom-start',
  })

  return (
    <Set>
      <Button onClick={() => setCanDownload((d) => !d)}>
        {canDownload ? 'Cannot' : 'Can'} download
      </Button>
      <MenuDisclosure state={state}>
        <ActionButton variant="secondary">Post options</ActionButton>
      </MenuDisclosure>
      <StatelessMenu aria-label="actions" state={state}>
        {canDownload && (
          <StatelessMenu.Item icon={<IconImport />}>
            Download
          </StatelessMenu.Item>
        )}
        <StatelessMenu.Item icon={<IconLink />}>Link to</StatelessMenu.Item>
        <StatelessMenu.Item icon={<IconFavorite />}>
          Favorite
        </StatelessMenu.Item>
        <StatelessMenu.Separator />
        <StatelessMenu.Item icon={<IconDelete />}>Delete</StatelessMenu.Item>
      </StatelessMenu>
    </Set>
  )
}
