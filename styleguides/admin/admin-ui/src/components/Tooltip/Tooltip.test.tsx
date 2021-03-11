import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import 'mutationobserver-shim'

import { Tooltip } from './index'
import { ThemeProvider } from '@vtex/admin-core'

global.MutationObserver = window.MutationObserver

describe('Tooltip tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Tooltip
          label="label"
          data-testid="tooltip"
          visible
          csx={{
            bg: 'coral',
          }}
        >
          <button>button with tooltip</button>
        </Tooltip>
      </ThemeProvider>
    )

    expect(getByTestId('tooltip')).toHaveStyleRule('background-color', 'coral')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <Tooltip label="label" visible baseId="id">
          <button>button with tooltip</button>
        </Tooltip>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <Tooltip label="label" visible>
          <button>button with tooltip</button>
        </Tooltip>
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
