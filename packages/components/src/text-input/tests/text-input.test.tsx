import React from 'react'
import { describe, expect, it, render } from '@vtex/shoreline-test-utils'

import { TextInput } from '../text-input'

describe('text input', () => {
  it('renders', () => {
    const { container } = render(<TextInput label="Test input" />)

    expect(container.querySelector('[data-sl-text-input]')).toBeInTheDocument()
  })

  it('has aria label', () => {
    const { getByLabelText } = render(<TextInput label="Test input" />)
    const nameInputElement = getByLabelText('Test input')

    expect(nameInputElement).toBeInTheDocument()
  })

  it('becomes disabled', () => {
    const { container } = render(<TextInput label="Test input" disabled />)
    const nameInputElement = container.querySelector('[data-sl-input]')

    expect(nameInputElement).toBeDisabled()
  })
})
