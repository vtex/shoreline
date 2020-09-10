import React from 'react'
import { Meta } from '@storybook/react'
import { Text } from 'theme-ui'

import { Collapsible, useCollapsible } from './index'

export default {
  title: 'beta/Collapsible',
  component: Collapsible,
} as Meta

export const SimpleUsage = () => {
  const props = useCollapsible()

  return (
    <Collapsible {...props} sx={{ width: '40%' }}>
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

export const NestedCollapsible = () => {
  const firstProps = useCollapsible()
  const secondProps = useCollapsible()

  return (
    <Collapsible {...firstProps} sx={{ width: '40%' }}>
      <Collapsible.Header label="Build for Community #1" />
      <Collapsible.Content>
        <Collapsible {...secondProps}>
          <Collapsible.Header label="Build for Community #2" />
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
    <Collapsible {...firstProps} sx={{ width: '40%' }}>
      <Collapsible.Header iconPosition="end" label="Build for Community #1" />
      <Collapsible.Content>
        It’s all about being ready to grow and reach new levels. Have a solid
        foundation, modular thinking and flexible essence, and you’re building
        for scale. We are global but we’re audacious enough to aim for the
        stars.
      </Collapsible.Content>
    </Collapsible>
  )
}
