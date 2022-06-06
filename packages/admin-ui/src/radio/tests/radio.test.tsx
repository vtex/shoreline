import React from 'react'

import { render, axe, withState, jestMatchMedia } from '../../test-utils'
import { Radio, useRadioState, RadioGroup } from '../index'

const StatefulRadioGroup = withState(RadioGroup, () => {
  const state = useRadioState()

  return { ...state, id: 'radio-test' }
})

describe('Radio', () => {
  beforeEach(jestMatchMedia)

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
