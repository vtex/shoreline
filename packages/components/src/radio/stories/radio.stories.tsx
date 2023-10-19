import '../../../dist/styles.min.css'
import '../radio.css'
import React from 'react'

import { Radio } from '../index'
import { RadioGroup, RadioProvider } from '@ariakit/react'

export default {
  title: 'shoreline-components/radio',
}

export function Default() {
  return (
    <RadioProvider>
      <RadioGroup>
        <Radio value="opt1" />
        <Radio value="opt2" error />
        <Radio value="opt3" disabled />
        <Radio value="opt4" error disabled />
      </RadioGroup>
    </RadioProvider>
  )
}
