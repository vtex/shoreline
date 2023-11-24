import React from 'react'

import { TextInput } from '../index'
import { Stack } from '../../stack'
import { Tooltip } from '../../tooltip'
import { IconQuestion } from '@vtex/shoreline-icons'

export default {
  title: 'shoreline-components/text-input',
}

export function Default() {
  return <TextInput label="test" />
}

export function All() {
  return (
    <Stack>
      <TextInput label="Label" error />
      <TextInput label="Label" disabled />
      <TextInput label="Label" prefix="a" />
      <TextInput label="Label" suffix="suffix" />
      <TextInput label="Label" prefix="pre" suffix="suffix" />

      <TextInput label="Label" errorText="Something went wrong" error />
      <TextInput
        label="Label"
        errorText="Something went wrong"
        helpText="This is an input"
        error
      />
      <TextInput label="Label" helpText="This is an input" />
      <TextInput
        label="Label"
        disabled
        helpText="This is an input"
        value="Text input value"
      />
      <TextInput
        label={
          <Stack direction="row" space="$space-1">
            <span>Label</span>
            <Tooltip text="Tooltip text">
              <IconQuestion width={16} height={16} />
            </Tooltip>
          </Stack>
        }
        helpText="This is an input"
      />
      <TextInput label="Label" optional helpText="This is an input" />
    </Stack>
  )
}
