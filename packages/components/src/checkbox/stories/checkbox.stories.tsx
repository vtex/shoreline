import '../../../dist/styles.min.css'
import '../checkbox.css'
import React, { useState } from 'react'

import { Checkbox } from '../index'
import { Stack } from '../../stack'

export default {
  title: 'shoreline-components/checkbox',
}

export function Default() {
  return (
    <Stack>
      <Checkbox label="Unchecked" />
      <Checkbox disabled label="Disabled" />
    </Stack>
  )
}

export function Controlled() {
  const [checked, setChecked] = useState(true)

  return (
    <Stack>
      <p data-sl-text data-variant="body">
        {checked ? 'Checked' : 'Unchecked'}
      </p>
      <button
        data-sl-button
        data-size="normal"
        data-variant="secondary"
        onClick={() => setChecked((c) => !c)}
      >
        Toggle
      </button>
      <Checkbox checked={checked} onChange={setChecked} label="Unchecked" />
    </Stack>
  )
}

export function Indeterminate() {
  return (
    <Stack>
      <Checkbox indeterminate label="Indeterminate" />
      <Checkbox
        indeterminate
        error
        errorText="Error text"
        label="Indeterminate & Error"
      />
      <Checkbox indeterminate disabled label="Indeterminate & Disabled" />
    </Stack>
  )
}

export function DefaultChecked() {
  return (
    <Stack>
      <Checkbox defaultChecked label="Default Checked" />
      <Checkbox defaultChecked disabled label="Checked & Disabled" />
    </Stack>
  )
}

export function WithError() {
  return (
    <Stack>
      <Checkbox
        error
        errorText="Error text"
        helpText="Help text"
        label="With Error"
      />
      <Checkbox
        disabled
        error
        errorText="Error text"
        helpText="Help text"
        label="With Error"
      />
    </Stack>
  )
}

export function TreeState() {
  const [checked, setChecked] = useState<boolean[]>([false, false])

  const someChecked = checked.some((i) => i)
  const allChecked = checked.every((i) => i)

  return (
    <Stack>
      <Checkbox
        indeterminate={someChecked && !allChecked}
        checked={allChecked}
        onChange={() => {
          if (allChecked) {
            setChecked([false, false])
          } else {
            setChecked([true, true])
          }
        }}
        label="Root"
      />
      <Checkbox
        checked={checked[0]}
        onChange={(c) => setChecked((prev) => [c, prev[1]])}
        label="Item 1"
      />
      <Checkbox
        checked={checked[1]}
        onChange={(c) => setChecked((prev) => [prev[0], c])}
        label="Item 2"
      />
    </Stack>
  )
}
