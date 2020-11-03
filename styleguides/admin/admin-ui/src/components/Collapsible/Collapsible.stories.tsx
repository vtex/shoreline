import React from 'react'
import { Meta } from '@storybook/react'

import { Collapsible, useCollapsible } from './index'
import { Button } from '../Button'
import { Heading } from '../Heading'

export default {
  title: 'beta/Collapsible',
  component: Collapsible,
} as Meta

export const Basic = () => {
  const state = useCollapsible()

  return (
    <Collapsible state={state} styleOverrides={{ width: '5/12' }}>
      <Collapsible.Header label={<Heading>Build for Community #1</Heading>} />
      <Collapsible.Content>
        It’s all about being ready to grow and reach new levels. Have a solid
        foundation, modular thinking and flexible essence, and you’re building
        for scale. We are global but we’re audacious enough to aim for the
        stars.
      </Collapsible.Content>
    </Collapsible>
  )
}

export const WithButtons = () => {
  const { toggle, ...props } = useCollapsible()

  return (
    <Collapsible
      state={{ toggle, ...props }}
      styleOverrides={{ width: '6/12' }}
    >
      <Collapsible.Header label="Build for Community #1">
        <Button size="small" variant="subtle">
          Button
        </Button>
        <Button size="small" onClick={toggle}>
          Open Collapsible
        </Button>
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

export const Nested = () => {
  const firstState = useCollapsible()
  const secondState = useCollapsible()

  return (
    <Collapsible state={firstState} styleOverrides={{ width: '5/12' }}>
      <Collapsible.Header
        label={<Heading text="highlight">Build for Community #1</Heading>}
      />
      <Collapsible.Content>
        <Collapsible state={secondState}>
          <Collapsible.Header
            label={<Heading text="highlight">Build for Community #2</Heading>}
          />
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

export const InitiallyVisible = () => {
  const state = useCollapsible({ visible: true })

  return (
    <Collapsible state={state} styleOverrides={{ width: '5/12' }}>
      <Collapsible.Header
        label={<Heading text="highlight">Build for Community #1</Heading>}
      />
      <Collapsible.Content>
        It’s all about being ready to grow and reach new levels. Have a solid
        foundation, modular thinking and flexible essence, and you’re building
        for scale. We are global but we’re audacious enough to aim for the
        stars.
      </Collapsible.Content>
    </Collapsible>
  )
}
