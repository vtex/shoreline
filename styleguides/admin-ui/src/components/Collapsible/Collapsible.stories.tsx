import React from 'react'
import { Meta } from '@storybook/react'

import { Collapsible, useCollapsible } from './index'
import { Button } from '../Button'
import { Text } from '../Text'

export default {
  title: 'beta/Collapsible',
  component: Collapsible,
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

SimpleUsage.parameters = {
  playroom: {
    code: `
<Play.CollapsibleState>
  {({toggle, visible, ...props}) => (
    <Collapsible toggle={toggle} visible={visible} {...props} sx={{ width: '1/3' }}>
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
  )}
</Play.CollapsibleState>
    `,
  },
}

export const WithButtons = () => {
  const { toggle, ...props } = useCollapsible()

  return (
    <Collapsible toggle={toggle} {...props} sx={{ width: '2/5' }}>
      <Collapsible.Header label="Build for Community #1">
        <Button size="small" variant="subtle">
          Button
        </Button>
        <Button size="small" onClick={toggle}>
          Toggle
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

WithButtons.parameters = {
  playroom: {
    code: `
<Play.CollapsibleState>
  {({toggle, visible, ...props}) => (
    <Collapsible toggle={toggle} visible={visible} {...props} sx={{ width: '2/5' }}>
      <Collapsible.Header label="Build for Community #1">
        <Button size="small" variant="subtle">
          Button
        </Button>
        <Button size="small" onClick={toggle}>Toggle</Button>
      </Collapsible.Header>
      <Collapsible.Content>
        It’s all about being ready to grow and reach new levels. Have a solid
        foundation, modular thinking and flexible essence, and you’re building
        for scale. We are global but we’re audacious enough to aim for the
        stars.
      </Collapsible.Content>
    </Collapsible>
  )}
</Play.CollapsibleState>
    `,
  },
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

NestedCollapsible.parameters = {
  playroom: {
    code: `
<Play.CollapsibleState>
  {({toggle, visible, ...firstProps}) => (
    <Collapsible toggle={toggle} visible={visible} {...firstProps} sx={{ width: '2/5' }}>
      <Collapsible.Header
        label={<Text variant="highlight">Build for Community #1</Text>}
      >
        <Button variant="subtle">Action</Button>
        <Button>Button</Button>
      </Collapsible.Header>
      <Collapsible.Content>
        <Play.CollapsibleState>
          {({toggle, visible, ...secondProps}) => (
            <Collapsible toggle={toggle} visible={visible} {...secondProps}>
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
          )}
        </Play.CollapsibleState>
      </Collapsible.Content>
    </Collapsible>
  )}
</Play.CollapsibleState>
    `,
  },
}

export const InitiallyVisible = () => {
  const props = useCollapsible({ visible: true })

  return (
    <Collapsible {...props} sx={{ width: '1/3' }}>
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

InitiallyVisible.parameters = {
  playroom: {
    code: `
<Play.CollapsibleState>
  {({toggle, visible, ...props}) => (
    <Collapsible toggle={toggle} visible={visible} {...props} sx={{ width: '1/3' }}>
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
  )}
</Play.CollapsibleState>
    `,
  },
}
