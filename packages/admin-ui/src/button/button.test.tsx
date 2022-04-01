import React from 'react'

import { render, axe } from '../test-utils'
import { Button } from './index'

describe('button', () => {
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
      <>
        <Button>Button</Button>
        <Button variant="secondary">Button</Button>
        <Button variant="tertiary">Button</Button>
        <Button variant="critical">Button</Button>
        <Button variant="criticalSecondary">Button</Button>
        <Button variant="criticalTertiary">Button</Button>
        <Button variant="neutralTertiary">Button</Button>
        <Button loading>Button</Button>
        <Button disabled>Button</Button>
        <Button bleedY>Button</Button>
        <Button bleedX>Button</Button>
      </>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(<Button>Button</Button>)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
