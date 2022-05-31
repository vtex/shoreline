import React from 'react'
import { render, axe } from '../../test-utils'

import { Skeleton } from './index'

describe('Skeleton tests', () => {
  it('should not have a11y violations', async () => {
    const { container } = render(<Skeleton />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
