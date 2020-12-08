import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Radio, RadioProps, useRadioState } from './index'
import { RadioGroup } from '../RadioGroup'
import { Label } from '../Label'
import { Heading } from '../Heading'

export default {
  title: 'forms/Radio',
  component: Radio,
} as Meta

export const Playground: Story<RadioProps> = () => {
  const state = useRadioState()

  return <Radio state={state} value="playground" aria-label="playground" />
}

export function Disabled() {
  const state = useRadioState()

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
  const state = useRadioState({ state: 'oms' })
  const values = [
    'Marketplace Ecommerce',
    'B2C Commerce',
    'B2B Commerce',
    'Order Management System',
    'Disabled',
  ]

  return (
    <>
      <Heading styleOverrides={{ text: 'highlight' }}>
        Selected solution: {state.state}
      </Heading>
      <RadioGroup state={state} orientation="vertical" aria-label="Solutions">
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
