import React from 'react'
import { render, axe } from '../../test-utils'

import { Abbr } from './Abbr'

describe('Abbr', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Abbr title="full name">name</Abbr>)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(<Abbr title="full name">name</Abbr>)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
