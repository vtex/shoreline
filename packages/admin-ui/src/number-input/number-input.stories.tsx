import React, { useState } from 'react'
import type { Meta, Story } from '@storybook/react'

import type { NumberInputProps } from './index'
import { NumberInput } from './index'

import { experimental_I18nProvider as I18nProvider } from '../experimental'
import { Box } from '../components/Box'

export default {
  title: 'admin-ui-review/number-input',
  component: NumberInput,
} as Meta

interface NumberInputPlaygroundProps
  extends Omit<NumberInputProps, 'value' | 'onChange'> {
  hasLabel: boolean
  hasSuffix: boolean
  hasPrefix: boolean
}

export const Playground: Story<NumberInputPlaygroundProps> = (args) => {
  const {
    label,
    hasLabel,
    prefix,
    hasPrefix,
    suffix,
    hasSuffix,
    ...remainigProps
  } = args

  return (
    <I18nProvider>
      <Box csx={{ margin: '$xs' }}>
        <NumberInput
          label={hasLabel && label}
          prefix={hasPrefix && prefix}
          suffix={hasSuffix && suffix}
          {...remainigProps}
        />
      </Box>
    </I18nProvider>
  )
}

Playground.args = {
  hasLabel: true,
  optional: false,
  label: 'Number Input Label',
  min: -8,
  max: 8,
  step: 2,
  hasSuffix: false,
  suffix: 'years',
  hasPrefix: false,
  prefix: 'Age:',
  disabled: false,
  error: false,
  errorText: 'Number is not valid',
  helpText: 'Help text',
}

export const ControlledState: Story<NumberInputProps> = () => {
  const [value, setValue] = useState<number | string>('')

  const max = 8
  const min = -8

  return (
    <I18nProvider>
      <Box csx={{ margin: '$xs' }}>
        <NumberInput
          label="Label"
          min={min}
          max={max}
          helpText={`Number value: ${value}`}
          error={value > max || value < min}
          value={value}
          onChange={(nextValue) => setValue(nextValue)}
          errorText="Number is not valid"
        />
      </Box>
    </I18nProvider>
  )
}
