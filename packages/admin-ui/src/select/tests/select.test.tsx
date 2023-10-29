import React from 'react'

import { render } from '../../test-utils'
import { Select } from '../index'

describe('Select', () => {
  it('renders', async () => {
    const { container } = render(
      <Select name="select" label="select">
        <option>Option 1</option>
        <option>Option 2</option>
      </Select>
    )

    expect(container).toBeInTheDocument()
  })
})
