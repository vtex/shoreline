import React from 'react'
import type { Meta, Story } from '@storybook/react'

import type { RadioProps, RadioGroupProps } from './index'
import { Radio, useRadioState, RadioGroup } from './index'

export default {
  title: 'admin-ui-review/radio',
  component: Radio,
  argTypes: {
    orientation: {
      options: ['vertical', 'horizontal'],
      control: { type: 'radio' },
    },
  },
} as Meta

export const RadioPlayground: Story<RadioProps> = (args) => {
  return <Radio {...args} />
}

RadioPlayground.args = {
  value: 'Radio Value',
  label: 'Radio Label',
  disabled: false,
  checked: false,
  csx: {},
}

interface RadioGroupPlaygroundProps extends Omit<RadioGroupProps, 'state'> {
  numberOfRadios: number
}

export const RadioGroupPlayground: Story<RadioGroupPlaygroundProps> = (
  args
) => {
  const { numberOfRadios, ...restProps } = args

  const state = useRadioState()

  return (
    <div>
      <RadioGroup {...restProps} state={state}>
        {[...Array(numberOfRadios)].map((_, index) => (
          <Radio value={`radio-${index}`} label={`Radio ${index}`} />
        ))}
      </RadioGroup>
      <br />
      <span>Current value: {state.value}</span>
    </div>
  )
}

RadioGroupPlayground.args = {
  numberOfRadios: 4,
  label: 'Group Label',
  orientation: 'horizontal',
  helperText: 'Helper Text!',
  error: false,
  errorMessage: 'Error Message!',
}
