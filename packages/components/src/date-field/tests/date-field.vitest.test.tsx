import React from 'react'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { DateField } from '../date-field'

describe('date-field', () => {
  test('renders', () => {
    const { container } = render(<DateField />)

    expect(container.querySelector('[data-sl-date-field]')).toBeInTheDocument()
  })
})
