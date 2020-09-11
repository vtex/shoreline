import React from 'react'
import { Meta, Story } from '@storybook/react'

import { Checkbox, useCheckbox, CheckboxProps } from './index'
import { Text } from '../Text'

export default {
  title: 'beta/Checkbox',
  component: Checkbox,
} as Meta

const Template: Story<Omit<CheckboxProps, 'checked'>> = (
  args: Omit<CheckboxProps, 'checked'>
) => {
  const props = useCheckbox({ state: false })

  return <Checkbox {...args} {...props} />
}

export const Playground = Template.bind({})

export const Size = () => {
  const props = useCheckbox({ state: ['1'] })

  return (
    <>
      <Checkbox {...props} value="1" />
      <Checkbox {...props} value="2" size="small" />
    </>
  )
}

export const Disabled = () => {
  const props = useCheckbox({ state: ['1'] })

  return (
    <>
      <Checkbox {...props} checked value="1" disabled />
      <Checkbox {...props} value="2" disabled />
    </>
  )
}

export const MultipleCheckboxes = () => {
  const props = useCheckbox({ state: [] })

  return (
    <>
      <Text>Checkboxes marked: {props.state}</Text>
      <Checkbox {...props} value="checkbox1" />
      <Checkbox {...props} value="checkbox2" />
      <Checkbox {...props} value="checkbox3" />
    </>
  )
}
