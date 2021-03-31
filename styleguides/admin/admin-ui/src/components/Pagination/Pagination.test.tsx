import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from '@vtex/admin-core'

import { Pagination } from './index'

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
          data-testid="pagination"
          range={[1, 2]}
          total={50}
          preposition="of"
          subject="results"
          prevLabel="Back"
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
