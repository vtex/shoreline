import React from 'react'
import { Filter, useFilterState } from '..'
import { render, axe, withState } from '../../test-utils'

const FilterWithState = withState(Filter, () =>
  useFilterState({
    items: [
      { label: 'Full', value: 1, id: '#1' },
      { label: 'Empty', value: 2, id: '#2' },
    ],
    label: 'Filter',
    baseId: 'filterTest',
  })
)

describe('Single select filter tests', () => {
  it('should not have a11y violations', async () => {
    const { container } = render(<FilterWithState />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
