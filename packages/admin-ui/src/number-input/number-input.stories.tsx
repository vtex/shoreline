import React, { useState } from 'react'
import type { Meta, Story } from '@storybook/react'

import type { NumberInputProps } from './index'
import { NumberInput } from './index'

import { experimental_I18nProvider as I18nProvider } from '../experimental'

import { Button } from '../button'

import { IconMagnifyingGlass, IconArrowsClockwise } from '@vtex/phosphor-icons'
import { csx } from '@vtex/admin-ui-core'

export default {
  title: 'admin-ui-review/number-input',
  component: NumberInput,
} as Meta

interface NumberInputPlaygroundProps
  extends Omit<NumberInputProps, 'value' | 'onChange'> {
  hasLabel: boolean
  hasSuffix: boolean
  hasPrefix: boolean
  hasHelpText: boolean
}

export const Playground: Story<NumberInputPlaygroundProps> = (args) => {
  const {
    label,
    hasLabel,
    prefix,
    hasPrefix,
    suffix,
    hasSuffix,
    hasHelpText,
    helpText,
    ...remainigProps
  } = args

  return (
    <I18nProvider>
      <div className={csx({ margin: '$space-1 $space-2' })}>
        <NumberInput
          label={hasLabel && label}
          helpText={hasHelpText && helpText}
          prefix={hasPrefix && prefix}
          suffix={hasSuffix && suffix}
          {...remainigProps}
        />
      </div>
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
  hasHelpText: true,
  helpText: 'Help text',
}

export const ControlledState: Story<NumberInputProps> = () => {
  const [value, setValue] = useState<number | string>('')

  const max = 8
  const min = -8

  return (
    <I18nProvider>
      <div className={csx({ margin: '$space-1 $space-2' })}>
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
      </div>
    </I18nProvider>
  )
}

export const WithTerms: Story<NumberInputProps> = () => {
  const [value, setValue] = useState<number | string>('')

  return (
    <I18nProvider>
      <div className={csx({ margin: '$space-1 $space-2' })}>
        <NumberInput
          prefix={<IconMagnifyingGlass />}
          value={value}
          onChange={(newValue) => setValue(newValue)}
          suffix={
            <Button
              variant="tertiary"
              icon={<IconArrowsClockwise />}
              aria-label="Reset"
              onClick={() => setValue('')}
              bleedY
              bleedX
            />
          }
        />
      </div>
    </I18nProvider>
  )
}
