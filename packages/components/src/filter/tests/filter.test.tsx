import React from 'react'
import { describe, expect, it, render } from '@vtex/shoreline-test-utils'

import { Filter } from '../filter'
import { FilterOption } from '../filter-option'

describe('filter', () => {
  it('renders', () => {
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