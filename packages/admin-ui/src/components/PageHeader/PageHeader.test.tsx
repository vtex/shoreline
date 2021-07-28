import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from '@vtex/admin-core'

import { PageHeader } from './index'

describe('PageHeader', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <PageHeader data-testid="pageheader" csx={{ bg: 'azure' }}>
          <PageHeader.Title>test paragraph</PageHeader.Title>
        </PageHeader>
      </ThemeProvider>
    )

    expect(getByTestId('pageheader')).toHaveStyleRule(
      'background-color',
      'azure'
    )
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <PageHeader />
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with title', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <PageHeader>
          <PageHeader.Title>test paragraph</PageHeader.Title>
        </PageHeader>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with actions', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <PageHeader>
          <PageHeader.Actions>
            <button>Action</button>
          </PageHeader.Actions>
        </PageHeader>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with backlink', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <PageHeader onPopNavigation={() => null}>
          <PageHeader.Title>test paragraph</PageHeader.Title>
        </PageHeader>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
