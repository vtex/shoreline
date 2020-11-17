import React from 'react'
import { Meta, Story } from '@storybook/react'

import { Stepper, StepperProps } from './index'
import { Set } from '../Set'

export default {
  title: 'beta/Stepper',
  component: Stepper,
} as Meta

export const Basic: Story<StepperProps> = () => {
  let initial: number = 1
  return (
    <Stepper
      label="stepper number"
      value={initial}
      minValue={1}
      maxValue={4}
      helperText="Helper Text"
    />
  )
}

export const Disabled: Story<StepperProps> = () => {
  return (
    <Set orientation="horizontal">
      <Stepper value={9} disable label="stepper number" />
      <Stepper value={1} minValue={1} label="stepper number" />
    </Set>
  )
}

export const Error: Story<StepperProps> = () => {
  let initial: number = 1
  return (
    <Stepper
      value={initial}
      error
      errorMessage="Minimum of 6"
      label="stepper number"
    />
  )
}
