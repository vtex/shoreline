import React from 'react'
import './styles.css'

import { Virtual, VirtualItem } from '../index'

import { Center } from '../../center'

export default {
  title: 'shoreline-components/virtual',
}

export function Fixed() {
  return (
    <Virtual
      count={5000}
      overscan={5}
      estimateSize={() => 60}
      style={{
        width: `400px`,
      }}
    >
      <VirtualItem asChild>
        {({ index }) => {
          return (
            <Center className="row" data-odd={index % 2 !== 0}>
              Item {index}
            </Center>
          )
        }}
      </VirtualItem>
    </Virtual>
  )
}
