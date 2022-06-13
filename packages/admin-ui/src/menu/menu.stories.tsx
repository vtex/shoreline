import React, { useEffect } from 'react'
import type { Meta } from '@storybook/react'

import { IconX, IconPlus, IconPen, IconDownload } from '@vtex/phosphor-icons'

import { Stack } from '../stack'
import { Inline } from '../inline'
import { MenuButton, Menu, MenuItem, MenuDivider, useMenuState } from './index'

export default {
  title: 'admin-ui-review/menu',
  component: Menu,
} as Meta

export const Playground = () => {
  const menuState = useMenuState()
  const largeMenuState = useMenuState()

  return (
    <Inline>
      <>
        <MenuButton state={menuState} />
        <Menu state={menuState}>
          <MenuItem icon={<IconPlus />} disabled>
            Create
          </MenuItem>
          <MenuItem icon={<IconPen />}>Edit</MenuItem>
          <MenuItem icon={<IconDownload />}>Download</MenuItem>
          <MenuDivider />
          <MenuItem icon={<IconX />} critical>
            Delete
          </MenuItem>
        </Menu>
      </>
      <>
        <MenuButton state={largeMenuState} size="large" />
        <Menu state={largeMenuState}>
          <MenuItem icon={<IconPlus />} disabled>
            Create
          </MenuItem>
          <MenuItem icon={<IconPen />}>Edit</MenuItem>
          <MenuItem icon={<IconDownload />}>Download</MenuItem>
          <MenuDivider />
          <MenuItem icon={<IconX />} critical>
            Delete
          </MenuItem>
        </Menu>
      </>
    </Inline>
  )
}

export const InitiallyVisible = () => {
  const state = useMenuState()

  useEffect(() => {
    state.show()
  }, [])

  return (
    <Inline>
      <MenuButton state={state} />
      <Menu state={state}>
        <MenuItem icon={<IconPlus />} disabled>
          Create
        </MenuItem>
        <MenuItem icon={<IconPen />}>Edit</MenuItem>
        <MenuItem icon={<IconDownload />}>Download</MenuItem>
        <MenuDivider />
        <MenuItem icon={<IconX />} critical>
          Delete
        </MenuItem>
      </Menu>
    </Inline>
  )
}

export const CustomMenu = () => {
  const state = useMenuState()

  return (
    <Inline>
      <MenuButton state={state} label="Custom menu" />
      <Menu state={state}>
        <MenuItem>Option 1</MenuItem>
        <MenuItem>Option 2</MenuItem>
        <MenuItem>Option 3</MenuItem>
      </Menu>
    </Inline>
  )
}

export const IconOnly = () => {
  const menuState = useMenuState()
  const largeMenuState = useMenuState()

  return (
    <Inline>
      <>
        <MenuButton state={menuState} labelHidden />
        <Menu state={menuState}>
          <MenuItem icon={<IconPlus />} disabled>
            Create
          </MenuItem>
          <MenuItem icon={<IconPen />}>Edit</MenuItem>
          <MenuItem icon={<IconDownload />}>Download</MenuItem>
          <MenuDivider />
          <MenuItem icon={<IconX />} critical>
            Delete
          </MenuItem>
        </Menu>
      </>
      <>
        <MenuButton state={largeMenuState} size="large" labelHidden />
        <Menu state={largeMenuState}>
          <MenuItem icon={<IconPlus />} disabled>
            Create
          </MenuItem>
          <MenuItem icon={<IconPen />}>Edit</MenuItem>
          <MenuItem icon={<IconDownload />}>Download</MenuItem>
          <MenuDivider />
          <MenuItem icon={<IconX />} critical>
            Delete
          </MenuItem>
        </Menu>
      </>
    </Inline>
  )
}

export const Variants = () => {
  const variants: any[] = [
    'primary',
    'secondary',
    'tertiary',
    'neutralTertiary',
  ]

  return (
    <Stack>
      {variants.map((variant) => {
        const actionMenuState = useMenuState()
        const customMenuState = useMenuState()

        return (
          <Inline>
            <Stack>
              <MenuButton state={actionMenuState} variant={variant} />
              <Menu state={actionMenuState}>
                <MenuItem icon={<IconPlus />} disabled>
                  Create
                </MenuItem>
                <MenuItem icon={<IconPen />}>Edit</MenuItem>
                <MenuItem icon={<IconDownload />}>Download</MenuItem>
                <MenuDivider />
                <MenuItem icon={<IconX />} critical>
                  Delete
                </MenuItem>
              </Menu>

              <MenuButton state={useMenuState()} variant={variant} disabled>
                Action Menu
              </MenuButton>
            </Stack>

            <Stack>
              <MenuButton
                state={customMenuState}
                variant={variant}
                label="Custom menu"
              />
              <Menu state={customMenuState}>
                <MenuItem icon={<IconPlus />} disabled>
                  Create
                </MenuItem>
                <MenuItem icon={<IconPen />}>Edit</MenuItem>
                <MenuItem icon={<IconDownload />}>Download</MenuItem>
                <MenuDivider />
                <MenuItem icon={<IconX />} critical>
                  Delete
                </MenuItem>
              </Menu>

              <MenuButton
                state={useMenuState()}
                variant={variant}
                label="Custom menu"
                disabled
              />
            </Stack>
          </Inline>
        )
      })}
    </Stack>
  )
}
