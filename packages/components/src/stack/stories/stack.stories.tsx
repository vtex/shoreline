import React from 'react'

import { Stack } from '../index'

export default {
  title: 'layouts/stack',
}

const itemStyle = {
  background: 'lightblue',
  width: '5rem',
  height: '3rem',
  borderRadius: '8px',
  display: 'grid',
  placeItems: 'center',
}

export function Default() {
  return (
    <Stack>
      <div style={itemStyle}>Item 1</div>
      <div style={itemStyle}>Item 2</div>
      <div style={itemStyle}>Item 3</div>
    </Stack>
  )
}

export function Horizontal() {
  return (
    <Stack horizontal>
      <div style={itemStyle}>Item 1</div>
      <div style={itemStyle}>Item 2</div>
      <div style={itemStyle}>Item 3</div>
    </Stack>
  )
}

export function Nesting() {
  return (
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
  )
}
