import '../../../dist/styles.min.css'
import '../select.css'
import './style.css'

import React, { useState } from 'react'

import { Select } from '../index'

export default {
  title: 'shoreline-components/select',
}

export function Default() {
  const [value, setValue] = useState('')

  return (
    <Select
      label="Label"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      helpText="Help text"
      errorText="Error text"
    >
      <option>Maçã</option>
      <option>Banana</option>
      <option>Uva</option>
    </Select>
  )
}

export function All() {
  return (
    <div className="select-container">
      <Select label="Label">
        <option>Maçã</option>
        <option>Banana</option>
        <option>Uva</option>
      </Select>

      <Select label="Label" helpText="Error text">
        <option>Maçã</option>
        <option>Banana</option>
        <option>Uva</option>
      </Select>

      <Select label="Label" errorText="Error text" error>
        <option>Maçã</option>
        <option>Banana</option>
        <option>Uva</option>
      </Select>

      <Select label="Label" helpText="Help text" errorText="Error text" error>
        <option>Maçã</option>
        <option>Banana</option>
        <option>Uva</option>
      </Select>

      <Select label="Label" disabled>
        <option>Maçã</option>
        <option>Banana</option>
        <option>Uva</option>
      </Select>

      <Select label="Label" helpText="Help text" disabled>
        <option>Maçã</option>
        <option>Banana</option>
        <option>Uva</option>
      </Select>

      <Select label="Label" errorText="Error text" error disabled>
        <option>Maçã</option>
        <option>Banana</option>
        <option>Uva</option>
      </Select>

      <Select
        label="Label"
        helpText="Help text"
        errorText="Error text"
        error
        disabled
      >
        <option>Maçã</option>
        <option>Banana</option>
        <option>Uva</option>
      </Select>
    </div>
  )
}
