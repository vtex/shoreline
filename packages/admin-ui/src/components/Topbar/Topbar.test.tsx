import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import { ThemeProvider } from '@vtex/admin-core'

import { Topbar } from './index'

describe('Topbar tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Topbar data-testid="topbar" csx={{ bg: 'coral' }}>
          <Topbar.Start>
            <h1>start</h1>
          </Topbar.Start>
          <Topbar.End>
            <h2>end</h2>
          </Topbar.End>
        </Topbar>
      </ThemeProvider>
    )

    expect(getByTestId('topbar')).toHaveStyleRule('background-color', 'coral')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <Topbar>
          <Topbar.Start>
            <h1>start</h1>
          </Topbar.Start>
          <Topbar.End>
            <h2>end</h2>
          </Topbar.End>
        </Topbar>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <Topbar>
          <Topbar.Start>
            <h1>start</h1>
          </Topbar.Start>
          <Topbar.End>
            <h2>end</h2>
          </Topbar.End>
        </Topbar>
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
