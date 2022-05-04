import React from 'react'
import type { Story, Meta } from '@storybook/react'

import { Text } from '../components/Text'
import type { SwitchProps } from './index'
import { Switch, useSwitchState } from './index'

export default {
  title: 'admin-ui/Switch',
  component: Switch,
} as Meta

export const Playground: Story<SwitchProps> = (args) => {
  const [checked, setChecked] = React.useState(false)

  return (
    <Switch {...args} checked={checked} onChange={() => setChecked(!checked)} />
  )
}

Playground.args = {
  'aria-label': 'Switch',
}

export function MultipleSwitches() {
  const props = useSwitchState({ state: [] })

  return (
    <>
      <Text>State: {props.state}</Text>
      <br />
      <Switch state={props} aria-label="label1" value="switch1" />
      <Switch state={props} aria-label="label2" value="switch2" />
      <Switch state={props} aria-label="label3" value="switch3" />
    </>
  )
}

export function Disabled() {
  return (
    <>
      <Switch disabled aria-label="label1" />
      <Switch checked disabled aria-label="label2" />
    </>
  )
}
