import React from 'react'
import type { Meta, Story } from '@storybook/react'

import type { RadioGroupProps, RadioProps } from './index'
import { Radio, useRadioState, RadioGroup } from './index'
import { Stack } from '../stack'
import { Box } from '../components/Box'

export default {
  title: 'admin-ui-review/radio',
  component: Radio,
  argTypes: {
    direction: {
      options: ['row', 'column'],
      control: { type: 'select' },
    },
  },
} as Meta

interface RadioGroupPlaygroundProps extends Omit<RadioGroupProps, 'state'> {
  numberOfRadios: number
}

export const RadioGroupPlayground: Story<RadioGroupPlaygroundProps> = (
  args
) => {
  const { numberOfRadios, ...restProps } = args

  const state = useRadioState()

  return (
    <Stack space="$xl">
      <RadioGroup {...restProps} state={state}>
        {[...Array(numberOfRadios)].map((_, index) => (
          <Radio value={`radio-${index}`} label={`Radio ${index}`} />
        ))}
      </RadioGroup>
      <span>Current value: {state.value}</span>
    </Stack>
  )
}

RadioGroupPlayground.args = {
  numberOfRadios: 4,
  label: 'Group Label',
  direction: 'row',
  helpText: 'Help text',
  error: false,
  errorText: 'Error text',
  optional: false,
  optionalText: 'optional',
}

export function Example() {
  const state = useRadioState()

  return (
    <Box csx={{ margin: '$xl' }}>
      <RadioGroup state={state} label="Account Type" direction="column">
        <Radio
          label="Accounts are disabled"
          helpText="Customers will only be able to check out as guests"
          value="disabled"
        />
        <Radio
          label="Accounts are optional"
          helpText="Customers will be able to check out with a customer account or as a guest"
          value="optional"
        />
      </RadioGroup>
    </Box>
  )
}

export const RadioAppearenceStates: Story<RadioProps> = (args) => {
  return <Radio {...args} />
}

RadioAppearenceStates.args = {
  value: 'Radio Value',
  label: 'Radio Label',
  disabled: false,
  checked: false,
  helpText: '',
  csx: {},
}
