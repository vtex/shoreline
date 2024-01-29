import React from 'react'

import { Stack } from '../index'
import { style } from '@vtex/shoreline-utils'

export default {
  title: 'layouts/stack',
}

const itemStyle = style({
  background: '$color-blue-3',
  borderRadius: '$border-radius-medium',
  width: '5rem',
  height: '3rem',
  display: 'grid',
  placeItems: 'center',
})

export function Show() {
  return (
    <Stack>
      <Stack>
        <div style={itemStyle}>Item 1</div>
        <div style={itemStyle}>Item 2</div>
        <div style={itemStyle}>Item 3</div>
      </Stack>
      <Stack horizontal>
        <div style={itemStyle}>Item 1</div>
        <div style={itemStyle}>Item 2</div>
        <div style={itemStyle}>Item 3</div>
      </Stack>{' '}
      <Stack space="$space-8">
        <div style={itemStyle}>Item 1</div>
        <div style={itemStyle}>Item 2</div>
        <Stack space="$space-2">
          <div style={itemStyle}>Item 2.1</div>
          <div style={itemStyle}>Item 2.2</div>
          <div style={itemStyle}>Item 2.3</div>
        </Stack>
        <div style={itemStyle}>Item 3</div>
      </Stack>
    </Stack>
  )
}
