import React from 'react'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { TextInput } from '../text-input'

describe('text input', () => {
  test('renders', () => {
    const { container } = render(<TextInput label="Test input" />)

    expect(container.querySelector('[data-sl-text-input]')).toBeInTheDocument()
  })

  test('has aria label', () => {
    const { getByLabelText } = render(<TextInput label="Test input" />)
    const nameInputElement = getByLabelText('Test input')

    expect(nameInputElement).toBeInTheDocument()
  })

  test('becomes disabled', () => {
    const { container } = render(<TextInput label="Test input" disabled />)
    const nameInputElement = container.querySelector('[data-sl-input]')

    expect(nameInputElement).toBeDisabled()
  })
})
