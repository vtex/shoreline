import React from 'react'

import { render, axe, withState } from '../test-utils'
import { Radio, useRadioState, RadioGroup } from './index'

const StatefulRadioGroup = withState(RadioGroup, () => useRadioState())

describe('Radio', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <StatefulRadioGroup>
        <Radio value="unchecked" label="label" />
        <Radio value="checked" label="label" checked />
        <Radio value="unchecked disabled" label="label" disabled />
        <Radio value="checked disabled" label="label" disabled checked />
      </StatefulRadioGroup>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <StatefulRadioGroup>
        <Radio value="test" label="test" />
      </StatefulRadioGroup>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
