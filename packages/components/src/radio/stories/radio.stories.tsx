import React, { useEffect, useState } from 'react'

import { Radio, RadioGroup, useRadioState } from '../index'
import { Stack } from '../../stack'

export default {
  title: 'shoreline-components/radio',
}

export function Default() {
  return (
    <RadioGroup label="">
      <Radio value="opt1">label</Radio>
      <Radio value="opt2" error>
        label
      </Radio>
      <Radio value="opt3" disabled>
        label
      </Radio>
      <Radio value="opt4" checked error disabled>
        label
      </Radio>
    </RadioGroup>
  )
}

export function RadioGroups() {
  return (
    <Stack>
      <RadioGroup label="Vertical radio group" errorText="Something is wrong">
        <Radio value="opt1">Pen</Radio>
        <Radio value="opt2">Pineapple</Radio>
        <Radio value="opt3">Apple</Radio>
        <Radio value="opt4">Another pen</Radio>
      </RadioGroup>
      <RadioGroup label="Horizontal radio group" direction="row">
        <Radio value="opt1">Pen</Radio>
        <Radio value="opt2">Pineapple</Radio>
        <Radio value="opt3">Apple</Radio>
        <Radio value="opt4">Another pen</Radio>
      </RadioGroup>
    </Stack>
  )
}

export function Error() {
  return (
    <Stack>
      <RadioGroup
        label="Vertical radio group"
        errorText="Something is wrong"
        error
      >
        <Radio value="opt1">Pen</Radio>
        <Radio value="opt2">Pineapple</Radio>
        <Radio value="opt3">Apple</Radio>
        <Radio value="opt4">Another pen</Radio>
      </RadioGroup>
      <RadioGroup
        label="Horizontal radio group"
        direction="row"
        errorText="Something is wrong"
        error
      >
        <Radio value="opt1">Pen</Radio>
        <Radio value="opt2">Pineapple</Radio>
        <Radio value="opt3">Apple</Radio>
        <Radio value="opt4">Another pen</Radio>
      </RadioGroup>
      <RadioGroup
        label="Horizontal radio group"
        direction="row"
        errorText="Something is wrong"
        error
      >
        <Radio value="opt1" error>
          Pen
        </Radio>
        <Radio value="opt2" error>
          Pineapple
        </Radio>
        <Radio value="opt3" error>
          Apple
        </Radio>
        <Radio value="opt4" error>
          Another pen
        </Radio>
      </RadioGroup>
    </Stack>
  )
}

export function Help() {
  return (
    <Stack>
      <RadioGroup
        label="Vertical radio group"
        errorText="Something is wrong"
        helpText="Pen pinapple apple pen"
      >
        <Radio value="opt1">Pen</Radio>
        <Radio value="opt2">Pineapple</Radio>
        <Radio value="opt3">Apple</Radio>
        <Radio value="opt4">Another pen</Radio>
      </RadioGroup>

      <RadioGroup
        label="Optional group"
        errorText="Something is wrong"
        helpText="Pen pinapple apple pen"
      >
        <Radio value="opt1">Pen</Radio>
        <Radio value="opt2">Pineapple</Radio>
        <Radio value="opt3">Apple</Radio>
        <Radio value="opt4">Another pen</Radio>
      </RadioGroup>

      <RadioGroup
        label="Optional group (optional)"
        errorText="Something is wrong"
        helpText="Pen pinapple apple pen"
        error
      >
        <Radio value="opt1">Pen</Radio>
        <Radio value="opt2">Pineapple</Radio>
        <Radio value="opt3">Apple</Radio>
        <Radio value="opt4">Another pen</Radio>
      </RadioGroup>
    </Stack>
  )
}

export function Controlled() {
  const [value, setValue] = useState<string>()
  const state = useRadioState({
    value,
    setValue,
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
      helpText={helpText}
    >
      <Radio value="opt1">Pen</Radio>
      <Radio value="opt2">Pineapple</Radio>
      <Radio value="opt3">Apple</Radio>
      <Radio value="opt4">Another pen</Radio>
    </RadioGroup>
  )
}
