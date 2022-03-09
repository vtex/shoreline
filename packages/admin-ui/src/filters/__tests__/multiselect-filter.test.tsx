import React from 'react'
import { useMultipleFilterState } from '..'
import { render, axe, withState } from '../../test-utils'

import { MultiselectFilter } from '../multiselect-filter'

const FilterWithState = withState(MultiselectFilter, () =>
  useMultipleFilterState({
    items: [
      { label: 'Full', value: 1, id: '#1' },
      { label: 'Empty', value: 2, id: '#2' },
    ],
    onChange: () => {},
    label: 'Filter',
  })
)

describe('Multiselect filter tests', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<FilterWithState />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(<FilterWithState />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
