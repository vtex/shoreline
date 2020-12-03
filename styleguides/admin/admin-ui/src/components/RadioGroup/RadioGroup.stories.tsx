import React from 'react'
import { Meta, Story } from '@storybook/react'

import { Radio, useRadioState } from '../Radio'
import { RadioGroup, RadioGroupProps } from './index'
import { Label } from '../Label'
import { Heading } from '../Heading'

export default {
  title: 'forms/RadioGroup',
  component: Radio,
} as Meta

export function Horizontal() {
  const radio = useRadioState({ state: 'oms' })
  const values = [
    'Marketplace Ecommerce',
    'B2C Commerce',
    'B2B Commerce',
    'Order Management System',
    'Disabled',
  ]

  return (
    <>
      <Heading styleOverrides={{ text: 'highlight' }}>Selected solution: {radio.state}</Heading>
      <RadioGroup
        state={radio}
        id="radio-group"
        orientation="horizontal"
        label="Solutions"
      >
        {values.map((value, key) => {
          return (
            <Label key={key}>
              <Radio
                value={value}
                state={radio}
                disabled={value === 'Disabled'}
              />
              {value}
            </Label>
          )
        })}
      </RadioGroup>
    </>
  )
}

export function Vertical() {
  const radio = useRadioState({ state: 'oms' })
  const values = [
    'Marketplace Ecommerce',
    'B2C Commerce',
    'B2B Commerce',
    'Order Management System',
    'Disabled',
  ]

  return (
    <>
      <Heading styleOverrides={{ text: 'highlight' }}>Selected solution: {radio.state}</Heading>
      <RadioGroup
        state={radio}
        id="radio-group"
        orientation="vertical"
        label="Solutions"
      >
        {values.map((value, key) => {
          return (
            <Label key={key}>
              <Radio
                value={value}
                state={radio}
                disabled={value === 'Disabled'}
              />
              {value}
            </Label>
          )
        })}
      </RadioGroup>
    </>
  )
}

export const WithoutLabelProp: Story<RadioGroupProps> = () => {
  const state = useRadioState()

  return (
    <>
      <Label htmlFor="radio-group-id">Fruits</Label>
      <RadioGroup id="radio-group-id" state={state}>
        <Label>
          <Radio state={state} value="Apple" />
          Apple
        </Label>
        <Label>
          <Radio state={state} value="Watermelon" />
          Watermelon
        </Label>
        <Label>
          <Radio state={state} value="Orange" />
          Orange
        </Label>
      </RadioGroup>
    </>
  )
}
