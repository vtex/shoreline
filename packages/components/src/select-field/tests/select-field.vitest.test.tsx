import React from 'react'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { SelectField } from '../select-field'

describe('select', () => {
  test('renders', () => {
    const { container } = render(
      <SelectField label="Label" helpText="Help text" errorText="Error text">
        <option>option</option>
      </SelectField>
    )

    expect(
      container.querySelector('[data-sl-select-field]')
    ).toBeInTheDocument()
    expect(container.querySelector('[data-sl-field-label]')).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-field-message-text]')
    ).toBeInTheDocument()
  })
})
