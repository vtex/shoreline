import React from 'react'
import { describe, expect, test, render } from '@vtex/shoreline-test-utils'

import { Page } from '../page'
import { PageHeader } from '../page-header'
import { PageHeading } from '../page-heading'
import { PageContent } from '../page-content'

describe('page', () => {
  test('renders', () => {
    const { container } = render(
      <Page>
        <PageHeader>
          <PageHeading>Page title</PageHeading>
        </PageHeader>
        <PageContent>Content</PageContent>
      </Page>
    )

    expect(container.querySelector('[data-sl-page]')).toBeInTheDocument()
    expect(container.querySelector('[data-sl-page-header]')).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-page-heading]')
    ).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-page-container]')
    ).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-page-content]')
    ).toBeInTheDocument()
  })
})
