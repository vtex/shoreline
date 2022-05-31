import React from 'react'
import { render, axe } from '../test-utils'

import { Abbr } from './abbr'

describe('Abbr', () => {
  it('should not have a11y violations', async () => {
    const { container } = render(<Abbr title="full name">name</Abbr>)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
