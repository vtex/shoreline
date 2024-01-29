import React from 'react'

import { Menu, MenuItem, MenuSeparator } from '../index'

export default {
  title: 'components/menu',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function Show() {
  return (
    <Menu label="Open">
      <MenuItem>New Tab</MenuItem>
      <MenuItem>New Item</MenuItem>
      <MenuSeparator />
      <MenuItem>Downloads</MenuItem>
    </Menu>
  )
}
