import React from 'react'
import { describe, expect, it, render } from '@vtex/shoreline-test-utils'

import { Filter } from '../filter'
import { FilterItem } from '../filter-item'

describe('filter', () => {
  it('renders', () => {
    const { container, unmount } = render(
      <Filter label="label">
        <FilterItem value="option">Option</FilterItem>
      </Filter>,
      { container: document.body }
    )

    expect(container.querySelector('[data-sl-filter]')).toBeInTheDocument()
    expect(container.querySelector('[data-sl-filter-item]')).toBeInTheDocument()

    unmount()
  })
})
