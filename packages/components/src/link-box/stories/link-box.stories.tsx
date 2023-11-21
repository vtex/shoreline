import React from 'react'
import { Button } from '../../button'
import { Menu, MenuTrigger, MenuItem, MenuProvider } from '../../menu'

import { LinkBox } from '../index'

export default {
  title: 'shoreline-components/link-box',
}

export function Default() {
  return (
    <LinkBox href="https://vtex.com">
      <a href="https://google.com">Link to Google</a>
      <Button onClick={() => alert('Alert message')}>Alert Something</Button>
      <MenuProvider>
        <MenuTrigger asChild>
          <Button>Open Menu</Button>
        </MenuTrigger>
        <Menu>
          <MenuItem>Item 1</MenuItem>
        </Menu>
      </MenuProvider>
    </LinkBox>
  )
}
