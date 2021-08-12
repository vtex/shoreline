import React from 'react'

import { Pagination } from '../index'
import { usePaginationState } from '../hooks/usePaginationState'
import { jestMatchMedia, withState, render } from '../../../test-utils'

const StatefulPagination = withState(Pagination, () =>
  usePaginationState({
    total: 50,
    pageSize: 5,
  })
)

const PaginationWithInitialValue = withState(Pagination, () =>
  usePaginationState({
    pageSize: 5,
    total: 50,
    initialPage: 2,
  })
)

describe('Pagination', () => {
  beforeEach(jestMatchMedia)

  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <StatefulPagination
        data-testid="pagination"
        preposition="of"
        subject="results"
        prevLabel="Previous"
        nextLabel="Next"
        csx={{ bg: 'coral' }}
      />
    )

    expect(getByTestId('pagination')).toHaveStyleRule(
      'background-color',
      'coral'
    )
  })

  it('should starts in a specific page', () => {
    const { getByTestId } = render(
      <PaginationWithInitialValue
        data-testid="pagination"
        preposition="of"
        subject="results"
        prevLabel="Previous"
        nextLabel="Next"
      />
    )

    expect(getByTestId('pagination')).toHaveTextContent('6 — 10 of 50 results')
  })
})
