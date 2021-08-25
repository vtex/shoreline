import React from 'react'
import { render, axe } from '../../test-utils'

import { Card } from './index'

describe('Card tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <Card data-testid="card" csx={{ bg: 'coral' }}>
        Card text
      </Card>
    )

    // TODO: Check why types are not working
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(getByTestId('card')).toHaveStyleRule('background-color', 'coral')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(<Card>Card text</Card>)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(<Card>Card text</Card>)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
