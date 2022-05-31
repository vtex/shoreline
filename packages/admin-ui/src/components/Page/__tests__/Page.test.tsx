import React from 'react'

import { render, axe } from '../../../test-utils'
import { Page } from '../index'

describe('Page', () => {
  it('should not have any violations', async () => {
    const { container } = render(<Page />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
