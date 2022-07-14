import React from 'react'
import { render, axe } from '../test-utils'
import { PageHeader, PageHeaderTop, PageHeaderTitle } from './index'

import 'intersection-observer'

function Basic() {
  return (
    <PageHeader>
      <PageHeaderTop>
        <PageHeaderTitle>Product #123</PageHeaderTitle>
      </PageHeaderTop>
    </PageHeader>
  )
}

describe('page-header', () => {
  it('should not have a11y violations', async () => {
    const { container } = render(<Basic />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('page-header title should be visible', async () => {
    const { findByText } = render(<Basic />)

    const results = await findByText('Product #123')

    expect(results).toBeVisible()
  })
})
