import React from 'react'
import { render, axe } from '../../test-utils'

import { Card } from './index'

describe('Card tests', () => {
  it('should not have a11y violations', async () => {
    const { container } = render(<Card>Card text</Card>)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
