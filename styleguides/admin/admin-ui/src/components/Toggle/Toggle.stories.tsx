import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Text } from '../Text'
import { Toggle, useToggleState, ToggleProps } from './index'
import { unstableThemeProvider as ThemeProvider } from '../unstableThemeProvider'

export default {
  title: 'beta/Toggle',
  component: Toggle,
} as Meta

const Template: Story<ToggleProps> = (args) => {
  const [checked, setChecked] = React.useState(false)

  return (
    <ThemeProvider>
      <Toggle
        aria-label="label"
        checked={checked}
        onChange={() => setChecked(!checked)}
        {...args}
      />
    </ThemeProvider>
  )
}

export const Playground = Template.bind({})

export function MultipleSwitches() {
  const props = useToggleState({ state: [] })

  return (
    <ThemeProvider>
      <Text>State: {props.state}</Text>
      <br />
      <Toggle state={props} aria-label="label1" value="toggle1" />
      <Toggle state={props} aria-label="label2" value="toggle2" />
      <Toggle state={props} aria-label="label3" value="toggle3" />
    </ThemeProvider>
  )
}

export function Disabled() {
  return (
    <ThemeProvider>
      <Toggle disabled aria-label="label1" />
      <Toggle checked disabled aria-label="label2" />
      <br />
      <Toggle disabled size="small" aria-label="label3" />
      <Toggle checked disabled size="small" aria-label="label4" />
    </ThemeProvider>
  )
}
