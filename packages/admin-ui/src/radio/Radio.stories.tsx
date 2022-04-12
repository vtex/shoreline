import React from 'react'
import type { Meta, Story } from '@storybook/react'

import type { RadioProps } from './index'
import { Radio, useRadioState } from './index'

export default {
  title: 'admin-ui-review/radio',
  component: Radio,
} as Meta

export const Playground: Story<RadioProps> = (args) => {
  const state = useRadioState()

  return <Radio {...args} state={state} />
}

Playground.args = {
  value: 'Radio Value',
  label: 'Radio Label',
  disabled: false,
  checked: false,
  csx: {},
}
