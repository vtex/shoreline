// TODO: Does it make sense to rename the
// `checked` property to `active`?
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
      <Switch state={props} aria-label="label1" value="switch2" label="Label" />
      <Switch
        state={props}
        aria-label="label1"
        value="switch3"
        label="Label"
        helperText="Help Text"
      />
      <Switch
        state={props}
        aria-label="label1"
        value="switch4"
        label="Label"
        errorText="Error Text"
      />{' '}
      <Switch
        state={props}
        aria-label="label1"
        value="switch5"
        label="Label"
        helperText="Help Text"
        errorText="Error Text"
      />
      <Switch
        state={props}
        aria-label="label3"
        value="switch6"
        helperText="Help Text"
      />
      <Switch
        state={props}
        aria-label="label4"
        value="switch7"
        errorText="Error Text"
      />
    </>
  )
}

export function Active() {
  return (
    <>
      <Switch checked aria-label="label1" />
      <Switch checked aria-label="label2" helperText="Help Text" />
      <Switch checked disabled aria-label="label3" />
    </>
  )
}

export function Inactive() {
  return (
    <>
      <Switch disabled aria-label="label1" />
      <Switch checked disabled aria-label="label2" />
      <Switch checked disabled aria-label="label2" helperText="Help Text" />
    </>
  )
}
