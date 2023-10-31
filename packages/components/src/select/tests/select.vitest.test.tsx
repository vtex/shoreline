import React from 'react'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { Select } from '../select'

describe('select', () => {
  test('renders', () => {
    const { container } = render(<Select />)

    expect(container.querySelector('[data-sl-select]')).toBeInTheDocument()
  })
})
