import '../../../shoreline/styles.css'
import React, { useState } from 'react'

import { Checkbox } from '../index'
import { CheckboxProvider, Group, GroupLabel } from '@ariakit/react'

export default {
  title: 'shoreline-components/checkbox',
}

export function Default() {
  return (
    <div>
      <div
        style={{
          padding: '1rem',
        }}
      >
        <Checkbox>Label</Checkbox>
      </div>
      <div
        style={{
          padding: '1rem',
        }}
      >
        <Checkbox value="indeterminate" checked="indeterminate">
          Label
        </Checkbox>
      </div>
      <div
        style={{
          padding: '1rem',
        }}
      >
        <Checkbox error>Label</Checkbox>
      </div>
    </div>
  )
}

export function Controlled() {
  const [checked, setChecked] = useState(true)

  return (
    <div
      style={{
        padding: '1rem',
      }}
    >
      {checked ? 'Checked' : 'Not Checked'}
      <Checkbox
        checked={checked}
        onChange={(event) => setChecked(event.target.checked)}
      >
        Controlled Checkbox
      </Checkbox>
    </div>
  )
}

export function ControlledProvider() {
  const [checked, setChecked] = useState(true)

  return (
    <div
      style={{
        padding: '1rem',
      }}
    >
      {checked ? 'Checked' : 'Not Checked'}
      <CheckboxProvider value={checked} setValue={setChecked}>
        <Checkbox>Controlled Checkbox</Checkbox>
      </CheckboxProvider>
    </div>
  )
}

export function CheckboxGroup() {
  return (
    <CheckboxProvider defaultValue={[]}>
      <Group className="wrapper">
        <GroupLabel>Your favorite fruits</GroupLabel>

        <Checkbox value="apple" className="checkbox">
          Apple
        </Checkbox>
        <Checkbox value="organge" className="checkbox">
          Orange
        </Checkbox>
        <Checkbox value="mango" className="checkbox">
          Mango
        </Checkbox>
      </Group>
    </CheckboxProvider>
  )
}

export function LongLabel() {
  return (
    <div
      style={{
        padding: '1rem',
      }}
    >
      <Checkbox>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis
        velit vel metus egestas viverra. Praesent blandit, lectus non viverra
        tristique, libero quam pellentesque enim, sed pellentesque diam turpis
        in urna. In blandit, dui a rhoncus tincidunt, nisi augue elementum
        ligula, id semper odio mauris semper ante.
      </Checkbox>
    </div>
  )
}
