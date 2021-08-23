import React from 'react'

import { Pagination } from '../index'
import { usePaginationState } from '../hooks/usePaginationState'
import { jestMatchMedia, withState, render } from '../../../test-utils'
import { useQueryPaginationState } from '../hooks/useQueryPaginationState'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryStateProvider, useQueryStateContext } from '@vtex/onda-hooks'

const setQuery = (query: Record<string, any> = {}): boolean => {
  const { queryParams } = useQueryStateContext()

  Object.entries(query).forEach((element: [string, any]) => {
    queryParams.set(element[0], element[1])
  })

  const newurl = `${window.location.protocol}//${window.location.host}${
    window.location.pathname
  }?${queryParams.toString()}`

  window.history.pushState({ path: newurl }, '', newurl)

  return true
}

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

const PersistedPaginationWithInitialValue = () => {
  setQuery({ page: 3 })

  const state = useQueryPaginationState({
    pageSize: 5,
    total: 50,
  })

  return (
    <QueryStateProvider>
      <Pagination
        state={state}
        data-testid="pagination"
        preposition="of"
        subject="results"
        prevLabel="Previous"
        nextLabel="Next"
      />
    </QueryStateProvider>
  )
}

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

  // window.history.back() not work (test pass because there is not await before waitFor)
  it('should starts in a specific page and persisted state', async () => {
    const { getByTestId, rerender } = render(
      <PersistedPaginationWithInitialValue />
    )

    expect(getByTestId('pagination')).toHaveTextContent('11 — 15 of 50 results')
    expect(window.location.href).toContain(`page=3`)

    const nextButton = screen
      .getByTestId('pagination')
      .getElementsByTagName('button')[1]

    userEvent.click(nextButton)

    rerender(<PersistedPaginationWithInitialValue />)

    await waitFor(() =>
      expect(getByTestId('pagination')).toHaveTextContent(
        '16 — 20 of 50 results'
      )
    )
    waitFor(() => expect(window.location.href).toContain('?page=4'))
  })
})
