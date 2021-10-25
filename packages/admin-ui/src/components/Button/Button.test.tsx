import React, { Fragment } from 'react'
import { render, axe } from '../../test-utils'

import { Button } from './index'

describe('Button tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <Button data-testid="button" csx={{ bg: 'coral' }}>
        Black Button
      </Button>
    )

    expect(getByTestId('button')).toHaveStyleRule('background-color', 'coral')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Fragment>
        <Button>Button</Button>
        <Button variant="soft">Button</Button>
        <Button variant="text">Button</Button>
        <Button tone="critical">Button</Button>
        <Button tone="critical" variant="soft">
          Button
        </Button>
        <Button tone="critical" variant="text">
          Button
        </Button>
      </Fragment>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <Fragment>
        <Button>Button</Button>
      </Fragment>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
