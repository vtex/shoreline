import React from 'react'
import { Meta } from '@storybook/react'

import { unstableSet as Set } from './index'
import { Button } from '../Button'
import { unstableThemeProvider as ThemeProvider } from '../unstableThemeProvider'

export default {
  title: 'system-next/layout/set',
} as Meta

export const SetLayout = () => {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  )
}

export const End = () => {
  return (
    <ThemeProvider>
      <Set align="end" spacing={2}>
        <Button>First</Button>
        <Button>Second</Button>
        <Button>Third</Button>
      </Set>
    </ThemeProvider>
  )
}

export const SetResponsive = () => {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  )
}
