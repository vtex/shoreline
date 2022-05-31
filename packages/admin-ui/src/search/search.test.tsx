import React from 'react'
import { axe } from 'jest-axe'

import { Search } from '../index'
import { render } from '../test-utils'

describe('Search', () => {
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
