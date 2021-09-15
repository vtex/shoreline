import React from 'react'
import { render } from '../../../test-utils'

import { PageHeader, PageTitle, PageActions } from '../index'

describe('PageHeader', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <PageHeader data-testid="pageheader" csx={{ bg: 'azure' }}>
        <PageTitle>test paragraph</PageTitle>
      </PageHeader>
    )

    expect(getByTestId('pageheader')).toHaveStyleRule(
      'background-color',
      'azure'
    )
  })

  it('should match snapshot', () => {
    const { asFragment } = render(<PageHeader />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with title', () => {
    const { asFragment } = render(
      <PageHeader>
        <PageTitle>test paragraph</PageTitle>
      </PageHeader>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with actions', () => {
    const { asFragment } = render(
      <PageHeader>
        <PageActions>
          <button>Action</button>
        </PageActions>
      </PageHeader>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with backlink', () => {
    const { asFragment } = render(
      <PageHeader onPopNavigation={() => null}>
        <PageTitle>test paragraph</PageTitle>
      </PageHeader>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
