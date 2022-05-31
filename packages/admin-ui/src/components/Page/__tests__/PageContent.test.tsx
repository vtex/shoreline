import React from 'react'

import { render, axe } from '../../../test-utils'
import { Page, PageContent } from '../index'

describe('PageContent', () => {
  it('should not have any violations', async () => {
    const { container } = render(
      <Page>
        <PageContent />
      </Page>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
