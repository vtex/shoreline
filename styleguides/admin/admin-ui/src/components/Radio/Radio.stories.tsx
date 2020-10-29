import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Radio, RadioProps, useRadioState } from './index'
import { unstableThemeProvider as ThemeProvider } from '../unstableThemeProvider'
import { RadioGroup } from '../RadioGroup'
import { Label } from '../Label'
import { Heading } from '../Heading'

export default {
  title: 'beta/formsRadio',
  component: Radio,
} as Meta

export const Playground: Story<RadioProps> = () => {
  const state = useRadioState()

  return (
    <ThemeProvider>
      <Radio state={state} value="playground" aria-label="playground" />
    </ThemeProvider>
  )
}

export function Disabled() {
  const state = useRadioState()

  return (
    <ThemeProvider>
      <Radio value="disabled" aria-label="label" disabled state={state} />
      <br />
      <Radio
        value="checked-disabled"
        aria-label="checked-disabled"
        checked
        disabled
        state={state}
      />
    </ThemeProvider>
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
    <ThemeProvider>
      <Heading text="highlight">Selected solution: {state.state}</Heading>
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
    </ThemeProvider>
  )
}
