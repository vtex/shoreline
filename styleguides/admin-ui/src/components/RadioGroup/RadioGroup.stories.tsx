import React, { Fragment } from 'react'
import { Meta, Story } from '@storybook/react'

import { Radio, useRadio } from '../Radio'
import { RadioGroup, RadioGroupProps } from './index'
import { Text } from '../Text'
import { Label } from '../Label'

export default {
  title: 'alpha/RadioGroup',
  component: Radio,
} as Meta

export function Horizontal() {
  const radio = useRadio({ state: 'oms' })
  const values = [
    'Marketplace Ecommerce',
    'B2C Commerce',
    'B2B Commerce',
    'Order Management System',
    'Disabled',
  ]

  return (
    <Fragment>
      <Text variant="subtitle">Selected solution: {radio.state}</Text>
      <RadioGroup
        {...radio}
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
    </Fragment>
  )
}

Horizontal.parameters = {
  playroom: {
    code: `
<Play.RadioState>
  {(state) => (
    <>
      <Text variant="subtitle">Selected solution: {state.state}</Text>
      <RadioGroup
        {...state}
        id="radio-group"
        label="Solutions"
      >
        <Label>
          <Radio state={state} value="Marketplace Ecommerce" />
          Marketplace Ecommerce
        </Label>
        <Label>
          <Radio state={state} value="B2C Commerce" />
          B2C Commerce
        </Label>
        <Label>
          <Radio state={state} value="B2B Commerce" />
          B2B Commerce
        </Label>
        <Label>
          <Radio state={state} value="Order Management System" />
          Order Management System
        </Label>
        <Label>
          <Radio state={state} disabled value="Disabled" />
          Disabled
        </Label>      
      </RadioGroup>
    </>
  )}
</Play.RadioState>
    `,
  },
}

export function Vertical() {
  const radio = useRadio({ state: 'oms' })
  const values = [
    'Marketplace Ecommerce',
    'B2C Commerce',
    'B2B Commerce',
    'Order Management System',
    'Disabled',
  ]

  return (
    <Fragment>
      <Text variant="subtitle">Selected solution: {radio.state}</Text>
      <RadioGroup
        {...radio}
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
    </Fragment>
  )
}

Vertical.parameters = {
  playroom: {
    code: `
<Play.RadioState>
  {(state) => (
    <>
      <Text variant="subtitle">Selected solution: {state.state}</Text>
      <RadioGroup
        {...state}
        id="radio-group"
        orientation="vertical"
        label="Solutions"
      >
        <Label>
          <Radio state={state} value="Marketplace Ecommerce" />
          Marketplace Ecommerce
        </Label>
        <Label>
          <Radio state={state} value="B2C Commerce" />
          B2C Commerce
        </Label>
        <Label>
          <Radio state={state} value="B2B Commerce" />
          B2B Commerce
        </Label>
        <Label>
          <Radio state={state} value="Order Management System" />
          Order Management System
        </Label>
        <Label>
          <Radio state={state} disabled value="Disabled" />
          Disabled
        </Label>      
      </RadioGroup>
    </>
  )}
</Play.RadioState>
    `,
  },
}

export const WithoutLabelProp: Story<RadioGroupProps> = () => {
  const state = useRadio()

  return (
    <Fragment>
      <Label htmlFor="radio-group-id">Fruits</Label>
      <RadioGroup id="radio-group-id" {...state}>
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
    </Fragment>
  )
}

WithoutLabelProp.parameters = {
  playroom: {
    code: `
<Play.RadioState>
  {(state) => (
    <>
      <Label htmlFor="radio-group-id">Fruits</Label>
      <RadioGroup id="radio-group-id" {...state}>
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
  )}
</Play.RadioState>
    `,
  },
}
