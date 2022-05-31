import React from 'react'
import { render, axe } from '../../test-utils'

import { Select } from './index'

describe('Select', () => {
  it('should not have a11y violations', async () => {
    const { container } = render(
      <Select
        id="select"
        label="Select"
        name="select"
        value="option-1"
        onChange={() => null}
      >
        <option value="option-1">Option 1</option>
        <option value="option-2">Option 2</option>
      </Select>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
