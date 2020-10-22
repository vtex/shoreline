import React from 'react'
import { Meta } from '@storybook/react'

import { unstableThemeProvider as ThemeProvider } from '../unstableThemeProvider'
import { Actions } from './index'

export default {
  title: 'system-next/actions',
  component: Actions,
} as Meta

export const Horizontal = () => {
  return (
    <ThemeProvider>
      <Actions>
        <Actions.Primary>Primary Action</Actions.Primary>
        <Actions.Secondary>Secondary Action</Actions.Secondary>
        <Actions.Tertiary>Tertiary Action</Actions.Tertiary>
      </Actions>
    </ThemeProvider>
  )
}

export const Vertial = () => {
  return (
    <ThemeProvider>
      <Actions orientation="vertical">
        <Actions.Primary>Primary Action</Actions.Primary>
        <Actions.Secondary>Secondary Action</Actions.Secondary>
        <Actions.Tertiary>Tertiary Action</Actions.Tertiary>
      </Actions>
    </ThemeProvider>
  )
}

export const VertialFluid = () => {
  return (
    <ThemeProvider>
      <Actions orientation="vertical" fluid>
        <Actions.Primary>Primary Action</Actions.Primary>
        <Actions.Secondary>Secondary Action</Actions.Secondary>
        <Actions.Tertiary>Tertiary Action</Actions.Tertiary>
      </Actions>
    </ThemeProvider>
  )
}

export const Responsive = () => {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  )
}
