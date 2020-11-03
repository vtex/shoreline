import React from 'react'
import { Meta } from '@storybook/react'

import { Actions } from './index'

export default {
  title: 'system-next/actions',
  component: Actions,
} as Meta

export const Horizontal = () => {
  return (
    <Actions>
      <Actions.Primary>Primary Action</Actions.Primary>
      <Actions.Secondary>Secondary Action</Actions.Secondary>
      <Actions.Tertiary>Tertiary Action</Actions.Tertiary>
    </Actions>
  )
}

export const Vertial = () => {
  return (
    <Actions orientation="vertical">
      <Actions.Primary>Primary Action</Actions.Primary>
      <Actions.Secondary>Secondary Action</Actions.Secondary>
      <Actions.Tertiary>Tertiary Action</Actions.Tertiary>
    </Actions>
  )
}

export const VertialFluid = () => {
  return (
    <Actions orientation="vertical" fluid>
      <Actions.Primary>Primary Action</Actions.Primary>
      <Actions.Secondary>Secondary Action</Actions.Secondary>
      <Actions.Tertiary>Tertiary Action</Actions.Tertiary>
    </Actions>
  )
}

export const Responsive = () => {
  return (
    <Actions
      palette="danger"
      size="small"
      orientation={['vertical', 'vertical', 'horizontal']}
      fluid
    >
      <Actions.Primary>Primary Action</Actions.Primary>
      <Actions.Secondary>Secondary Action</Actions.Secondary>
      <Actions.Tertiary>Tertiary Action</Actions.Tertiary>
    </Actions>
  )
}
