import React, { Fragment } from 'react'
import { Meta } from '@storybook/react'

import { Radio, useRadioState } from '../Radio'
import { RadioGroup } from './index'
import { Text } from '../Text'
import { Label } from '../Label'

export default {
  title: 'alpha/RadioGroup',
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
    <Fragment>
      <Text variant="subtitle">Selected solution: {radio.state}</Text>
      <RadioGroup {...radio} orientation="horizontal" label="Solutions">
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
    <Fragment>
      <Text variant="subtitle">Selected solution: {radio.state}</Text>
      <RadioGroup {...radio} orientation="vertical" label="Solutions">
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
