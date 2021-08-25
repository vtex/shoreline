import React from 'react'
import { render, axe } from '../../test-utils'

import { Label } from './index'

describe('Label tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <Label data-testid="label" csx={{ color: 'azure' }}>
        <input type="checkbox" />
        Checkbox Input Label!
      </Label>
    )

    expect(getByTestId('label')).toHaveStyleRule('color', 'azure')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <>
        <Label htmlFor="text-id">Text Input Label!</Label>
        <input type="text" id="text-id" />
        <Label>
          <input type="checkbox" />
          Checkbox Input Label!
        </Label>
      </>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <>
        <Label htmlFor="text-id">Text Input Label!</Label>
        <input type="text" id="text-id" />
        <Label>
          <input type="checkbox" />
          Checkbox Input Label!
        </Label>
      </>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
