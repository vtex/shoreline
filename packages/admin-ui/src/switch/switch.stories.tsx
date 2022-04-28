// TODO: Does it make sense to rename the
// `checked` property to `active`?
import React from 'react'
import type { Story, Meta } from '@storybook/react'

import { Text } from '../components/Text'
import type { SwitchProps } from './types'
import { Switch, useSwitchState } from './index'
import { Stack } from '../stack'

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
const helpText = 'Help text'
const errorText = 'Error text'

Playground.args = {
  'aria-label': 'Switch',
  label,
  helpText,
  errorText,
  error: true,
  disabled: false,
}

export function Variants() {
  const props = useSwitchState({ state: [] })

  return (
    <Stack
      csx={{
        margin: '1rem',
        '> div > *:not(:first-child):not(:nth-child(2))': {
          marginTop: '3.75rem',
        },
      }}
    >
      <Stack>
        <Text variant="title1">Label only</Text>
        <Switch
          state={props}
          aria-label="label1"
          label={label}
          value="switch1"
        />
        <Switch
          state={props}
          aria-label="label2"
          value="switch2"
          label={label}
          disabled
        />
        <Switch aria-label="label2" label={label} disabled checked />
      </Stack>
      <Stack>
        <Text variant="title1">With error text</Text>
        <Switch
          state={props}
          aria-label="label3"
          value="switch3"
          label={label}
          errorText={errorText}
          error
        />
        <Switch
          state={props}
          aria-label="label4"
          value="switch4"
          label={label}
          errorText={errorText}
          disabled
          error
        />
        <Switch
          aria-label="label2"
          label={label}
          disabled
          checked
          errorText={errorText}
          error
        />
      </Stack>
      <Stack>
        <Text variant="title1">With help text</Text>
        <Switch
          state={props}
          aria-label="label5"
          label={label}
          value="switch5"
          helpText={helpText}
        />
        <Switch
          state={props}
          aria-label="label6"
          label={label}
          value="switch6"
          helpText={helpText}
          disabled
        />
        <Switch
          aria-label="label2"
          label={label}
          disabled
          checked
          helpText={helpText}
        />
      </Stack>
      <Stack>
        <Text variant="title1">With help and error texts</Text>
        <Switch
          state={props}
          aria-label="label7"
          label={label}
          value="switch7"
          helpText={helpText}
          errorText={errorText}
          error
        />
        <Switch
          state={props}
          aria-label="label8"
          label={label}
          value="switch8"
          helpText={helpText}
          errorText={errorText}
          disabled
          error
        />
        <Switch
          aria-label="label2"
          label={label}
          disabled
          checked
          helpText={helpText}
          errorText={errorText}
          error
        />
      </Stack>
      <br />
      <Text>State: {props.state}</Text>
    </Stack>
  )
}
