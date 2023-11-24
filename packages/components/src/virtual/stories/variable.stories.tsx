import React from 'react'
import '../virtual.css'

import { Virtual, VirtualItem } from '../index'

import './styles.css'
import { Center } from '../../center'

export default {
  title: 'shoreline-components/virtual',
}

export function Dynamic() {
  return (
    <Virtual count={5000} dynamic style={{ width: 500 }}>
      <VirtualItem asChild>
        {({ index }) => {
          return (
            <Center
              className="row"
              data-odd={index % 2 !== 0}
              style={{
                height: index % 2 === 0 ? '40px' : '60px',
              }}
            >
              Item {index}
            </Center>
          )
        }}
      </VirtualItem>
    </Virtual>
  )
}
