import React from 'react'

import { render, withState, jestMatchMedia } from '../../test-utils'
import { Radio, useRadioState, RadioGroup } from '../index'

const StatefulRadioGroup = withState(RadioGroup, () => {
  const state = useRadioState()

  return { ...state, id: 'radio-test' }
})

describe('Radio', () => {
  beforeEach(jestMatchMedia)

  it('renders', async () => {
    const { container } = render(
      <StatefulRadioGroup>
        <Radio value="test" label="test" />
      </StatefulRadioGroup>
    )

    expect(container).toBeInTheDocument()
  })
})
