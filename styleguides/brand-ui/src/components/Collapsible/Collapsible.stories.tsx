import React from 'react'
import { Meta } from '@storybook/react'

import { Collapsible, useCollapsible } from './index'
import { IconMock } from '../Button/IconMock'

export default {
  title: 'beta/Collapsible',
  component: Collapsible,
} as Meta

export const SimpleUsage = () => {
  const props = useCollapsible()

  return (
    <Collapsible {...props} sx={{ width: ['100%', 500] }}>
      <Collapsible.Header label="Build for Community #2" />
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
    <Collapsible {...firstProps} sx={{ width: ['100%', 500] }}>
      <Collapsible.Header label="Build for Community #2" />
      <Collapsible.Content>
        <Collapsible {...secondProps}>
          <Collapsible.Header label="Build for Community #2" />
          <Collapsible.Content>
            <Collapsible {...thirdProps}>
              <Collapsible.Header label="Build for Community #2" />
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
    <Collapsible {...firstProps} sx={{ width: ['100%', 500] }}>
      <Collapsible.Header label="Build for Community #2" />
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
    <Collapsible {...firstProps} disabled sx={{ width: ['100%', 500] }}>
      <Collapsible.Header label="Build for Community #2" />
      <Collapsible.Content>
        It’s all about being ready to grow and reach new levels. Have a solid
        foundation, modular thinking and flexible essence, and you’re building
        for scale. We are global but we’re audacious enough to aim for the
        stars.
      </Collapsible.Content>
    </Collapsible>
  )
}

export const WithPrefixIcon = () => {
  const firstProps = useCollapsible()

  return (
    <Collapsible {...firstProps} sx={{ width: ['100%', 500] }}>
      <Collapsible.Header
        prefix={(props) => <IconMock {...props} />}
        label="Build for Community #2"
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

export const WithSufixIcon = () => {
  const firstProps = useCollapsible()

  return (
    <Collapsible {...firstProps} sx={{ width: ['100%', 500] }}>
      <Collapsible.Header
        sufix={(props) => <IconMock {...props} />}
        label="Build for Community #2"
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
