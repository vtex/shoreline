import React from 'react'
import { axe } from 'jest-axe'

import { Search } from '../index'
import { render } from '../test-utils'

describe('Search', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <Search data-testid="search" csx={{ bg: 'azure' }} onClear={() => {}} />
    )

    expect(getByTestId('search')).toHaveStyleRule('background', 'azure')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(<Search />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot on loading', () => {
    const { asFragment } = render(<Search loading />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with value', () => {
    const { asFragment } = render(<Search value="Search" />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(<Search />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should not have a11y violations on loading', async () => {
    const { container } = render(<Search loading />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should not have a11y violations with value', async () => {
    const { container } = render(<Search value="Search" />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
