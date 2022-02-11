import React, { useState } from 'react'
import type { Meta } from '@storybook/react'
import {
  IconHeart,
  IconLink,
  IconTrash,
  IconTruck,
  IconPlus,
} from '@vtex/phosphor-icons'

import { Menu } from './components/Menu'
import {
  useMenuState,
  MenuList,
  MenuButton,
  MenuItem,
  MenuSeparator,
} from './index'

import { Button } from '../button'
import { Set } from '../Set'

export default {
  title: 'admin-ui/Menu',
  component: Menu,
} as Meta

export const Playground = () => {
  const state = useMenuState()

  return (
    <Menu state={state} hideOnClick>
      <MenuButton display="menu" />
      <MenuList aria-label="Menu">
        <MenuItem icon={<IconTruck />}>Download</MenuItem>
        <MenuItem icon={<IconLink />}>Link to</MenuItem>
        <MenuItem icon={<IconHeart />}>Favorite</MenuItem>
        <MenuSeparator />
        <MenuItem icon={<IconTrash />} tone="critical">
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export const InitallyVisible = () => {
  const state = useMenuState({
    visible: true,
  })

  return (
    <Menu state={state} hideOnClick>
      <MenuButton display="menu" />
      <MenuList aria-label="Menu">
        <MenuItem icon={<IconTruck />}>Download</MenuItem>
        <MenuItem icon={<IconLink />}>Link to</MenuItem>
        <MenuItem icon={<IconHeart />}>Favorite</MenuItem>
        <MenuSeparator />
        <MenuItem icon={<IconTrash />} tone="critical">
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export const WithConstraint = () => {
  const [canDownload, setCanDownload] = useState(false)

  const state = useMenuState({
    loop: true,
    placement: 'right',
  })

  return (
    <Set>
      <Button onClick={() => setCanDownload((d) => !d)}>
        {canDownload ? 'Cannot' : 'Can'} download
      </Button>
      <Menu state={state}>
        <MenuButton display="actions" variant="secondary">
          Post options
        </MenuButton>
        <MenuList aria-label="Menu">
          {canDownload ? (
            <MenuItem icon={<IconPlus />}>Download</MenuItem>
          ) : null}
          <MenuItem icon={<IconLink />}>Link to</MenuItem>
          <MenuItem icon={<IconHeart />}>Favorite</MenuItem>
          <MenuItem icon={<IconTrash />} tone="critical">
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    </Set>
  )
}
