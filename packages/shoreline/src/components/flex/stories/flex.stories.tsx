import React from 'react'
import { Flex } from '../index'

export default {
  title: 'layouts/flex',
}

const itemStyle = {
  backgroundColor: 'lightblue',
  width: '6.25rem',
  height: '6.25rem',
}

export function Show() {
  return (
    <Flex gap="$space-2" direction="column" align="center">
      <div style={itemStyle} />
      <div style={itemStyle} />
      <div style={itemStyle} />
    </Flex>
  )
}
