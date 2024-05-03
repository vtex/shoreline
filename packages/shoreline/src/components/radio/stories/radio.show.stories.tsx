import React from 'react'

import { Radio, RadioGroup } from '../index'
import { Stack } from '../../stack'

export default {
  title: 'components/radio',
}

export function Show() {
  return (
    <Stack>
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
      <RadioGroup label="Vertical radio group" errorText="Something is wrong">
        <Radio value="opt1">Pen</Radio>
        <Radio value="opt2">Pineapple</Radio>
        <Radio value="opt3">Apple</Radio>
        <Radio value="opt4">Another pen</Radio>
      </RadioGroup>
      <RadioGroup label="Horizontal radio group" horizontal>
        <Radio value="opt1">Pen</Radio>
        <Radio value="opt2">Pineapple</Radio>
        <Radio value="opt3">Apple</Radio>
        <Radio value="opt4">Another pen</Radio>
      </RadioGroup>
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
        horizontal
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
        horizontal
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
      <RadioGroup
        label="Vertical radio group"
        errorText="Something is wrong"
        description="Pen pinapple apple pen"
      >
        <Radio value="opt1">Pen</Radio>
        <Radio value="opt2">Pineapple</Radio>
        <Radio value="opt3">Apple</Radio>
        <Radio value="opt4">Another pen</Radio>
      </RadioGroup>
      <RadioGroup
        label="Optional group"
        errorText="Something is wrong"
        description="Pen pinapple apple pen"
      >
        <Radio value="opt1">Pen</Radio>
        <Radio value="opt2">Pineapple</Radio>
        <Radio value="opt3">Apple</Radio>
        <Radio value="opt4">Another pen</Radio>
      </RadioGroup>
      <RadioGroup
        label="Optional group (optional)"
        errorText="Something is wrong"
        description="Pen pinapple apple pen"
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
