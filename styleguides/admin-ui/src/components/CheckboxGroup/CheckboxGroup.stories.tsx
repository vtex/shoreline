import React from 'react'
import { Meta } from '@storybook/react'

import { CheckboxGroup } from './index'
import { Checkbox, useCheckbox } from '../Checkbox'
import { Label } from '../Label'

export default {
  title: 'beta/CheckboxGroup',
  component: CheckboxGroup,
} as Meta

export const Horizontal = () => {
  const checkboxProps = useCheckbox({ state: [] })

  return (
    <CheckboxGroup
      orientation="horizontal"
      size="regular"
      label="Checkbox Group Label!"
    >
      <Label>
        <Checkbox {...checkboxProps} value="1" />
        First Checkbox
      </Label>
      <Label>
        <Checkbox {...checkboxProps} value="2" />
        Second Checkbox
      </Label>
    </CheckboxGroup>
  )
}

export const Vertical = () => {
  const checkboxProps = useCheckbox({ state: [] })

  return (
    <CheckboxGroup
      orientation="vertical"
      size="regular"
      label="Checkbox Group Label!"
    >
      <Label>
        <Checkbox {...checkboxProps} value="1" />
        First Checkbox
      </Label>
      <Label>
        <Checkbox {...checkboxProps} value="2" />
        Second Checkbox
      </Label>
    </CheckboxGroup>
  )
}
