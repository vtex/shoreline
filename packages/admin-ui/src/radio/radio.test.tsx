import React from 'react'

import { render, axe, withState } from '../test-utils'
import { Radio, useRadioState } from './radio'

const StatefulRadio = withState(Radio, () =>
  useRadioState({ baseId: 'radio-test' })
)

describe('Radio', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <>
        <StatefulRadio value="unchecked" label="label" />
        <StatefulRadio value="checked" label="label" checked />
        <StatefulRadio value="unchecked disabled" label="label" disabled />
        <StatefulRadio
          value="checked disabled"
          label="label"
          disabled
          checked
        />
      </>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(<StatefulRadio value="test" label="test" />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
