import React from 'react'
import { render, axe } from '../../test-utils'

import { ButtonGhost } from './index'

describe('ButtonGhost', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ButtonGhost data-testid="button" csx={{ bg: 'coral' }}>
        Coral Button
      </ButtonGhost>
    )

    expect(getByTestId('button')).toHaveStyleRule('background-color', 'coral')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(<ButtonGhost>Button</ButtonGhost>)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(<ButtonGhost>Button</ButtonGhost>)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
