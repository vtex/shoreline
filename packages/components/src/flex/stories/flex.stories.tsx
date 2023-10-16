import React from 'react'
import '@vtex/shoreline-visual'

import { Flex } from '../index'
import { divStyle } from './flex.stories.css'

export default {
  title: 'shoreline-components/flex',
}

export function Default() {
  return (
    <Flex rowGap="10px" direction="column" align="center">
      <div className={divStyle} />
      <div className={divStyle} />
      <div className={divStyle} />
    </Flex>
  )
}
