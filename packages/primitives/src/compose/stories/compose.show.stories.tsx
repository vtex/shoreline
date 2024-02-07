import React, { useRef } from 'react'

import { Compose } from '../index'

export default {
  title: 'primitives/compose',
}

export function Show() {
  const ref = useRef()

  return (
    <Compose
      onClick={() => {
        console.log('clicked')
      }}
      ref={ref}
    >
      <a href="https://vtex.com.br" target="_blank" rel="noreferrer">
        Go to VTEX
      </a>
    </Compose>
  )
}
