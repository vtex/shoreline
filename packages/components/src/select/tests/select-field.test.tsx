import React from 'react'
import { describe, expect, test, render } from '@vtex/shoreline-test-utils'

import { Select } from '../select'
import { Field } from '../../field'
import { Label } from '../../label'

describe('select', () => {
  test('renders', () => {
    const { container } = render(
      <Field>
        <Label>Label</Label>
        <Select>
          <option>option</option>
        </Select>
      </Field>
    )

    expect(
      container.querySelector('[data-sl-select-input]')
    ).toBeInTheDocument()
  })
})
