import React from 'react'
import { Meta } from '@storybook/react'

import { CheckboxGroup } from './index'
import { Checkbox, useCheckboxState } from '../Checkbox'
import { Label } from '../Label'

export default {
  title: 'beta/forms/checkbox-group',
  component: CheckboxGroup,
} as Meta

export const Horizontal = () => {
  const state = useCheckboxState({ state: [] })

  return (
    <CheckboxGroup
      orientation="horizontal"
      size="regular"
      label="Checkbox Group Label!"
    >
      <Label>
        <Checkbox state={state} value="1" />
        First Checkbox
      </Label>
      <Label>
        <Checkbox state={state} value="2" />
        Second Checkbox
      </Label>
    </CheckboxGroup>
  )
}

export const Vertical = () => {
  const state = useCheckboxState({ state: [] })

  return (
    <CheckboxGroup orientation="vertical" label="Checkbox Group Label!">
      <Label>
        <Checkbox state={state} value="1" />
        First Checkbox
      </Label>
      <Label>
        <Checkbox state={state} value="2" />
        Second Checkbox
      </Label>
    </CheckboxGroup>
  )
}
