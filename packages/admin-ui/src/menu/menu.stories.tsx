import React, { useState } from 'react'
import type { Meta } from '@storybook/react'

import { Menu } from '.'
import { MenuButton } from './menu-button'
import { useMenuState } from 'ariakit'
import { MenuList } from './menu-list'
import { MenuItem } from './menu-item'
import { Stack } from '..'

import { IconX, IconPen } from '@vtex/phosphor-icons'
import { MenuDivider } from './menu-divider'

export default {
  title: 'admin-ui-review/Menu',
  component: Menu,
} as Meta

export const Playground = () => {
  const state = useMenuState()
  const stateb = useMenuState()
  const statec = useMenuState()

  return (
    <Stack>
      <Menu state={state} hideOnClick>
        <MenuButton display="actions">Menu</MenuButton>
        <MenuList aria-label="Menu">
          <MenuItem icon={<IconPen />}>Option a</MenuItem>
          <MenuItem icon={<IconX />} tone="critical">
            option b
          </MenuItem>
        </MenuList>
      </Menu>

      <Menu state={stateb} hideOnClick>
        <MenuButton display="actions" />
        <MenuList aria-label="Menu">
          <MenuItem>Option a</MenuItem>
          <MenuDivider />
          <MenuItem>option b</MenuItem>
        </MenuList>
      </Menu>

      <Menu state={statec} hideOnClick>
        <MenuButton display="actions" size="large">
          Menu
        </MenuButton>
        <MenuList aria-label="Menu">
          <MenuItem>Option a</MenuItem>
          <MenuItem>option b</MenuItem>
        </MenuList>
      </Menu>
    </Stack>
  )
}

export const Variants = () => {
  const state = useMenuState()

  return (
    <Stack>
      <Menu state={state} hideOnClick>
        <MenuButton display="actions">Menu</MenuButton>
        <MenuButton display="menu">Menu</MenuButton>
        <MenuButton display="actions" disabled>
          Menu
        </MenuButton>
        <MenuButton display="menu" disabled>
          Menu
        </MenuButton>

        <MenuButton display="actions" variant="secondary">
          Menu
        </MenuButton>
        <MenuButton display="actions" variant="secondary" disabled>
          Menu
        </MenuButton>
        <MenuButton display="actions" variant="tertiary">
          Menu
        </MenuButton>
        <MenuButton display="actions" variant="tertiary" disabled>
          Menu
        </MenuButton>
        <MenuButton display="actions" variant="neutralTertiary">
          Menu
        </MenuButton>
        <MenuButton display="actions" variant="neutralTertiary" disabled>
          Menu
        </MenuButton>
      </Menu>
    </Stack>
  )
}
