import React from 'react'

import { Flex } from '../index'
import './story.css'

export default {
  title: 'shoreline-components/flex',
}

export function Default() {
  return (
    <Flex rowGap="10px" direction="column" align="center">
      <div className="item" />
      <div className="item" />
      <div className="item" />
    </Flex>
  )
}
