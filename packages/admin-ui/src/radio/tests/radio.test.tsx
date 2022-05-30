import React from 'react'

import { render, axe, withState, jestMatchMedia } from '../../test-utils'
import { Radio, useRadioState, RadioGroup } from '../index'

const StatefulRadioGroup = withState(RadioGroup, () => {
  const state = useRadioState()

  return { ...state, id: 'radio-test' }
})

describe('Radio', () => {
  beforeEach(jestMatchMedia)

  it('should match snapshot', () => {
    const { asFragment } = render(
      <StatefulRadioGroup>
        <Radio value="unchecked" label="label" id="radio-test" />
        <Radio value="checked" label="label" checked id="radio-test" />
        <Radio
          value="unchecked disabled"
          label="label"
          disabled
          id="radio-test"
        />
        <Radio
          value="checked disabled"
          label="label"
          disabled
          checked
          id="radio-test"
        />
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
