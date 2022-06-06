import React from 'react'
import { axe } from 'jest-axe'

import { render } from '../../test-utils'
import { Spinner } from './index'

describe('Spinner tests', () => {
  it('should not have a11y violations', async () => {
    const { container } = render(<Spinner />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
