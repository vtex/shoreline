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

    // TODO: Check why types are not working
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(getByTestId('button')).toHaveStyleRule('background-color', 'coral')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Fragment>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button variant="secondary">Button</Button>
        <Button variant="tertiary">Button</Button>
        <Button size="small">Button</Button>
        <Button variant="danger">Button</Button>
      </Fragment>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <Fragment>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button variant="secondary">Button</Button>
        <Button variant="tertiary">Button</Button>
        <Button size="small">Button</Button>
        <Button variant="danger">Button</Button>
      </Fragment>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
