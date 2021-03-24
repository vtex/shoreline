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
          numberOfItemsFrom={1}
          numberOfItemsTo={2}
          textResults="results"
          textOf="of"
          tooltipLabelNext="Next"
          tooltipLabelPrev="Prev"
          total={3}
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
