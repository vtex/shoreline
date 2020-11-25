import React from 'react'
import { Meta } from '@storybook/react'

import { Set } from './index'
import { Button } from '../Button'

export default {
  title: 'layouts/Set',
} as Meta

export const SetLayout = () => {
  return (
    <Set spacing={2} orientation="vertical" fluid>
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
      <Button>Fourth</Button>
      <Button>Fith</Button>
      <Button>Six</Button>
      <Button>Seventh</Button>
      <Button>Eight</Button>
    </Set>
  )
}

export const End = () => {
  return (
    <Set align="end" spacing={2}>
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </Set>
  )
}

export const SetResponsive = () => {
  return (
    <Set
      spacing={[1, 1, 3]}
      orientation={['vertical', 'vertical', 'horizontal']}
      fluid
    >
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
      <Button>Fourth</Button>
      <Button>Fith</Button>
      <Button>Six</Button>
      <Button>Seventh</Button>
      <Button>Eight</Button>
    </Set>
  )
}
