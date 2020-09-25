import React, { Fragment } from 'react'
import { Story, Meta } from '@storybook/react'

import { Radio, RadioProps, useRadioState } from './index'
import { RadioGroup } from '../RadioGroup'
import { Text } from '../Text'
import { Label } from '../Label'

export default {
  title: 'alpha/Radio',
  component: Radio,
} as Meta

const Template: Story<RadioProps> = (args) => {
  const state = useRadioState()

  return <Radio {...args} state={state} />
}

export const Playground = Template.bind({})
Playground.args = {
  value: 'playground',
  label: 'Playground',
}

export function Disabled() {
  const state = useRadioState()

  return (
    <>
      <Radio value="standalone" aria-label="label" disabled state={state} />
      <br />
      <Radio value="checked-disabled" checked disabled state={state} />
    </>
  )
}

export function Group() {
  const radio = useRadioState({ state: 'oms' })
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
      <RadioGroup {...radio} orientation="vertical" aria-label="Solutions">
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
