import React from 'react'
import { render, axe } from '../../test-utils'

import { CheckboxGroup } from './index'
import { Label } from '../Label'

describe('CheckboxGroup tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <CheckboxGroup data-testid="group" csx={{ bg: 'azure' }}>
        <input type="checkbox" readOnly />
      </CheckboxGroup>
    )

    expect(getByTestId('group')).toHaveStyleRule('background-color', 'azure')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <CheckboxGroup>
        <input type="checkbox" readOnly />
      </CheckboxGroup>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with label', () => {
    const { asFragment } = render(
      <CheckboxGroup label="label">
        <input type="checkbox" readOnly />
      </CheckboxGroup>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <CheckboxGroup>
        <Label>
          <input type="checkbox" value="a" readOnly /> A
        </Label>
        <Label>
          <input type="checkbox" value="b" readOnly /> B
        </Label>
      </CheckboxGroup>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
