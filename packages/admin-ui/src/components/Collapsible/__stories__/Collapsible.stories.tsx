import React from 'react'
import type { Meta, Story } from '@storybook/react'

import {
  Collapsible,
  CollapsibleHeader,
  CollapsibleContent,
  useCollapsibleState,
} from '../index'
import { Button } from '../../../button'

export default {
  title: 'admin-ui/Collapsible',
  component: Collapsible,
} as Meta

export const Playground: Story = (args) => {
  const state = useCollapsibleState()

  return (
    <Collapsible {...args} state={state}>
      <CollapsibleHeader label={args.labelHeader} />
      <CollapsibleContent>{args.content}</CollapsibleContent>
    </Collapsible>
  )
}

Playground.args = {
  csx: { width: 500 },
  labelHeader: 'Build for Community #1',
  content:
    'It’s all about being ready to grow and reach new levels. Have a solid foundation, modular thinking and flexible essence, and you’re building for scale. We are global but we’re audacious enough to aim for the stars.',
}

export const ActionsPanel = () => {
  const { toggle, ...props } = useCollapsibleState()

  return (
    <Collapsible state={props}>
      <CollapsibleHeader label="Actions Panel">
        <Button variant="secondary">Secondary</Button>
        <Button onClick={toggle}>Toggle Collapsible Content</Button>
      </CollapsibleHeader>
      <CollapsibleContent>
        It’s all about being ready to grow and reach new levels. Have a solid
        foundation, modular thinking and flexible essence, and you’re building
        for scale. We are global but we’re audacious enough to aim for the
        stars.
      </CollapsibleContent>
    </Collapsible>
  )
}

export const InitiallyVisible = () => {
  const state = useCollapsibleState({ visible: true })

  return (
    <Collapsible state={state}>
      <CollapsibleHeader label="Initially Visible" />
      <CollapsibleContent>
        It’s all about being ready to grow and reach new levels. Have a solid
        foundation, modular thinking and flexible essence, and you’re building
        for scale. We are global but we’re audacious enough to aim for the
        stars.
      </CollapsibleContent>
    </Collapsible>
  )
}

export const Nested = () => {
  const root = useCollapsibleState()
  const nested = useCollapsibleState()

  return (
    <Collapsible state={root}>
      <CollapsibleHeader label="Root Collapsible" />
      <CollapsibleContent>
        <Collapsible state={nested}>
          <CollapsibleHeader label="Nested Collapsible" />
          <CollapsibleContent>
            It’s all about being ready to grow and reach new levels. Have a
            solid foundation, modular thinking and flexible essence, and you’re
            building for scale. We are global but we’re audacious enough to aim
            for the stars.
          </CollapsibleContent>
        </Collapsible>
      </CollapsibleContent>
    </Collapsible>
  )
}
