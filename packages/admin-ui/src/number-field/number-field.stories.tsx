import React, { useState } from 'react'
import type { Meta, Story } from '@storybook/react'

import type { NumericStepperProps } from './index'
import { NumberInput } from './index'

export default {
  title: 'admin-ui-review/number-input',
  component: NumberInput,
} as Meta

export const Playground: Story<NumericStepperProps> = (args) => {
  return <NumberInput {...args} />
}

Playground.args = {
  label: 'Number Field',
  min: -4,
  max: 4,
  helperText: 'Helper Text!',
  errorText: 'Error Message!',
}

// export const Overview = () => {
//   const [value, setValue] = useState(0)

//   return (
//     <NumericStepper
//       label="numeric-stepper"
//       value={value}
//       minValue={-2}
//       maxValue={4}
//       onChange={(event) => {
//         setValue(event.value)
//       }}
//       helperText="Helper Text"
//     />
//   )
// }

// export const Disabled = () => {
//   return (
//     <NumericStepper
//       value={0}
//       onChange={() => {}}
//       disabled
//       label="numeric-stepper"
//     />
//   )
// }

// export const Error = () => {
//   const [value, setValue] = React.useState(0)

//   return (
//     <NumericStepper
//       onChange={(event) => {
//         setValue(event.value)
//       }}
//       value={value}
//       tone={value < 6 ? 'critical' : 'neutral'}
//       minValue={6}
//       criticalText="Minimum of 6"
//       label="numeric-stepper"
//     />
//   )
// }
