import React, { Fragment } from 'react'
import { Story, Meta } from '@storybook/react'

import { Radio, RadioGroup, RadioProps, useRadioState } from './index'
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

export function Standalone() {
  const state = useRadioState()

  return <Radio value="standalone" aria-label="label" state={state} />
}

export function WithHiddenLabel() {
  const state = useRadioState()

  return <Radio value="With hidden label" state={state} />
}

export function Group() {
  const radio = useRadioState({ state: 'oms' })
  const values = [
    'Maketplace Ecommerce',
    'B2C Commerce',
    'B2B Commerce',
    'Order Management System',
    'Disabled',
  ]

  return (
    <Fragment>
      <Text variant="subtitle">Selected solution: {radio.state}</Text>
      <RadioGroup
        sx={{ variant: 'forms.controlGroup-vertical-regular' }}
        {...radio}
        label="Solutions"
      >
        {values.map((value, key) => {
          return (
            <Label key={key}>
              <Radio
                value={value}
                state={radio}
                disabled={value === 'Disabled'}
                sx={{ marginRight: '5' }}
              />
              {value}
            </Label>
          )
        })}
      </RadioGroup>
    </Fragment>
  )
}
