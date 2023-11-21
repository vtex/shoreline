import './style.css'

import React, { useState } from 'react'

import { SelectField } from '../index'
import { Stack } from '../../stack'
import { IconQuestion } from '@vtex/shoreline-icons'
import { Tooltip } from '../../tooltip'

export default {
  title: 'shoreline-components/select-field',
}

export function Default() {
  const [value, setValue] = useState('')

  return (
    <SelectField
      label="Label"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      helpText="Help text"
      errorText="Error text"
    >
      <option>Maçã</option>
      <option>Banana</option>
      <option>Uva</option>
    </SelectField>
  )
}

export function All() {
  return (
    <div className="select-container">
      <SelectField label="Label">
        <option>Maçã</option>
        <option>Banana</option>
        <option>Uva</option>
      </SelectField>

      <SelectField label="Label" helpText="Error text">
        <option>Maçã</option>
        <option>Banana</option>
        <option>Uva</option>
      </SelectField>

      <SelectField label="Label" errorText="Error text" error>
        <option>Maçã</option>
        <option>Banana</option>
        <option>Uva</option>
      </SelectField>

      <SelectField
        label="Label"
        helpText="Help text"
        errorText="Error text"
        error
      >
        <option>Maçã</option>
        <option>Banana</option>
        <option>Uva</option>
      </SelectField>

      <SelectField
        label="Label"
        helpText="Help text"
        errorText="Error text"
        optional
      >
        <option>Maçã</option>
        <option>Banana</option>
        <option>Uva</option>
      </SelectField>

      <SelectField label="Label" disabled>
        <option>Maçã</option>
        <option>Banana</option>
        <option>Uva</option>
      </SelectField>

      <SelectField label="Label" helpText="Help text" value="option-1" disabled>
        <option value="option-1">Maçã</option>
        <option>Banana</option>
        <option>Uva</option>
      </SelectField>

      <SelectField label="Label" errorText="Error text" error disabled>
        <option>Maçã</option>
        <option>Banana</option>
        <option>Uva</option>
      </SelectField>

      <SelectField
        label="Label"
        helpText="Help text"
        errorText="Error text"
        error
        disabled
      >
        <option>Maçã</option>
        <option>Banana</option>
        <option>Uva</option>
      </SelectField>

      <SelectField
        label={
          <Stack direction="row" space="$space-1">
            <span>Label</span>
            <Tooltip text="Tooltip text">
              <IconQuestion width={16} height={16} />
            </Tooltip>
          </Stack>
        }
        helpText="Help text"
        errorText="Error text"
      >
        <option>Maçã</option>
        <option>Banana</option>
        <option>Uva</option>
      </SelectField>
    </div>
  )
}
