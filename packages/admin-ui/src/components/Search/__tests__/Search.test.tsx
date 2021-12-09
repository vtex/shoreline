import React from 'react'
import { axe } from 'jest-axe'

import { Search } from '../Search'
import { useSearchState } from '../hooks/useSearchState'
import { render, withState } from '../../../test-utils'

const StatefulSearch = withState(Search, () => useSearchState())

const StatefulSearchLoading = withState(Search, () =>
  useSearchState({
    initiallyLoading: true,
  })
)

describe('Search tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <StatefulSearch
        data-testid="search"
        id="search"
        placeholder="Placeholder"
        aria-label="Product"
        csx={{ bg: 'azure' }}
      />
    )

    expect(getByTestId('search')).toHaveStyleRule('background', 'azure')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(<StatefulSearch aria-label="Product" />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot on loading', () => {
    const { asFragment } = render(
      <StatefulSearchLoading aria-label="Product" />
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <StatefulSearch id="search" aria-label="Product" />
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should not have a11y violations on loading', async () => {
    const { container } = render(
      <StatefulSearchLoading id="Search" aria-label="Product" />
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
