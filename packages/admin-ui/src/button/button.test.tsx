import React from 'react'

import { render, axe } from '../test-utils'
import { Button } from './index'

describe('button', () => {
  it('should not have a11y violations', async () => {
    const { container } = render(<Button>Button</Button>)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
