import React from 'react'
import { Story, Meta } from '@storybook/react'
import { VisuallyHidden } from 'reakit'

import { Switch, useSwitch, SwitchProps } from './index'

export default {
  title: 'beta/Switch',
  component: Switch,
} as Meta

const Template: Story<SwitchProps> = (args: SwitchProps) => {
  const props = useSwitch()

  return <Switch label="your label goes here!" {...args} {...props} />
}

export const Playground = Template.bind({})

export function WithHiddenLabel() {
  const props = useSwitch({ state: false })

  const HiddenLabel = () => <VisuallyHidden>Label</VisuallyHidden>

  return <Switch {...props} label={HiddenLabel} />
}

export function Sizes() {
  const props = useSwitch({ state: [] })

  const HiddenLabel = () => <VisuallyHidden>Label</VisuallyHidden>

  return (
    <>
      <Switch {...props} label={HiddenLabel} value="switch1" />
      <Switch {...props} label={HiddenLabel} size="small" value="switch2" />
    </>
  )
}

export function Disabled() {
  const HiddenLabel = () => <VisuallyHidden>Label</VisuallyHidden>

  return (
    <>
      <Switch disabled label={HiddenLabel} />
      <Switch checked disabled label={HiddenLabel} />
      <br />
      <Switch disabled size="small" label={HiddenLabel} />
      <Switch checked disabled size="small" label={HiddenLabel} />
    </>
  )
}
