import React from 'react'
import { render, withState } from '../../test-utils'

import {
  FilterPopover,
  FilterFooter,
  FilterListbox,
  FilterOptionRadio,
  useFilterState,
} from '../index'

const StatefulPopover = withState(FilterPopover, () => {
  const state = useFilterState()

  return { ...state, menu: { ...state.menu, open: 'true' } }
})

describe('Filter tests', () => {
  it('rendes', async () => {
    const { container } = render(
      <StatefulPopover>
        <FilterListbox>
          <FilterOptionRadio id="#1" label="Full" />
          <FilterOptionRadio id="#2" label="Empty" />
          <FilterOptionRadio id="#3" label="Half full" />
          <FilterFooter />
        </FilterListbox>
      </StatefulPopover>
    )

    expect(container).toBeInTheDocument()
  })
})
