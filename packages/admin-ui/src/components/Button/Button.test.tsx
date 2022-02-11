import React, { Fragment } from 'react'

import { render, axe } from '../../test-utils'
import { Button } from './button'

describe('Button tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <Button data-testid="button" csx={{ bg: 'coral' }}>
        Black Button
      </Button>
    )

    expect(getByTestId('button')).toHaveStyleRule('background', 'coral')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Fragment>
        <Button>Button</Button>
        <Button variant="secondary">Button</Button>
        <Button variant="tertiary">Button</Button>
        <Button variant="critical">Button</Button>
        <Button variant="criticalSecondary">Button</Button>
        <Button variant="criticalTertiary">Button</Button>
        <Button variant="neutralTertiary">Button</Button>
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
