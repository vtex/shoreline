import React from 'react'
import { axe } from 'jest-axe'

import { useSearchState, Search } from '../index'
import { render, withState } from '../../test-utils'

const StatefulSearch = withState(Search, () => useSearchState())

const StatefulSearchLoading = withState(Search, () =>
  useSearchState({ initiallyLoading: true })
)

const StatefulSearchValue = withState(Search, () =>
  useSearchState({ initialValue: 'Search' })
)

describe('Search', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <StatefulSearch data-testid="search" csx={{ bg: 'azure' }} />
    )

    expect(getByTestId('search')).toHaveStyleRule('background', 'azure')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(<StatefulSearch />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot on loading', () => {
    const { asFragment } = render(<StatefulSearchLoading />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with value', () => {
    const { asFragment } = render(<StatefulSearchValue />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(<StatefulSearch />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should not have a11y violations on loading', async () => {
    const { container } = render(<StatefulSearchLoading />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should not have a11y violations with value', async () => {
    const { container } = render(<StatefulSearchValue />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
