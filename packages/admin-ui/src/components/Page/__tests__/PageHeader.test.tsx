import React from 'react'
import { render, axe } from '../../../test-utils'

import { PageHeader, PageTitle, PageActions } from '../index'

describe('PageHeader', () => {
  // TODO The back navigation button is not accessible, it must have an aria-label
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('should not have any violations', async () => {
    const { container } = render(
      <PageHeader onPopNavigation={() => null}>
        <PageTitle>test paragraph</PageTitle>
        <PageActions>
          <button>Action</button>
        </PageActions>
      </PageHeader>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
