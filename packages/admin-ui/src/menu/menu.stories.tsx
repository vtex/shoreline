import React from 'react'
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
      <Menu>
        <MenuButton state={state} display="actions">
          Menu
        </MenuButton>
        <MenuList state={state} aria-label="Menu">
          <MenuItem icon={<IconPen />}>Option a</MenuItem>
          <MenuItem icon={<IconX />} variant="critical">
            option b
          </MenuItem>
        </MenuList>
      </Menu>

      <Menu>
        <MenuButton state={stateb} display="actions" variant="primary" />
        <MenuList state={stateb} aria-label="Menu">
          <MenuItem>Option a</MenuItem>
          <MenuDivider />
          <MenuItem>option b</MenuItem>
        </MenuList>
      </Menu>

      <Menu>
        <MenuButton state={statec} display="actions" size="large">
          Menu
        </MenuButton>
        <MenuList state={statec} aria-label="Menu">
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
      <Menu>
        <MenuButton state={g} display="actions">
          Menu
        </MenuButton>
        <MenuButton state={state} display="menu">
          Menu
        </MenuButton>
        <MenuButton state={state} display="actions" disabled>
          Menu
        </MenuButton>
        <MenuButton state={state} display="menu" disabled>
          Menu
        </MenuButton>

        <MenuButton state={state} display="actions" variant="secondary">
          Menu
        </MenuButton>
        <MenuButton
          state={state}
          display="actions"
          variant="secondary"
          disabled
        >
          Menu
        </MenuButton>
        <MenuButton state={state} display="actions" variant="tertiary">
          Menu
        </MenuButton>
        <MenuButton state={state} display="actions" variant="tertiary" disabled>
          Menu
        </MenuButton>
        <MenuButton state={state} display="actions" variant="neutralTertiary">
          Menu
        </MenuButton>
        <MenuButton
          state={state}
          display="actions"
          variant="neutralTertiary"
          disabled
        >
          Menu
        </MenuButton>
      </Menu>
    </Stack>
  )
}
