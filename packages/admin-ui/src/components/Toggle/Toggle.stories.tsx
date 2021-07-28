import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Text } from '../Text'
import { Toggle, useToggleState, ToggleProps } from './index'

export default {
  title: 'admin-ui/Toggle',
  component: Toggle,
} as Meta

export const Playground: Story<ToggleProps> = (args) => {
  const [checked, setChecked] = React.useState(false)

  return (
    <Toggle {...args} checked={checked} onChange={() => setChecked(!checked)} />
  )
}

Playground.args = {
  'aria-label': 'Toggle',
}

export function MultipleSwitches() {
  const props = useToggleState({ state: [] })

  return (
    <>
      <Text>State: {props.state}</Text>
      <br />
      <Toggle state={props} aria-label="label1" value="toggle1" />
      <Toggle state={props} aria-label="label2" value="toggle2" />
      <Toggle state={props} aria-label="label3" value="toggle3" />
    </>
  )
}

export function Disabled() {
  return (
    <>
      <Toggle disabled aria-label="label1" />
      <Toggle checked disabled aria-label="label2" />
      <br />
      <Toggle disabled size="small" aria-label="label3" />
      <Toggle checked disabled size="small" aria-label="label4" />
    </>
  )
}
