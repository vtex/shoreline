import '../../../dist/styles.min.css'
import React, { Fragment, useMemo } from 'react'
import '../virtual.css'
import './styles.css'

import {
  Virtual,
  VirtualContainer,
  VirtualItem,
  useVirtualizerModel,
} from '../index'

import { Center } from '../../center'
import { Menu, MenuItem, MenuProvider, MenuTrigger } from '../../menu'
import { Button } from '../../button'

export default {
  title: 'shoreline-components/virtual',
}

export function MenuVirtualization() {
  const model = useVirtualizerModel({
    count: 5000,
    estimateSize() {
      return 60
    },
    dynamic: true,
  })

  return (
    <MenuProvider>
      <MenuTrigger asChild>
        <Button>Menu</Button>
      </MenuTrigger>
      <Menu>
        <Virtual
          virtualizer={model}
          style={{
            width: `200px`,
          }}
        >
          <VirtualContainer virtualizer={model}>
            <VirtualItem asChild>
              {({ index }) => {
                return <MenuItem>Item {index}</MenuItem>
              }}
            </VirtualItem>
          </VirtualContainer>
        </Virtual>
      </Menu>
    </MenuProvider>
  )
}
