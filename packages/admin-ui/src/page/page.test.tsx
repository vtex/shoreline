import React from 'react'
import { render, axe } from '../test-utils'
import { Page, PageContent } from './index'

function Basic() {
  return (
    <Page>
      <PageContent>Page content</PageContent>
    </Page>
  )
}

describe('page', () => {
  it('should not have a11y violations', async () => {
    const { container } = render(<Basic />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('page content should be visible', async () => {
    const { findByText } = render(<Basic />)

    const results = await findByText('Page content')

    expect(results).toBeVisible()
  })
})
