import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from '@vtex/admin-core'

import { Pagination } from './index'

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
