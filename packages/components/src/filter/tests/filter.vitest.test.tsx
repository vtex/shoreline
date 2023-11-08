import React from 'react'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { Filter } from '../filter'
import { FilterOption } from '../filter-option'

describe('filter', () => {
  test('renders', () => {
    const { container } = render(
      <Filter label="label">
        <FilterOption value="option">Option</FilterOption>
      </Filter>
    )

    expect(container.querySelector('[data-sl-filter]')).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-filter-option]')
    ).toBeInTheDocument()
  })
})
