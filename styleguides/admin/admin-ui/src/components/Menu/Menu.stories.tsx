import React, { Fragment, useState } from 'react'
import { Meta, Story } from '@storybook/react'
import {
  IconFavorite,
  IconLink,
  IconImport,
  IconDelete,
  IconShippingTruck,
} from '@vtex/admin-ui-icons'

import {
  Menu,
  MenuProps,
  StatelessMenu,
  StatelessMenuProps,
  useMenuState,
  ActionButton,
  MenuDisclosure,
} from './index'
import { Button } from '../Button'
import { Set } from '../Set'

export default {
  title: 'components/Menu',
  component: Menu,
} as Meta

export const Stateful: Story<MenuProps> = () => (
  <Menu
    hideOnClick
    aria-label="menu label"
    disclosure={<ActionButton display="menu" />}
  >
    <Menu.Item icon={<IconImport />}>Download</Menu.Item>
    <Menu.Item icon={<IconLink />}>Link to</Menu.Item>
    <Menu.Item icon={<IconFavorite />}>Favorite</Menu.Item>
    <Menu.Separator />
    <Menu.Item icon={<IconDelete />}>Delete</Menu.Item>
  </Menu>
)

export const StatefulInitallyVisible: Story<MenuProps> = () => (
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

export const Stateless: Story<StatelessMenuProps> = () => {
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

export const StatelessWithConstraint: Story<StatelessMenuProps> = () => {
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
