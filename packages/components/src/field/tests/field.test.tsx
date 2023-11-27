import React from 'react'
import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'

import { Field, FieldLabel, FieldMessage } from '..'

describe('field', () => {
  it('renders', () => {
    const { container } = render(
      <Field>
        <FieldLabel>Label</FieldLabel>
        <FieldMessage helpText="Help" errorText="error" />
      </Field>
    )

    expect(container.querySelector('[data-sl-field]')).toBeInTheDocument()
    expect(container.querySelector('[data-sl-field-label]')).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-field-message]')
    ).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-field-message-text]')
    ).toBeInTheDocument()
  })
})
