import React from 'react'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { Filter } from '../filter'

describe('filter', () => {
  test('renders', () => {
    const { container } = render(<Filter label="label">options</Filter>)

    expect(container.querySelector('[data-sl-filter]')).toBeInTheDocument()
  })
})
