import React from 'react'
import { render, axe } from '../test-utils'

import { Select } from './index'

describe('Select', () => {
  it('renders a disabled select if disabled is set to true', async () => {
    const { container } = render(
      <Select disabled>
        <option>Option 1</option>
        <option>Option 2</option>
      </Select>
    )

    const select = container.querySelector('select') as HTMLElement

    expect(select).toBeDisabled()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <Select name="select" label="select">
        <option>Option 1</option>
        <option>Option 2</option>
      </Select>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
