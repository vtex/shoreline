import React from 'react'

import { render } from '../../../test-utils'
import { Page, PageContent } from '../index'

describe('PageContent', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <Page>
        <PageContent csx={{ bg: 'coral' }} data-testid="page-content" />
      </Page>
    )

    expect(getByTestId('page-content')).toHaveStyleRule('background', 'coral')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Page>
        <PageContent />
      </Page>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
