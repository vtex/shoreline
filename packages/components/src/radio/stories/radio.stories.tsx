import '../../../dist/styles.min.css'
import '../radio.css'
import '../radio-group.css'
import '../../field/field.css'
import React, { useEffect, useState } from 'react'

import { Radio, RadioGroup, useRadioState } from '../index'
import { Stack } from '../../stack'

export default {
  title: 'shoreline-components/radio',
}

export function Default() {
  return (
    <RadioGroup label="">
      <Radio label="label" value="opt1" />
      <Radio label="label" value="opt2" error />
      <Radio label="label" value="opt3" disabled />
      <Radio label="label" value="opt4" checked error disabled />
    </RadioGroup>
  )
}

export function RadioGroups() {
  return (
    <Stack>
      <RadioGroup label="Vertical radio group" errorText="Something is wrong">
        <Radio label="Pen" value="opt1" />
        <Radio label="Pinapple" value="opt2" />
        <Radio label="Apple" value="opt3" />
        <Radio label="Another pen" value="opt4" />
      </RadioGroup>
      <RadioGroup label="Horizontal radio group" direction="row">
        <Radio label="Pen" value="opt1" />
        <Radio label="Pinapple" value="opt2" />
        <Radio label="Apple" value="opt3" />
        <Radio label="Another pen" value="opt4" />
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
        <Radio label="Pen" value="opt1" />
        <Radio label="Pinapple" value="opt2" />
        <Radio label="Apple" value="opt3" />
        <Radio label="Another pen" value="opt4" />
      </RadioGroup>
      <RadioGroup
        label="Horizontal radio group"
        direction="row"
        errorText="Something is wrong"
        error
      >
        <Radio label="Pen" value="opt1" />
        <Radio label="Pinapple" value="opt2" />
        <Radio label="Apple" value="opt3" />
        <Radio label="Another pen" value="opt4" />
      </RadioGroup>
      <RadioGroup
        label="Horizontal radio group"
        direction="row"
        errorText="Something is wrong"
        error
      >
        <Radio label="Pen" value="opt1" error />
        <Radio label="Pinapple" value="opt2" error />
        <Radio label="Apple" value="opt3" error />
        <Radio label="Another pen" value="opt4" error />
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
      <Radio label="Pen" value="opt1" />
      <Radio label="Pinapple" value="opt2" />
      <Radio label="Apple" value="opt3" />
      <Radio label="Another pen" value="opt4" />
    </RadioGroup>
  )
}
