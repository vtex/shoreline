import React from 'react'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { Radio } from '../radio'

describe('radio', () => {
  test('renders', () => {
    const { container } = render(<Radio label="label" value="id" />)

    expect(container.querySelector('[data-sl-radio]')).toBeInTheDocument()
  })

  test('renders field label', () => {
    const { getByText } = render(<Radio label="label" value="id" />)

    expect(getByText('label')).toBeInTheDocument()
  })
})
