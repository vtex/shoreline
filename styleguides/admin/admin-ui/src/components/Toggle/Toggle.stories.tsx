import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Text } from '../Text'
import { Toggle, useToggle, ToggleProps } from './index'

export default {
  title: 'beta/Toggle',
  component: Toggle,
} as Meta

const Template: Story<ToggleProps> = (args) => {
  const [checked, setChecked] = React.useState(false)

  return (
    <Toggle
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
    <Toggle
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
  const props = useToggle({ state: [] })

  return (
    <>
      <Text>State: {props.state}</Text>
      <br />
      <Toggle {...props} aria-label="label1" value="toggle1" />
      <Toggle {...props} aria-label="label2" value="toggle2" />
      <Toggle {...props} aria-label="label3" value="toggle3" />
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
      <Toggle state={state} setState={setState} aria-label="label1" value="toggle1" />
      <Toggle state={state} setState={setState} aria-label="label2" value="toggle2" />
      <Toggle state={state} setState={setState} aria-label="label3" value="toggle3" />
    </>
  )}
</Play.CheckboxState>
    `,
  },
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
