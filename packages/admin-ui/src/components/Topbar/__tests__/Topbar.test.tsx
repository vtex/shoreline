import React from 'react'
import { render, axe } from '../../../test-utils'

import { Topbar, TopbarStart, TopbarEnd } from '../index'

describe('Topbar tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <Topbar data-testid="topbar" csx={{ bg: 'coral' }}>
        <TopbarStart>
          <h1>start</h1>
        </TopbarStart>
        <TopbarEnd>
          <h2>end</h2>
        </TopbarEnd>
      </Topbar>
    )

    expect(getByTestId('topbar')).toHaveStyleRule('background-color', 'coral')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Topbar>
        <TopbarStart>
          <h1>start</h1>
        </TopbarStart>
        <TopbarEnd>
          <h2>end</h2>
        </TopbarEnd>
      </Topbar>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <Topbar>
        <TopbarStart>
          <h1>start</h1>
        </TopbarStart>
        <TopbarEnd>
          <h2>end</h2>
        </TopbarEnd>
      </Topbar>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
