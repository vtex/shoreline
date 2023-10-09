import React from 'react'

import { Center } from '../index'

export default {
  title: 'kc/center',
}

export function Default() {
  return (
    <Center
      style={{
        height: 256,
        width: 256,
        background: 'azure',
      }}
    >
      Centered
    </Center>
  )
}
