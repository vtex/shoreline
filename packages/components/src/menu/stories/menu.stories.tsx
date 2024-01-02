import React from 'react'
import { IconCaretDownSmall } from '@vtex/shoreline-icons'
import { Virtual, VirtualItem } from '@vtex/shoreline-primitives'

import {
  Menu,
  MenuItem,
  MenuProvider,
  MenuSeparator,
  MenuTrigger,
  MenuPopover,
} from '../index'
import { Button } from '../../button'

export default {
  title: 'components/menu',
}

export function Default() {
  return (
    <Menu label="Open">
      <MenuItem>New Tab</MenuItem>
      <MenuItem>New Item</MenuItem>
      <MenuSeparator />
      <MenuItem>Downloads</MenuItem>
    </Menu>
  )
}

export function FullForm() {
  return (
    <MenuProvider>
      <MenuTrigger asChild>
        <Button>Open</Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuItem>New Tab</MenuItem>
        <MenuItem>New Item</MenuItem>
        <MenuSeparator />
        <MenuItem>Downloads</MenuItem>
      </MenuPopover>
    </MenuProvider>
  )
}

export function Composition() {
  return (
    <MenuProvider placement="bottom-end">
      <MenuTrigger asChild>
        <Button>
          Open <IconCaretDownSmall />
        </Button>
      </MenuTrigger>
      <MenuPopover asChild>
        <div style={{ border: '5px solid red' }}>
          <MenuItem>New Tab</MenuItem>
          <MenuItem>New Item</MenuItem>
          <MenuSeparator />
          <MenuItem asChild>
            <a href="htpps://vtex.com" target="_blank" rel="noreferrer">
              Downloads
            </a>
          </MenuItem>
        </div>
      </MenuPopover>
    </MenuProvider>
  )
}

export function Virtualization() {
  return (
    <Menu label="Menu">
      <Virtual
        dynamic
        count={5000}
        style={{
          width: `200px`,
        }}
      >
        <VirtualItem asChild>
          {({ index }) => {
            return <MenuItem>Item {index}</MenuItem>
          }}
        </VirtualItem>
      </Virtual>
    </Menu>
  )
}
