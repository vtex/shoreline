import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Switch, useSwitch, SwitchProps } from './index'

export default {
  title: 'beta/Switch',
  component: Switch,
} as Meta

const Template: Story<SwitchProps> = (args: SwitchProps) => {
  const props = useSwitch()

  return <Switch {...args} {...props} />
}

export const Playground = Template.bind({})

export function Sizes() {
  const props = useSwitch({ state: [] })

  return (
    <>
      <Switch {...props} value="switch1" />
      <Switch {...props} size="small" value="switch2" />
    </>
  )
}

export function Disabled() {
  return (
    <>
      <Switch disabled />
      <Switch checked disabled />
      <br />
      <Switch disabled size="small" />
      <Switch checked disabled size="small" />
    </>
  )
}
