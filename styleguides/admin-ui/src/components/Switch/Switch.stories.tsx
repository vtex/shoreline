import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Text } from '../Text'
import { Switch, useSwitch, SwitchProps } from './index'

export default {
  title: 'beta/Switch',
  component: Switch,
} as Meta

const Template: Story<SwitchProps> = (args) => {
  const [checked, setChecked] = React.useState(false)

  return (
    <Switch
      aria-label="label"
      checked={checked}
      onChange={() => setChecked(!checked)}
      {...args}
    />
  )
}

export const Playground = Template.bind({})
Playground.parameters = {
  playroom: {
    code: `
<Play.ToggleState>
  {({ toggle, setToggle }) => (
    <Switch
      aria-label="label"
      checked={toggle}
      onChange={() => setToggle(!toggle)}
    />
  )}
</Play.ToggleState>
    `,
  },
}

export function MultipleSwitches() {
  const props = useSwitch({ state: [] })

  return (
    <>
      <Text>State: {props.state}</Text>
      <br />
      <Switch {...props} aria-label="label1" value="switch1" />
      <Switch {...props} aria-label="label2" value="switch2" />
      <Switch {...props} aria-label="label3" value="switch3" />
    </>
  )
}

MultipleSwitches.parameters = {
  playroom: {
    code: `
<Play.CheckboxState state={[]}>
  {({ state, setState }) => (
    <>
      <Text>State: {state}</Text>
      <br />
      <Switch state={state} setState={setState} aria-label="label1" value="switch1" />
      <Switch state={state} setState={setState} aria-label="label2" value="switch2" />
      <Switch state={state} setState={setState} aria-label="label3" value="switch3" />
    </>
  )}
</Play.CheckboxState>
    `,
  },
}

export function Disabled() {
  return (
    <>
      <Switch disabled aria-label="label1" />
      <Switch checked disabled aria-label="label2" />
      <br />
      <Switch disabled size="small" aria-label="label3" />
      <Switch checked disabled size="small" aria-label="label4" />
    </>
  )
}
