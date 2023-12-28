import React from 'react'
import './styles.css'

import { Virtual, VirtualItem } from '../index'

import { Menu, MenuItem, MenuProvider, MenuTrigger } from '../../menu'
import { Button } from '../../button'

export default {
  title: 'shoreline-components/virtual',
}

export function MenuVirtualization() {
  return (
    <MenuProvider>
      <MenuTrigger asChild>
        <Button>Menu</Button>
      </MenuTrigger>
      <Menu>
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
    </MenuProvider>
  )
}
