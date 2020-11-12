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
  return <Stepper value={initial} minValue={1} helperText="Helper Text" />
}

export const Hover: Story<StepperProps> = () => {
  let initial: number = 1
  return <Stepper value={initial} variant="hover" />
}

export const Focus: Story<StepperProps> = () => {
  let initial: number = 1
  return <Stepper variant="focus" value={initial} maxValue={3} />
}

export const Disabled: Story<StepperProps> = () => {
  return (
    <Set orientation="horizontal">
      <Stepper value={9} disable={true} />
      <Stepper value={1} minValue={1} />
    </Set>
  )
}

export const Error: Story<StepperProps> = () => {
  let initial: number = 1
  return (
    <Stepper value={initial} variant="danger" errorMessage="Minimum of 6" />
  )
}
