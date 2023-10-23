import '../../../dist/styles.min.css'
import '../menu.css'
import React from 'react'
import { IconCaretDown } from '@vtex/shoreline-icons'

import {
  Menu,
  MenuItem,
  MenuProvider,
  MenuSeparator,
  MenuTrigger,
} from '../index'
import { Button } from '../../button'

export default {
  title: 'shoreline-components/menu',
}

export function Default() {
  return (
    <MenuProvider>
      <MenuTrigger>Open</MenuTrigger>
      <Menu>
        <MenuItem>New Tab</MenuItem>
        <MenuItem>New Item</MenuItem>
        <MenuSeparator />
        <MenuItem>Downloads</MenuItem>
      </Menu>
    </MenuProvider>
  )
}

export function Composition() {
  return (
    <MenuProvider>
      <MenuTrigger asChild>
        <Button>
          Open <IconCaretDown />
        </Button>
      </MenuTrigger>
      <Menu asChild>
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
      </Menu>
    </MenuProvider>
  )
}
