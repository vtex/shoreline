import React from 'react'
import { render, axe } from '../../test-utils'

import { Topbar } from './index'

describe('Topbar tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <Topbar data-testid="topbar" csx={{ bg: 'coral' }}>
        <Topbar.Start>
          <h1>start</h1>
        </Topbar.Start>
        <Topbar.End>
          <h2>end</h2>
        </Topbar.End>
      </Topbar>
    )

    expect(getByTestId('topbar')).toHaveStyleRule('background-color', 'coral')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Topbar>
        <Topbar.Start>
          <h1>start</h1>
        </Topbar.Start>
        <Topbar.End>
          <h2>end</h2>
        </Topbar.End>
      </Topbar>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <Topbar>
        <Topbar.Start>
          <h1>start</h1>
        </Topbar.Start>
        <Topbar.End>
          <h2>end</h2>
        </Topbar.End>
      </Topbar>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
