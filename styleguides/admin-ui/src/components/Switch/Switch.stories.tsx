import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Switch, useSwitch, SwitchProps } from './index'

export default {
  title: 'beta/Switch',
  component: Switch,
} as Meta

const Template: Story<SwitchProps> = (args: SwitchProps) => {
  const props = useSwitch()

  return <Switch aria-labelledby="label" {...args} {...props} />
}

export const Playground = Template.bind({})

export function WithHiddenLabel() {
  const props = useSwitch({ state: false })

  return <Switch {...props} aria-labelledby="label" />
}

export function Sizes() {
  const props = useSwitch({ state: [] })

  return (
    <>
      <Switch {...props} aria-labelledby="label" value="switch1" />
      <Switch {...props} aria-labelledby="label" size="small" value="switch2" />
    </>
  )
}

export function Disabled() {
  return (
    <>
      <Switch disabled aria-labelledby="label" />
      <Switch checked disabled aria-labelledby="label" />
      <br />
      <Switch disabled size="small" aria-labelledby="label" />
      <Switch checked disabled size="small" aria-labelledby="label" />
    </>
  )
}
