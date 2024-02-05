import React from 'react'

import { Virtual, VirtualItem } from '../index'

export default {
  title: 'primitives/virtual/examples',
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
}

export function Dynamic() {
  return (
    <Virtual count={5000} dynamic style={{ width: 500 }}>
      <VirtualItem asChild>
        {({ index }) => {
          return (
            <div
              className="row"
              style={{
                height: index % 2 === 0 ? '40px' : '60px',
                background: index % 2 !== 0 ? 'gray' : 'white',
              }}
            >
              Item {index}
            </div>
          )
        }}
      </VirtualItem>
    </Virtual>
  )
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
          return <div className="row">Item {index}</div>
        }}
      </VirtualItem>
    </Virtual>
  )
}
