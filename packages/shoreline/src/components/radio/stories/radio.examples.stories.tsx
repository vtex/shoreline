import React, { useEffect, useState } from 'react'

import { Radio, RadioGroup, useRadioState } from '../index'

export default {
  title: 'components/radio/examples',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function Controlled() {
  const [value, setValue] = useState<string>()
  const state = useRadioState({
    value,
    setValue: setValue as any,
  })

  const [helpText, setHelpText] = useState('')

  useEffect(() => {
    if (value === 'opt4') {
      setHelpText('Pen pinapple apple pen!')
    } else {
      setHelpText('')
    }
  }, [value])

  return (
    <RadioGroup
      label="Vertical radio group"
      errorText="Something is wrong"
      state={state}
      description={helpText}
    >
      <Radio value="opt1">Pen</Radio>
      <Radio value="opt2">Pineapple</Radio>
      <Radio value="opt3">Apple</Radio>
      <Radio value="opt4">Another pen</Radio>
    </RadioGroup>
  )
}
