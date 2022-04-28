// TODO: Does it make sense to rename the
// `checked` property to `active`?
import React from 'react'
import type { Story, Meta } from '@storybook/react'

import { Text } from '../components/Text'
import type { SwitchProps } from './types'
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

const label = 'Label'
const helpText = 'Help Text'
const errorText = 'Error Text'

Playground.args = {
  'aria-label': 'Switch',
  label,
  helpText,
  errorText,
  error: true,
}

export function MultipleSwitches() {
  const props = useSwitchState({ state: [] })

  return (
    <>
      <Text>State: {props.state}</Text>
      <br />
      <Switch state={props} aria-label="label1" label={label} value="switch1" />
      <Switch
        state={props}
        aria-label="label1"
        value="switch3"
        label={label}
        helpText={helpText}
      />
      <Switch
        state={props}
        aria-label="label1"
        value="switch4"
        label={label}
        errorText={errorText}
      />{' '}
      <Switch
        state={props}
        aria-label="label1"
        value="switch5"
        label={label}
        helpText={helpText}
        errorText={errorText}
      />
      <Switch
        state={props}
        aria-label="label3"
        label={label}
        value="switch6"
        helpText={helpText}
      />
      <Switch
        state={props}
        aria-label="label4"
        label={label}
        value="switch7"
        errorText={errorText}
      />
    </>
  )
}

export function Active() {
  return (
    <>
      <Switch checked aria-label="label2" helpText={helpText} label={label} />
      <Switch
        checked
        aria-label="label1"
        label={label}
        error
        errorText={errorText}
      />
      <Switch checked disabled aria-label="label3" label={label} />
    </>
  )
}

export function Inactive() {
  return (
    <>
      <Switch disabled aria-label="label1" label={label} />
      <Switch checked disabled aria-label="label2" label={label} />
      <Switch
        checked
        disabled
        aria-label="label2"
        helpText={helpText}
        label={label}
      />
    </>
  )
}
