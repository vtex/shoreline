import React, { useState } from 'react'
import { Meta, Story } from '@storybook/react'

import { NumericStepper, NumericStepperProps } from './index'
import { Set } from '../Set'

export default {
  title: 'forms/NumericStepper',
  component: NumericStepper,
} as Meta

export const Overview: Story<NumericStepperProps> = () => {
  const [value, setValue] = useState(0)

  return (
    <NumericStepper
      label="numeric-stepper"
      value={value}
      minValue={-2}
      maxValue={4}
      onChange={(event) => {
        setValue(event.value)
      }}
      helperText="Helper Text"
    />
  )
}

export const Disabled: Story<NumericStepperProps> = () => {
  return (
    <Set orientation="horizontal">
      <NumericStepper
        value={0}
        onChange={() => {}}
        disabled
        label="numeric-stepper"
      />
    </Set>
  )
}

export const Error: Story<NumericStepperProps> = () => {
  const [value, setValue] = React.useState(0)

  return (
    <NumericStepper
      onChange={(event) => {
        setValue(event.value)
      }}
      value={value}
      error={value < 6}
      minValue={6}
      errorMessage="Minimum of 6"
      label="numeric-stepper"
    />
  )
}
