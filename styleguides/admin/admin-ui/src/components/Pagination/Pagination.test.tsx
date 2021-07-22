import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from '@vtex/admin-core'

import { Pagination } from './index'
import { usePaginationState } from './usePaginationState'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

describe('Pagination tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Pagination
          state={{
            range: [0, 50],
            currentPage: 0,
            paginate: () => {},
          }}
          data-testid="pagination"
          total={50}
          preposition="of"
          subject="results"
          prevLabel="Previous"
          nextLabel="Next"
          csx={{ bg: 'coral' }}
        />
      </ThemeProvider>
    )

    expect(getByTestId('pagination')).toHaveStyleRule(
      'background-color',
      'coral'
    )
  })
})

it('should starts in a specific page', () => {
  const PaginationWithInitialValue = () => {
    const state = usePaginationState({
      size: 5,
      paginationInitialState: { currentPage: 2, range: [6, 10] },
    })

    return (
      <Pagination
        state={state}
        data-testid="pagination"
        total={50}
        preposition="of"
        subject="results"
        prevLabel="Previous"
        nextLabel="Next"
        csx={{ bg: 'coral' }}
      />
    )
  }

  const { getByTestId } = render(
    <ThemeProvider>
      <PaginationWithInitialValue />
    </ThemeProvider>
  )

  expect(getByTestId('pagination')).toHaveTextContent('6 — 10 of 50 results')
})
