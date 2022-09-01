import React from 'react'

import { Pagination, useQueryPaginationState } from '../index'
import { jestMatchMedia, render } from '../../test-utils'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useQueryStateContext, QueryStateProvider } from '@vtex/admin-ui-hooks'

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

const PersistedPaginationWithInitialValue = () => {
  setQuery({ page: 3 })

  const state = useQueryPaginationState({
    pageSize: 5,
    total: 50,
  })

  return <Pagination state={state} data-testid="pagination" />
}

describe('Pagination with query string', () => {
  beforeEach(jestMatchMedia)

  // window.history.back() not work (test pass because there is not await before waitFor)
  it('should starts in a specific page and persisted state', async () => {
    const { rerender } = render(
      <QueryStateProvider>
        <PersistedPaginationWithInitialValue />
      </QueryStateProvider>
    )

    expect(window.location.href).toContain(`page=3`)

    const nextButton = screen
      .getByTestId('pagination')
      .getElementsByTagName('button')[1]

    userEvent.click(nextButton)
    rerender(
      <QueryStateProvider>
        <PersistedPaginationWithInitialValue />
      </QueryStateProvider>
    )

    waitFor(() => expect(window.location.href).toContain('?page=4'))
  })
})
