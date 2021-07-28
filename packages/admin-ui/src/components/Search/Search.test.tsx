import React from 'react'
import { render } from '../../test-utils'
import { axe } from 'jest-axe'

import { Search } from './index'

describe('Search tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <Search
        id="search"
        placeholder="placeholder"
        data-testid="spinner"
        csx={{
          bg: 'azure',
        }}
      />
    )

    expect(getByTestId('spinner')).toHaveStyleRule('background-color', 'azure')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Search id="search" placeholder="placeholder" />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot on loading', () => {
    const { asFragment } = render(
      <Search id="search" placeholder="placeholder" loading />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <Search id="search" placeholder="placeholder" />
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should not have a11y violations on loading', async () => {
    const { container } = render(
      <Search id="search" placeholder="placeholder" loading />
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
