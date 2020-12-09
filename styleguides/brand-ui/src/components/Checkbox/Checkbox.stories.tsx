import React from 'react'
import { Meta } from '@storybook/react'

import { Checkbox, CheckboxProps, useCheckboxState } from './index'

export default {
  title: 'beta/Checkbox',
  component: Checkbox,
} as Meta

const Template = (args: CheckboxProps) => {
  const [checked, setChecked] = React.useState(false)

  return (
    <Checkbox
      checked={checked}
      onClick={() => setChecked(!checked)}
      {...args}
    />
  )
}

export const Playground = Template.bind({})
Playground.args = {
  label: "At least I'm trying.",
}

export const MultipleCheckboxes = () => {
  const checkbox = useCheckboxState({ state: [] })
  const selectedItems = checkbox.state as string[]

  return (
    <>
      <p>You selected these albums: {selectedItems.join(', ')}</p>
      <Checkbox {...checkbox} label="reputation" value="reputation" />
      <Checkbox {...checkbox} label="Lover" value="lover" />
      <Checkbox {...checkbox} label="folklore" value="folklore" />
    </>
  )
}

export const States = () => (
  <>
    <Checkbox label="Checked" checked />
    <Checkbox label="Not checked" />
    <Checkbox label="Disabled and checked" disabled checked />
    <Checkbox label="Disabled and not checked" disabled />
    <Checkbox label="Error" error errorMessage="At least I'm trying..." />
  </>
)
