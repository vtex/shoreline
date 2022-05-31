import React from 'react'

import { render, axe } from '../test-utils'
import { Center } from './center'

describe('Center', () => {
  it('should not have a11y violations', async () => {
    const { container } = render(<Center>Center</Center>)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})

describe('Abbr', () => {})
