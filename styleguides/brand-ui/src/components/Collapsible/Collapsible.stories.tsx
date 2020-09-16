import React from 'react'
import { Meta } from '@storybook/react'

import { Collapsible, useCollapsible } from './index'

export default {
  title: 'beta/Collapsible',
  component: Collapsible,
} as Meta

export const SimpleUsage = () => {
  const props = useCollapsible()

  return (
    <Collapsible {...props} sx={{ width: '40%' }}>
      <Collapsible.Header>Build for Community #2</Collapsible.Header>
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
  const thirdProps = useCollapsible()

  return (
    <Collapsible {...firstProps} sx={{ width: '40%' }}>
      <Collapsible.Header>Build for Community #1</Collapsible.Header>
      <Collapsible.Content>
        <Collapsible {...secondProps}>
          <Collapsible.Header>Build for Community #2</Collapsible.Header>
          <Collapsible.Content>
            <Collapsible {...thirdProps}>
              <Collapsible.Header>Build for Community #3</Collapsible.Header>
              <Collapsible.Content>
                It’s all about being ready to grow and reach new levels. Have a
                solid foundation, modular thinking and flexible essence, and
                you’re building for scale. We are global but we’re audacious
                enough to aim for the stars.
              </Collapsible.Content>
            </Collapsible>
          </Collapsible.Content>
        </Collapsible>
      </Collapsible.Content>
    </Collapsible>
  )
}

export const InitiallyVisible = () => {
  const firstProps = useCollapsible({ visible: true })

  return (
    <Collapsible {...firstProps} sx={{ width: '40%' }}>
      <Collapsible.Header>Build for Community #2</Collapsible.Header>
      <Collapsible.Content>
        It’s all about being ready to grow and reach new levels. Have a solid
        foundation, modular thinking and flexible essence, and you’re building
        for scale. We are global but we’re audacious enough to aim for the
        stars.
      </Collapsible.Content>
    </Collapsible>
  )
}

export const Disabled = () => {
  const firstProps = useCollapsible()

  return (
    <Collapsible {...firstProps} disabled sx={{ width: '40%' }}>
      <Collapsible.Header>Build for Community #2</Collapsible.Header>
      <Collapsible.Content>
        It’s all about being ready to grow and reach new levels. Have a solid
        foundation, modular thinking and flexible essence, and you’re building
        for scale. We are global but we’re audacious enough to aim for the
        stars.
      </Collapsible.Content>
    </Collapsible>
  )
}
