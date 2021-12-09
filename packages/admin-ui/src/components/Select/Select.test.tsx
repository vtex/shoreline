import React from 'react'
import { render, axe } from '../../test-utils'

import { Select } from './index'

describe('Select', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <Select
        data-testid="select"
        csx={{ color: 'azure' }}
        label="Select"
        value="option-1"
        onChange={() => null}
      >
        <option value="option-1">Option 1</option>
        <option value="option-2">Option 2</option>
      </Select>
    )

    expect(getByTestId('select')).toHaveStyleRule('color', 'azure')
  })

  it('should match the snapshot', () => {
    const { asFragment } = render(
      <Select label="Select" value="option-1" onChange={() => null}>
        <option value="option-1">Option 1</option>
        <option value="option-2">Option 2</option>
      </Select>
    )

    expect(asFragment()).toMatchSnapshot()
  })

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
