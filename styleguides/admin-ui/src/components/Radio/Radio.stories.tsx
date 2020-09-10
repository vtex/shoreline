import React, { Fragment } from 'react'
import { Story, Meta } from '@storybook/react'
import { VisuallyHidden } from 'reakit'

import { Radio, RadioGroup, RadioProps, useRadioState } from './index'
import { Text } from '../Text'

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

  return <Radio value="standalone" label="Standalone" state={state} />
}

export function WithHiddenLabel() {
  const state = useRadioState()

  return (
    <Radio
      value="With hidden label"
      label={<VisuallyHidden>This is hidden</VisuallyHidden>}
      state={state}
    />
  )
}

export function Group() {
  const radio = useRadioState()

  return (
    <Fragment>
      <Text variant="subtitle">Selected solution: {radio.state}</Text>
      <RadioGroup sx={{ paddingTop: 8 }} {...radio} label="Solutions">
        <Radio value="marketplace" label="Maketplace Ecommerce" state={radio} />
        <Radio value="b2c" label="B2C Commerce" state={radio} />
        <Radio value="b2b" label="B2B Commerce" state={radio} />
        <Radio value="oms" label="Order Management System" state={radio} />
      </RadioGroup>
    </Fragment>
  )
}
