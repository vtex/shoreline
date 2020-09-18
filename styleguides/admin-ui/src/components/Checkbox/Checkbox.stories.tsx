import React from 'react'
import { Meta, Story } from '@storybook/react'

import { Checkbox, useCheckbox, CheckboxProps } from './index'
import { Text } from '../Text'

export default {
  title: 'beta/Checkbox',
  component: Checkbox,
} as Meta

const Template: Story<Omit<CheckboxProps, 'checked'>> = (args) => {
  const [checked, setChecked] = React.useState(false)

  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={() => setChecked(!checked)}
    />
  )
}

export const Playground = Template.bind({})
Playground.args = {
  'aria-label': 'label',
}

export const MultipleCheckboxes = () => {
  const props = useCheckbox({ state: [] })

  return (
    <>
      <Text>Checkboxes marked: {props.state}</Text>
      <Checkbox {...props} aria-label="label" value="checkbox1" />
      <Checkbox {...props} aria-label="label" value="checkbox2" />
      <Checkbox {...props} aria-label="label" value="checkbox3" />
    </>
  )
}

export const Disabled = () => {
  return (
    <>
      <Checkbox checked disabled />
      <Checkbox disabled />
    </>
  )
}
