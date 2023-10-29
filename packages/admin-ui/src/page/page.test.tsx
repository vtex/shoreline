import React from 'react'
import { render } from '../test-utils'
import { Page, PageContent } from './index'

function Basic() {
  return (
    <Page>
      <PageContent>Page content</PageContent>
    </Page>
  )
}

describe('page', () => {
  it('page content should be visible', async () => {
    const { findByText } = render(<Basic />)

    const results = await findByText('Page content')

    expect(results).toBeVisible()
  })
})
