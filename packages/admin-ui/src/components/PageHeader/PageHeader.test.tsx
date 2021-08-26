import React from 'react'
import { render } from '../../test-utils'

import { PageHeader } from './index'

describe('PageHeader', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <PageHeader data-testid="pageheader" csx={{ bg: 'azure' }}>
        <PageHeader.Title>test paragraph</PageHeader.Title>
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
        <PageHeader.Title>test paragraph</PageHeader.Title>
      </PageHeader>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with actions', () => {
    const { asFragment } = render(
      <PageHeader>
        <PageHeader.Actions>
          <button>Action</button>
        </PageHeader.Actions>
      </PageHeader>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with backlink', () => {
    const { asFragment } = render(
      <PageHeader onPopNavigation={() => null}>
        <PageHeader.Title>test paragraph</PageHeader.Title>
      </PageHeader>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
