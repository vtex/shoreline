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

Horizontal.parameters = {
  playroom: {
    code: `
<Play.CheckboxState state={[]}>
  {(checkboxProps) => (
    <CheckboxGroup orientation="horizontal" label="Checkbox Group Label!">
      <Label>
        <Checkbox {...checkboxProps} value="1" />
        First Checkbox
      </Label>
      <Label>
        <Checkbox {...checkboxProps} value="2" />
        Second Checkbox
      </Label>
    </CheckboxGroup>
  )}
</Play.CheckboxState>
    `,
  },
}

export const Vertical = () => {
  const checkboxProps = useCheckbox({ state: [] })

  return (
    <CheckboxGroup orientation="vertical" label="Checkbox Group Label!">
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

Vertical.parameters = {
  playroom: {
    code: `
<Play.CheckboxState state={[]}>
  {(checkboxProps) => (
    <CheckboxGroup orientation="vertical" label="Checkbox Group Label!">
      <Label>
        <Checkbox {...checkboxProps} value="1" />
        First Checkbox
      </Label>
      <Label>
        <Checkbox {...checkboxProps} value="2" />
        Second Checkbox
      </Label>
    </CheckboxGroup>
  )}
</Play.CheckboxState>
    `,
  },
}
