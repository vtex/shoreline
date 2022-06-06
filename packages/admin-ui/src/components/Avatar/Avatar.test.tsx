import React from 'react'
import { axe, render } from '../../test-utils'

import { Avatar } from './index'

describe('Avatar tests', () => {
  it('should render the first letter', () => {
    const { getByText } = render(<Avatar label="Test" />)

    expect(getByText('T')).toBeTruthy()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(<Avatar label="Test" />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
