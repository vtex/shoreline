import '../../../dist/styles.min.css'
import '../select-field.css'
import './style.css'

import React, { useState } from 'react'

import { SelectField } from '../index'

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

      <SelectField label="Label" disabled>
        <option>Maçã</option>
        <option>Banana</option>
        <option>Uva</option>
      </SelectField>

      <SelectField label="Label" helpText="Help text" disabled>
        <option>Maçã</option>
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
    </div>
  )
}
