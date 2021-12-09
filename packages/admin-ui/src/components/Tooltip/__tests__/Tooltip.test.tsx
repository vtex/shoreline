import React from 'react'
import { render, axe } from '../../../test-utils'
import 'mutationobserver-shim'

import { Tooltip } from '../index'

global.MutationObserver = window.MutationObserver

describe('Tooltip tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
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
    )

    expect(getByTestId('tooltip')).toHaveStyleRule('background', 'coral')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Tooltip label="label" visible baseId="id">
        <button>button with tooltip</button>
      </Tooltip>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <Tooltip label="label" visible>
        <button>button with tooltip</button>
      </Tooltip>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
