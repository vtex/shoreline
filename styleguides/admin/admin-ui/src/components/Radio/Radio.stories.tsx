import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Radio, RadioProps, useRadio } from './index'
import { RadioGroup } from '../RadioGroup'
import { Text } from '../Text'
import { Label } from '../Label'

export default {
  title: 'beta/Radio',
  component: Radio,
} as Meta

export const Playground: Story<RadioProps> = () => {
  const state = useRadio()

  return <Radio state={state} value="playground" aria-label="playground" />
}

Playground.parameters = {
  playroom: {
    code: `
<Play.RadioState>
  {(state) => (
    <Radio state={state} value="playground" aria-label="playground" />
  )}
</Play.RadioState>
    `,
  },
}

export function Disabled() {
  const state = useRadio()

  return (
    <>
      <Radio value="disabled" aria-label="label" disabled state={state} />
      <br />
      <Radio
        value="checked-disabled"
        aria-label="checked-disabled"
        checked
        disabled
        state={state}
      />
    </>
  )
}

export function Group() {
  const state = useRadio({ state: 'oms' })
  const values = [
    'Marketplace Ecommerce',
    'B2C Commerce',
    'B2B Commerce',
    'Order Management System',
    'Disabled',
  ]

  return (
    <>
      <Text variant="subtitle">Selected solution: {state.state}</Text>
      <RadioGroup {...state} orientation="vertical" aria-label="Solutions">
        {values.map((value, key) => {
          return (
            <Label key={key}>
              <Radio
                value={value}
                state={state}
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

Group.parameters = {
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
        orientation="vertical"
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
