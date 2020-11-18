import React from 'react'
import { Meta } from '@storybook/react'

import { Collapsible, useCollapsible } from './index'
import { Button } from '../Button'

export default {
  title: 'beta/Collapsible',
  component: Collapsible,
} as Meta

export const Basic = () => {
  const state = useCollapsible()

  return (
    <Collapsible state={state} styleOverrides={{ width: 500 }}>
      <Collapsible.Header label="Build for Community #1" />
      <Collapsible.Content>
        It’s all about being ready to grow and reach new levels. Have a solid
        foundation, modular thinking and flexible essence, and you’re building
        for scale. We are global but we’re audacious enough to aim for the
        stars.
      </Collapsible.Content>
    </Collapsible>
  )
}

export const ActionsPanel = () => {
  const { toggle, ...props } = useCollapsible()

  return (
    <Collapsible state={{ toggle, ...props }}>
      <Collapsible.Header label="Actions Panel">
        <Button variant="secondary">Secondary</Button>
        <Button onClick={toggle}>Toggle Collapsible Content</Button>
      </Collapsible.Header>
      <Collapsible.Content>
        It’s all about being ready to grow and reach new levels. Have a solid
        foundation, modular thinking and flexible essence, and you’re building
        for scale. We are global but we’re audacious enough to aim for the
        stars.
      </Collapsible.Content>
    </Collapsible>
  )
}

export const InitiallyVisible = () => {
  const state = useCollapsible({ visible: true })

  return (
    <Collapsible state={state}>
      <Collapsible.Header label="Initially Visible" />
      <Collapsible.Content>
        It’s all about being ready to grow and reach new levels. Have a solid
        foundation, modular thinking and flexible essence, and you’re building
        for scale. We are global but we’re audacious enough to aim for the
        stars.
      </Collapsible.Content>
    </Collapsible>
  )
}

export const Nested = () => {
  const root = useCollapsible()
  const nested = useCollapsible()

  return (
    <Collapsible state={root}>
      <Collapsible.Header label="Root Collapsible" />
      <Collapsible.Content>
        <Collapsible state={nested}>
          <Collapsible.Header label="Nested Collapsible" />
          <Collapsible.Content>
            It’s all about being ready to grow and reach new levels. Have a
            solid foundation, modular thinking and flexible essence, and you’re
            building for scale. We are global but we’re audacious enough to aim
            for the stars.
          </Collapsible.Content>
        </Collapsible>
      </Collapsible.Content>
    </Collapsible>
  )
}
