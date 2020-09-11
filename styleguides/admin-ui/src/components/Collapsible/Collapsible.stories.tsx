import React from 'react'
import { Meta } from '@storybook/react'

import { Collapsible, useCollapsible } from './index'
import { Button } from '../Button'
import { Text } from '../Text'

export default {
  title: 'beta/Collapsible',
  component: Collapsible,
  parameters: {
    jest: 'Collapsible.test.tsx',
  },
} as Meta

export const SimpleUsage = () => {
  const props = useCollapsible()

  return (
    <Collapsible {...props} sx={{ width: '1/3' }}>
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
    <Collapsible {...props} sx={{ width: '4/5' }}>
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
    <Collapsible {...firstProps} sx={{ width: '2/5' }}>
      <Collapsible.Header
        label={<Text variant="highlight">Build for Community #1</Text>}
      >
        <Button variant="subtle">Action</Button>
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
    <Collapsible {...firstProps} sx={{ width: '1/3' }}>
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
