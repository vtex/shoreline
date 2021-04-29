import React from 'react'
import { Meta, Story } from '@storybook/react'

import { Radio, useRadioState } from '../Radio'
import { RadioGroup } from './index'
import { Label } from '@vtex/admin-components'
import { Heading } from '@vtex/admin-components'

export default {
  title: 'admin-ui/RadioGroup',
  component: RadioGroup,
} as Meta

export const Playground: Story = (args) => {
  const radio = useRadioState({ state: 'oms' })
  const values = [
    'Marketplace Ecommerce',
    'B2C Commerce',
    'B2B Commerce',
    'Order Management System',
    'Disabled',
  ]

  return (
    <RadioGroup {...args} state={radio}>
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
  )
}

Playground.args = {
  id: 'radio-group',
  label: 'Solutions',
}

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
      <Heading csx={{ text: 'highlight' }}>
        Selected solution: {radio.state}
      </Heading>
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
      <Heading csx={{ text: 'highlight' }}>
        Selected solution: {radio.state}
      </Heading>
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

export function WithoutLabelProp() {
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
