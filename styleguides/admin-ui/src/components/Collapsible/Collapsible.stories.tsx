import React from 'react'
import { Meta } from '@storybook/react'

import { Collapsible, useCollapsible } from './index'
import { Button } from '../Button'
import { Text } from '../Text'

export default {
  title: 'beta/Collapsible',
  component: Collapsible,
} as Meta

export const Basic = () => {
  const state = useCollapsible()

  return (
    <Collapsible state={state} w="5/12">
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

Basic.parameters = {
  playroom: {
    code: `
<Play.CollapsibleState>
  {({toggle, visible, ...props}) => (
    <Collapsible state={{toggle, visible, ...props}} w="5/12">
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
    <Collapsible state={{ toggle, ...props }} w="6/12">
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

WithButtons.parameters = {
  playroom: {
    code: `
<Play.CollapsibleState>
  {({toggle, visible, ...props}) => (
    <Collapsible state={{ toggle, visible,...props }} w="6/12">
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
  )}
</Play.CollapsibleState>
    `,
  },
}

export const Nested = () => {
  const firstState = useCollapsible()
  const secondState = useCollapsible()

  return (
    <Collapsible state={firstState} w="5/12">
      <Collapsible.Header
        label={<Text variant="highlight">Build for Community #1</Text>}
      />
      <Collapsible.Content>
        <Collapsible state={secondState}>
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

Nested.parameters = {
  playroom: {
    code: `
<Play.CollapsibleState>
  {({toggle, visible, ...firstState}) => (
    <Collapsible state={{toggle, visible, ...firstState}} w="5/12">
      <Collapsible.Header
        label={<Text variant="highlight">Build for Community #1</Text>}
      />
      <Collapsible.Content>
        <Play.CollapsibleState>
          {({toggle, visible, ...secondState}) => (
            <Collapsible state={{toggle, visible, ...secondState}}>
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
  const state = useCollapsible({ visible: true })

  return (
    <Collapsible state={state} w="5/12">
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

InitiallyVisible.parameters = {
  playroom: {
    code: `
<Play.CollapsibleState>
  {({toggle, visible, ...props}) => (
    <Collapsible state={{ toggle, visible,...props }} w="5/12">
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
