import React from 'react'
import { Meta } from '@storybook/react'
import { Text } from 'theme-ui'

import { Collapsible, useCollapsible } from './index'
import { Button } from '../Button'

export default {
  title: 'beta/Collapsible',
  component: Collapsible,
} as Meta

export const SimpleUsage = () => {
  const props = useCollapsible()

  return (
    <Collapsible {...props} sx={{ width: '30%' }}>
      <Collapsible.Header
        label={<Text variant="highlight">Build for Community #1</Text>}
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

export const WithButtons = () => {
  const props = useCollapsible()

  return (
    <Collapsible {...props} sx={{ width: '80%' }}>
      <Collapsible.Header label="Build for Community #1">
        <Button size="small">Action 1</Button>
        <Button size="small">Action 2</Button>
        <Button size="small">Action 3</Button>
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

export const NestedCollapsible = () => {
  const firstProps = useCollapsible()
  const secondProps = useCollapsible()

  return (
    <Collapsible {...firstProps} sx={{ width: '40%' }}>
      <Collapsible.Header
        label={<Text variant="highlight">Build for Community #1</Text>}
      >
        <Button variant="primary">Action</Button>
        <Button>Button</Button>
      </Collapsible.Header>
      <Collapsible.Content>
        <Collapsible {...secondProps}>
          <Collapsible.Header
            label={<Text variant="highlight">Build for Community #2</Text>}
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
  const firstProps = useCollapsible({ visible: true })

  return (
    <Collapsible {...firstProps} sx={{ width: '30%' }}>
      <Collapsible.Header
        label={<Text variant="highlight">Build for Community #1</Text>}
      >
        <Button size="small">Action</Button>
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
