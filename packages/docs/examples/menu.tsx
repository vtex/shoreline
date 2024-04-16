import React from 'react'
import { Menu, MenuItem, MenuSeparator } from '@vtex/shoreline'

export default function Example() {
  return (
    <Menu label="Open">
      <MenuItem>New Tab</MenuItem>
      <MenuItem>New Item</MenuItem>
      <MenuSeparator />
      <MenuItem>Downloads</MenuItem>
    </Menu>
  )
}
